import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AsciiTable from "../utils/AsciiTable";

export default ({bytes}) => {
    const [page, setPage] = useState(0);
    const [data, setData] = useState();
    const [searchValue, setSearchValue] = useState("0x0000");
    const [hoverByte, setHoverByte] = useState(null);
    const [working, setWorking] = useState(false);

    useEffect(() => {
        setData(bytes);
    }, [bytes]);

    const onFileLoad = (event) => {
        let fr = new FileReader();

        let file = event.target.files[0];
        
        setWorking(true);
        fr.addEventListener("load", ({target: {result}}) => {
            setWorking(false);
            let buffer = new Uint8Array(result);
            setData(buffer);
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

    if (!data) {
        return (
            <div style={{width: "80%", margin: "auto", textAlign: "center"}}>
                <h2>Hex Viewer</h2>
                <h3>File Selection</h3>
                <input type="file" onChange={onFileLoad} />
            </div>
        );
    } else {
        return (
            <div style={{width: "80%", margin: "auto", textAlign: "center"}}>
                <h2>Hex Viewer</h2>
                <h3>Actions</h3>
                <div className="data-div">
                    <Link to={`${process.env.PUBLIC_URL}/`}><button>Go Home</button></Link>
                </div>
                <h3>Controls</h3>
                <div>
                    <label>Go To:</label><input type="text" onChange={(e) => {go(e.target.value)}} value={searchValue} /><br />
                    <button onClick={() => {setPage(page - 1)}} disabled={page === 0}>Prev</button>0x{(page * 512).toString(16).padStart(4, "0")} - 0x{((page + 1) * 512).toString(16).padStart(4, "0")}<button onClick={() => {setPage(page + 1)}}>Next</button>
                </div>
                <h3>Memory</h3>
                <div className="flex row center">
                    <div className="hex-view bigger">
                        {
                            ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'].map(x => {
                                return <div className="label-row">{x}</div>
                            })
                        }
                        { Array.from(data).slice(page * 512, (page + 1) * 512).map((byte, i) => {
                            let c3 = "";
                            let c4 = "";
                            let label = "";
                            if (i % 16 == 0) {
                                label = <div className="label-column" id={`0x${(page * 512 + Math.floor(i/16) * 0x10).toString(16).padStart(4, '0')}`}>{`0x${(page * 512 + Math.floor(i/16) * 0x10).toString(16).padStart(4, '0')}`}</div>;
                            }
                            if (i + (page * 512) === parseInt(searchValue, 16)) {
                                c3 = "selected";
                            }
                            if (hoverByte === i) {
                                c4 = "hover-selected";
                            }
                            return (
                                <React.Fragment key={`byte${i}`}>
                                    {label}
                                    <div 
                                        onClick={() => {setSearchValue(`0x${(i + (page * 512)).toString(16)}`)}} 
                                        onMouseOver={() => {setHoverByte(i)}}
                                        onMouseLeave={() => {setHoverByte(null)}}
                                        className={`${c3} ${c4}`} 
                                        title={`0x${(i + (page * 512)).toString(16)}`}>
                                            {byte.toString(16).padStart(2, "0").toUpperCase()}
                                    </div>
                                </React.Fragment>);
                        })}
                    </div>
                    <div className="hex-view ascii">
                        {
                            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''].map(x => {
                                return <div className="label-row">{x}</div>
                            })
                        }
                        { Array.from(data).slice(page * 512, (page + 1) * 512).map((byte, i) => {
                            let c3 = "";
                            let c4 = "";
                            if (i + (page * 512) === parseInt(searchValue, 16)) {
                                c3 = "selected";
                            } 
                            if (hoverByte === i) {
                                c4 = "hover-selected";
                            }
                            return (
                                <React.Fragment key={`byte${i}`}>
                                    <div 
                                        onClick={() => {setSearchValue(`0x${(i + (page * 512)).toString(16)}`)}} 
                                        onMouseOver={() => {setHoverByte(i)}}
                                        onMouseLeave={() => {setHoverByte(null)}}
                                        className={`${c3} ${c4}`} 
                                        title={`0x${(i + (page * 512)).toString(16)}`}
                                    >
                                        {AsciiTable[byte] || " "}
                                    </div>
                                </React.Fragment>);
                        })}
                    </div>
                </div>
            </div>
        )
    }
}