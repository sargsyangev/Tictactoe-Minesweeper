import { useState } from "react"
import Board from "../board/board"
import styles from "./minesweeper.module.css"

function Minesweeper() {
    const [beginner, setBeginner] = useState(true)
    const [mediate, setMediate] = useState(false)
    const [expert, setExpert] = useState(false)

    const renderBeginerGame = () => {
        setBeginner(true)
        setMediate(false)
        setExpert(false)
    }
    const renderMediateGame = () => {
        setBeginner(false)
        setMediate(true)
        setExpert(false)
    }
    const renderExpertGame = () => {
        setBeginner(false)
        setMediate(false)
        setExpert(true)
    }


    return (
        <div className={styles.app}>
            <div className={styles.header}>
                <button className={`${beginner ? styles.backGroundBtn: ""}`} onClick={renderBeginerGame}>Beginner</button>
                <button className={`${mediate ? styles.backGroundBtn: ""}`} onClick={renderMediateGame}>Intermediate</button>
                <button className={`${expert ? styles.backGroundBtn: ""}`} onClick={renderExpertGame}>Expert</button>
            </div>
            {beginner && <div className={styles.beginnerBoard}> <Board rowsCount={9} columnsCount={9} bombsCount={10} /></div>}
            {mediate && <div className={styles.mediateBoard}> <Board rowsCount={16} columnsCount={16} bombsCount={40} /></div>}
            {expert && <div className={styles.expertBoard}> <Board rowsCount={16} columnsCount={30} bombsCount={99} /></div>}

        </div>
    )
}

export default Minesweeper