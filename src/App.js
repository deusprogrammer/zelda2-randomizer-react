import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import Home from './routes/Home';
import Map from './routes/Map';
import Graph from './routes/Graph';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import CDLViewer from './routes/CDLViewer';
import HexViewer from './routes/HexViewer';
import { useAtom } from 'jotai';
import { romAtom } from './atoms/rom.atom';
import FileSaver from 'file-saver';

const App = () => {
    const [romData] = useAtom(romAtom);

    return (
        <div>
            <h1>Zelda 2 Rando</h1>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
                    <Route path={`${process.env.PUBLIC_URL}/maps/:mapSet/:mapNumber`} element={<Map />} />
                    <Route path={`${process.env.PUBLIC_URL}/maps/:locationKey`} element={<Map />} />
                    <Route path={`${process.env.PUBLIC_URL}/graph`} element={<Graph />} />
                    <Route path={`${process.env.PUBLIC_URL}/cdl`} element={<CDLViewer />} />
                    <Route path={`${process.env.PUBLIC_URL}/hex`} element={<HexViewer />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
