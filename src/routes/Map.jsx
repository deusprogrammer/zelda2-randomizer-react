import { useEffect } from 'react';

import { useAtom } from "jotai";
import { useNavigate, useParams, useLocation } from "react-router";
import { romAtom } from "../atoms/rom.atom";
import MapSideView from "../components/MapSideView";
import { getLocationByKey, getMap, getMapByKey } from '../lib/zelda2/Z2Utils';

export default () => {
    const [ romData ] = useAtom(romAtom);
    let { mapNumber, mapSet, locationKey } = useParams();
    // const [ navFormData, setNavFormData ] = useState({mapSet, mapNumber});
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // const updateNavForm = (key, value) => {
    //     let {mapSet, mapNumber} = navFormData;
    //     if (key === "mapSet") {
    //         mapSet = value;
    //     } else {
    //         mapNumber = value;
    //     }
    //     navigate(`/maps/${mapSet}/${mapNumber}`);
    // }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // useEffect(() => {
    //     setNavFormData({mapSet, mapNumber});
    // }, [mapSet, mapNumber]);

    if (!romData || mapNumber == 63) {
        navigate(`${process.env.PUBLIC_URL}/`);
        return;
    }

    if (mapSet === "6" && mapNumber === "58") {
        console.log("HIIIIII!  I'M DERPY BARBA!");
    }

    let location, map;
    if (locationKey) {
        [location] = getLocationByKey(romData, locationKey);
        map = getMapByKey(romData, locationKey);
        mapSet = location.mapSet;
        mapNumber = location.mapNumber;
    } else {
        map = romData.sideViewMaps[mapSet][mapNumber];
    }

    return (
        <>
            <h2>Map</h2>
            {/* <div style={{textAlign: "center"}}>
                <input type="number" onChange={({target: {value}}) => {updateNavForm("mapSet", value)}} value={navFormData.mapSet} />:
                <input type="number" onChange={({target: {value}}) => {updateNavForm("mapNumber", value)}} value={navFormData.mapNumber} />
            </div> */}
            <MapSideView location={location} map={map} />
            {mapSet === "6" && mapNumber === "58" ? <img src={`${process.env.PUBLIC_URL}/derpybarba.png`} className="popup" /> : null}
        </>
    )
}