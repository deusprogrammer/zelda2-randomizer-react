import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './routes/Home';
import Map from './routes/Map';

import './App.css';
import Graph from './routes/Graph';

function App() {


    return (
        <div>
            <h1>Zelda 2 Rando</h1>
            <Router>
                <Routes>
                    <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
                    <Route path={`${process.env.PUBLIC_URL}/maps/:mapSet/:mapNumber`} element={<Map />} />
                    <Route path={`${process.env.PUBLIC_URL}/graph`} element={<Graph />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
