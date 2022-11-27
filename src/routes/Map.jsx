import { useEffect } from 'react';

import { useAtom } from "jotai";
import { useNavigate, useParams, useLocation } from "react-router";
import { romAtom } from "../atoms/rom.atom";
import MapSideView from "../components/MapSideView";

export default () => {
    const [ romData ] = useAtom(romAtom);
    const { mapNumber, mapSet, locationKey } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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
            <MapSideView location={location} maps={romData.sideViewMaps} levelExits={romData.levelExits} mapNumber={mapNumber} mapSet={mapSet} />
            {mapSet === "6" && mapNumber === "58" ? <img src={`${process.env.PUBLIC_URL}/derpybarba.png`} className="popup" /> : null}
        </>
    )
}