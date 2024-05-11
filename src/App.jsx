import "./App.css"
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Header from "./header/header";
import TicTacToe_2 from "./TicTacToe_2/TicTacToe";
import Minesweeper from "./Minesweeper/minesweeper/minesweeper";
import TicTacToe from "./TicTacToe/tictactoe";

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/tictactoe" element={<TicTacToe />} />
                    <Route path="/minesweeper" element={<Minesweeper />} />
                    <Route path="/tictactoe_2" element={<TicTacToe_2 />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;