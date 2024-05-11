import { useNavigate } from "react-router-dom"
import styles from "./header.module.css"

function Header() {

    const navigate = useNavigate()

    const handleClickTicTacToe = () => navigate("/tictactoe")
    const handleClickMinesweeper = () => navigate("/minesweeper")
    const handleClickTicTacToe_2 = () => navigate("/tictactoe_2")

    return (
        <header>
            <button onClick={handleClickTicTacToe}>TicTacToe</button>
            <button onClick={handleClickMinesweeper}>Minesweeper</button>
            <button onClick={handleClickTicTacToe_2}>TicTacToe_2</button>
        </header>
    )
}

export default Header