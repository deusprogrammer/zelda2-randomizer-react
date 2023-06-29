import { useEffect, useState } from 'react';

import { useAtom } from "jotai";
import { useNavigate, useParams, useLocation } from "react-router";
import { romAtom } from "../atoms/rom.atom";
import MapSideView from "../components/MapSideView";
import { getLocationByKey, getMap, getMapByKey } from '../lib/zelda2/Z2Utils';

export default () => {
    const [ connectionData, setConnectionData ] = useState({});
    const [ connectionDataTemp, setConnectionDataTemp ] = useState("");
    const [ romData ] = useAtom(romAtom);
    let { mapNumber, mapSet, locationKey } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const nextMap = () => {
        console.log("NEXT");
        let nextMapSet = parseInt(mapSet);
        let nextMapNumber = parseInt(mapNumber) + 1;
        if (nextMapNumber > 62) {
            nextMapNumber = 0;
            nextMapSet += 1;

            if (nextMapSet > 7) {
                nextMapSet = 0;
            }
        }

        navigate(`/maps/${nextMapSet}/${nextMapNumber}`);
    }

    const prevMap = () => {
        console.log("PREV");
        let nextMapSet = parseInt(mapSet);
        let nextMapNumber = parseInt(mapNumber) - 1;
        if (nextMapNumber < 0) {
            nextMapNumber = 62;
            nextMapSet -= 1;

            if (nextMapSet < 0) {
                nextMapSet = 7;
            }
        }

        navigate(`/maps/${nextMapSet}/${nextMapNumber}`);
    }

    useEffect(() => {
        let connectionData = JSON.parse(localStorage.getItem("connectionData") || "{}");

        if (!connectionData[`${mapSet}:${mapNumber}`]) {
            connectionData[`${mapSet}:${mapNumber}`] = {
                items: [],
                nodes: ["left", "right", "up", "down"],
                connections: [
                    {
                        from: "left",
                        to: "right",
                        requirements: []
                    },{
                        from: "up",
                        to: "down",
                        requirements: []
                    },{
                        from: "left",
                        to: "up",
                        requirements: []
                    },{
                        from: "left",
                        to: "down",
                        requirements: []
                    },{
                        from: "right",
                        to: "up",
                        requirements: []
                    },{
                        from: "right",
                        to: "down",
                        requirements: []
                    },
                    
                ]
            };
        }

        setConnectionData(connectionData);
        setConnectionDataTemp(JSON.stringify(connectionData[`${mapSet}:${mapNumber}`], null, 5));
    }, [mapSet, mapNumber]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const storeConnectionData = () => {
        let copy = {...connectionData};
        copy[`${mapSet}:${mapNumber}`] = JSON.parse(connectionDataTemp);
        setConnectionData(copy);
        localStorage.setItem("connectionData", JSON.stringify(copy));
    }

    if (!romData || mapNumber == 63) {
        navigate(`${process.env.PUBLIC_URL}/`);
        return;
    }

    if (mapSet === "6" && mapNumber === "58") {
        console.log("HIIIIII!  I'M DERPY BARBA!");
    }

    let location, map, enemyData;
    if (locationKey) {
        [location] = getLocationByKey(romData, locationKey);
        map = getMapByKey(romData, locationKey);
        mapSet = location.mapSet;
        mapNumber = location.mapNumber;
    } else {
        map = romData.sideViewMaps[mapSet][mapNumber];
        enemyData = romData.enemyData[mapSet][mapNumber];
    }

    return (
        <>
            <h2>Map</h2>
            <div style={{textAlign: "center"}}>
                <button onClick={prevMap}>Prev Map</button><button onClick={nextMap}>Next Map</button>
            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "10px", justifyContent: "center"}}>
                <textarea style={{width: "50%", height: "150px"}} onChange={({target: {value}}) => {setConnectionDataTemp(value)}} value={connectionDataTemp} />
                <br />
                <button onClick={storeConnectionData}>Store</button>
            </div>
            <MapSideView location={location} map={map} enemyData={enemyData} />
            {mapSet === "6" && mapNumber === "58" ? <img src={`${process.env.PUBLIC_URL}/derpybarba.png`} className="popup" /> : null}
        </>
    )
}