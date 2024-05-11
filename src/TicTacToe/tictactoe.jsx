import styles from "./tictactoe.module.css"
import Board from "./board/board"
import { useState } from "react"

function TicTacToe() {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)

    function onSquareClick(i) {
        if (squares[i] || calculateWinner(squares)) return

        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "0"
        setSquares(nextSquares);
        setXIsNext(!xIsNext)
    }

    function calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }
        return null
    }

    function getStatus() {
        let status = calculateWinner(squares)
        if (status) {
            status = `Winner is:  ${status}`
        } else if (!squares.includes(null)) {
            status = "Draw"
        } else {
            status = `Next player:  ${xIsNext ? "X" : "0"}`
        }
        return status
    }

    function resetGame() {
        setSquares((Array(9).fill(null)))
        setXIsNext(true)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Tic Tac Toe</div>
            <Board squares={squares} onSquareClick={onSquareClick} />
            <div className={styles.statusGame}>
                <p className={styles.status}>{getStatus()}</p>
                <button className={styles.resetBtn} onClick={resetGame}>New Game</button>
            </div>
        </div>
    )
}

export default TicTacToe