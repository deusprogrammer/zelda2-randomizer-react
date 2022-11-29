import { useEffect } from 'react';

import { useAtom } from "jotai";
import { useNavigate, useParams, useLocation } from "react-router";
import { romAtom } from "../atoms/rom.atom";
import MapSideView from "../components/MapSideView";
import { useState } from 'react';

export default () => {
    const [ romData ] = useAtom(romAtom);
    const { mapNumber, mapSet, locationKey } = useParams();
    const [ navFormData, setNavFormData ] = useState({mapSet, mapNumber});
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const updateNavForm = (key, value) => {
        let {mapSet, mapNumber} = navFormData;
        if (key === "mapSet") {
            mapSet = value;
        } else {
            mapNumber = value;
        }
        navigate(`/maps/${mapSet}/${mapNumber}`);
        // let copy = {...navFormData};
        // copy[key] = value;
        // setNavFormData(copy);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setNavFormData({mapSet, mapNumber});
    }, [mapSet, mapNumber]);

    if (!romData || mapNumber == 63) {
        navigate(`${process.env.PUBLIC_URL}/`);
        return;
    }

    if (mapSet === "6" && mapNumber === "58") {
        console.log("HIIIIII!  I'M DERPY BARBA!");
    }

    let location = null;
    for (let map of romData.mapData) {
        let found = Object.keys(map).find(key => key === locationKey);

        if (found) {
            location = map[found];
            break;
        }
    }

    return (
        <>
            <h2>Map</h2>
            <div style={{textAlign: "center"}}>
                <input type="number" onChange={({target: {value}}) => {updateNavForm("mapSet", value)}} value={navFormData.mapSet} />:
                <input type="number" onChange={({target: {value}}) => {updateNavForm("mapNumber", value)}} value={navFormData.mapNumber} />
                {/* <button onClick={() => {navigate(`/maps/${navFormData.mapSet}/${navFormData.mapNumber}`)}}>Navigate</button> */}
            </div>
            <MapSideView location={location} maps={romData.sideViewMaps} levelExits={romData.levelExits} mapNumber={mapNumber} mapSet={mapSet} />
            {mapSet === "6" && mapNumber === "58" ? <img src={`${process.env.PUBLIC_URL}/derpybarba.png`} className="popup" /> : null}
        </>
    )
}