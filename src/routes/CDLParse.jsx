import React, { useState } from "react";
import { extractCDLEntries } from "../lib/nes/NESUtils";

export default () => {
    const [page, setPage] = useState(0);
    const [cdlData, setCdlData] = useState();
    const [searchValue, setSearchValue] = useState(0);
    const [working, setWorking] = useState(false);

    const onFileLoad = (event) => {
        let fr = new FileReader();

        let file = event.target.files[0];
        
        setWorking(true);
        fr.addEventListener("load", ({target: {result}}) => {
            setWorking(false);
            let data = extractCDLEntries(new Uint8Array(result));
            setCdlData(data);
        });

        fr.readAsArrayBuffer(file);
    }

    const go = () => {
        let el = document.getElementById("0x" + parseInt(searchValue, 16).replace("0x", "").padStart(4, "0"));
        el.scrollTo();
    }

    if (working) {
        return <div style={{textAlign: "center"}}>Working...</div>
    }

    if (!cdlData) {
        return (
            <div style={{width: "80%", margin: "auto", textAlign: "center"}}>
                <h2>CDL File Selection</h2>
                <label>CDL File</label>
                <input type="file" accept='.cdl' onChange={onFileLoad} />
            </div>
        );
    } else {
        return (
            <div style={{width: "80%", margin: "auto", textAlign: "center"}}>
                <h2>Memory Map</h2>
                <h3>Legend</h3>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <div style={{display: "flex"}}><div style={{width: "10px", height: "10px", backgroundColor: "red", border: "1px solid black"}}></div><div>Code Access</div></div>
                    <div style={{display: "flex"}}><div style={{width: "10px", height: "10px", backgroundColor: "orange", border: "1px solid black"}}></div><div>Data Access</div></div>
                </div>
                <div>
                    <label>Go To:</label><input type="text" onChange={(e) => {setSearchValue(e.target.value)}} value={searchValue} /><button onClick={() => {go()}}>Go</button><br />
                    <button onClick={() => {setPage(page - 1)}} disabled={page === 0}>Prev</button>0x{(page * 512).toString(16).padStart(4, "0")} - 0x{((page + 1) * 512).toString(16).padStart(4, "0")}<button onClick={() => {setPage(page + 1)}}>Next</button>
                </div>
                <h3>Memory</h3>
                <div className="hex-view">
                    {
                        ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'].map(x => {
                            return <div className="label-row">{x}</div>
                        })
                    }
                    { cdlData.slice(page * 512, (page + 1) * 512).map((byte, i) => {
                        let label = null;
                        if (i % 16 == 0) {
                            label = <div className="label-column" id={`0x${(Math.floor(i + (page * 512)/16) * 0x10).toString(16).padStart(4, '0')}`}>0x{(Math.floor(i + (page * 512)/16) * 0x10).toString(16).padStart(4, '0')}</div>;
                        }
                        let c1 = null;
                        let c2 = null;
                        if (byte.noAccess) {
                            c1 = "no-access";
                        } else if (byte.codeAccess) {
                            c1 = "code-access";
                        } else if (byte.dataAccess) {
                            c1 = "data-access";
                        }

                        if (byte.indirectCodeAccess) {
                            c2 = "indirect-code-access";
                        } else if (byte.indirectDataAccess) {
                            c2 = "indirect-data-access";
                        }
                        return <React.Fragment key={`byte${i}`}>{label}<div id={`0x${(i  + (page * 512)).toString(16)}`} className={`${c1} ${c2}`} title={`0x${(i + (page * 512)).toString(16)}`}></div></React.Fragment>
                    })}
                </div>
            </div>
        )
    }
}