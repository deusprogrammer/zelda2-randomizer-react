import { useAtom } from "jotai";
import { useNavigate, useParams } from "react-router";
import { romAtom } from "../atoms/rom.atom";
import MapSideView from "../components/MapSideView";

export default () => {
    const [romData] = useAtom(romAtom);
    const {continent, mapNumber, mapSet} = useParams();
    const navigate = useNavigate();

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