import { useEffect } from 'react';

import { useAtom } from "jotai";
import { useNavigate, useParams, useLocation } from "react-router";
import { romAtom } from "../atoms/rom.atom";
import MapSideView from "../components/MapSideView";

export default () => {
    const [ romData ] = useAtom(romAtom);
    const { mapNumber, mapSet } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (!romData || mapNumber == 63) {
        navigate(`${process.env.PUBLIC_URL}/`);
        return;
    }

    return (
        <>
            <h2>Map</h2>
            <MapSideView maps={romData.sideViewMaps} levelExits={romData.levelExits} mapNumber={mapNumber} mapSet={mapSet} />
        </>
    )
}