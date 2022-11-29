import React, { useState } from "react";
import { Link } from "react-router-dom";
import { extractCDLEntries } from "../lib/nes/NESUtils";

export default () => {
    const [page, setPage] = useState(0);
    const [cdlData, setCdlData] = useState();
    const [searchValue, setSearchValue] = useState("0x0000");
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

    const go = (value) => {
        try {
            let address = parseInt(value, 16);
            let newPage = Math.floor(address/512);

            setPage(newPage);
            setSearchValue(value);
        } catch (e) {
            setSearchValue("0x0000");
        }
    }

    if (working) {
        return <div style={{textAlign: "center"}}>Working...</div>
    }

    if (!cdlData) {
        return (
            <div style={{width: "80%", margin: "auto", textAlign: "center"}}>
                <h2>CDL File Selection</h2>
                <input type="file" accept='.cdl' onChange={onFileLoad} />
            </div>
        );
    } else {
        return (
            <div style={{width: "80%", margin: "auto", textAlign: "center"}}>
                <h2>CDL Viewer</h2>
                <h3>Actions</h3>
                <div className="data-div">
                    <Link to={`${process.env.PUBLIC_URL}/`}><button>Go Home</button></Link>
                </div>
                <h3>Legend</h3>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <div style={{display: "flex"}}><div style={{width: "10px", height: "10px", backgroundColor: "red", border: "1px solid black"}}></div><div>Code Access</div></div>
                    <div style={{display: "flex"}}><div style={{width: "10px", height: "10px", backgroundColor: "orange", border: "1px solid black"}}></div><div>Data Access</div></div>
                </div>
                <h3>Controls</h3>
                <div>
                    <label>Go To:</label><input type="text" onChange={(e) => {go(e.target.value)}} value={searchValue} /><br />
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
                            label = <div className="label-column" id={`0x${(page * 512 + Math.floor(i/16) * 0x10).toString(16).padStart(4, '0')}`}>{`0x${(page * 512 + Math.floor(i/16) * 0x10).toString(16).padStart(4, '0')}`}</div>;
                        }
                        let c1 = "";
                        let c2 = "";
                        let c3 = "";
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

                        if (i + (page * 512) === parseInt(searchValue, 16)) {
                            c3 = "blinking selected";
                        } 
                        return <React.Fragment key={`byte${i}`}>{label}<div id={`0x${(i  + (page * 512)).toString(16)}`} className={`${c1} ${c2} ${c3}`} title={`0x${(i + (page * 512)).toString(16)}`}></div></React.Fragment>
                    })}
                </div>
            </div>
        )
    }
}