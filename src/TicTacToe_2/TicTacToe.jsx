import { useEffect, useState } from "react"
import styles from "./tictactoe.module.css"
import { defaultBoard, winVersion } from "./constants"

function TicTacToe_2() {

    const [board, setBoard] = useState(defaultBoard)
    const [isNextX, setIsNextX] = useState(true)
    const [status, setStatus] = useState("")

    useEffect(() => {
        checkWinner(board)
    }, [isNextX])

    const handleClick = (id) => {

        const hasCellValue = board.find(el => el.id === id).value
        if (hasCellValue || status) return

        const newBoard = board.map(cell => {
            if (cell.id === id) {
                return {
                    ...cell,
                    value: isNextX ? "X" : "0"
                }
            }
            return cell
        })
        setBoard(newBoard)
        setIsNextX(!isNextX)
    }

    const checkWinner = (board = []) => {
        winVersion.forEach(winVers => {
            let [a, b, c] = winVers
            if (board[a].value && board[a].value === board[b].value && board[a].value === board[c].value) {
                setStatus(board[a].value)
            }
        })
        if (board.every(cell => cell.value)) setStatus("Draw")
    }

    const resetGame = () => {
        setBoard(defaultBoard)
        setIsNextX(true)
        setStatus("")
    }

    return (
        <div className={styles.tictactoe}>
            <h1 onClick={resetGame}>TicTacToe</h1>
            <div className={styles.board}>
                {board.map(cell => {
                    return <div
                        className={styles.cell}
                        key={cell.id}
                        onClick={() => handleClick(cell.id)}>
                        {cell.value}
                    </div>
                })}
            </div>
            <div>
                {status ? <div className={styles.statusArena}>
                    {status === "Draw" ? "Draw" : `Winner is player: ${status}`}
                </div> : <></>}
            </div>
        </div>
    )
}

export default TicTacToe_2