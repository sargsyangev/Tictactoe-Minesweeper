import { useEffect, useState } from "react"
import styles from "./board.module.css"
import { generateBoard, visibleMultiCells } from "../utils/utils"
import Cell from "../cell/cell"
import Counter from "../timer&bombCounter/counter"
import { CellState, CellValue, Faces } from "../constants/constants"

function Board({ rowsCount, columnsCount, bombsCount }) {

    const [board, setBoard] = useState(generateBoard(rowsCount, columnsCount, bombsCount))
    const [bombsCounter, setBombsCounter] = useState(bombsCount)
    const [face, setFace] = useState(Faces.smail)
    const [timer, setTimer] = useState(0)
    const [live, setLive] = useState(false)
    const [hasWon, setHasWon] = useState(false)
    const [hasLost, setHasLost] = useState(false)

    console.log(board)

    useEffect(() => {
        if (live && timer < 999 && !hasLost && !hasWon) {
            const intervalId = setInterval(() => {
                setTimer(timer + 1)
            }, 1000)

            return () => {
                clearInterval(intervalId)
            }
        }

    }, [live, timer])

    useEffect(() => {
        if (hasLost) {
            setLive(false)
            setFace(Faces.lost)
        }
    }, [hasLost])

    useEffect(() => {
        if (hasWon) {
            setLive(false)
            setFace(Faces.win)
        }
    }, [hasWon])


    const handleOnClikCell = (rowIndex, colIndex) => {
        
        if (!live) setLive(true)
        if (hasLost || hasWon) return

        const currentBoard = board.slice()
        const currentCell = currentBoard[rowIndex][colIndex]

        if (currentCell.state === CellState.flagged || currentCell.state === CellState.visible) return
        if (currentCell.state === CellState.unopened) {
            if (currentCell.value === CellValue.bomb) {
                setHasLost(true)
                setFace(Faces.lost)
                setLive(false)
                setBoard(showAllBombs())
            } else if (currentCell.value === CellValue.none) {
                const newBoard = visibleMultiCells(board, rowIndex, colIndex, rowsCount, columnsCount)
                setBoard(newBoard)
            } else {
                currentCell.state = CellState.visible
                setBoard(currentBoard)
            }
        }

        if (checkHasWon().length === bombsCount) {
            setHasWon(true)
            setBoard(showAllBombsFlaged())
            setBombsCounter(0)
        }
    }

    const handleOnContextClikCell = (event, rowIndex, colIndex) => {
        event.preventDefault()

        if (!live) setLive(true)
        if (hasLost || hasWon) return

        const currentBoard = board.slice()
        const currentCell = currentBoard[rowIndex][colIndex]

        if (currentCell.state === CellState.visible) return
        if (currentCell.state === CellState.unopened) {

            currentCell.state = CellState.flagged
            setBombsCounter(bombsCounter - 1)
            setBoard(currentBoard)
        } else if (currentCell.state === CellState.flagged) {

            currentCell.state = CellState.unopened
            setBombsCounter(bombsCounter + 1)
            setBoard(currentBoard)
        }

        if (checkHasWon().length === bombsCount) {
            setHasWon(true)
            setBoard(showAllBombsFlaged())
            setBombsCounter(0)
        }

    }
    const showAllBombs = () => {
        return board.map(row => row.map(cell => {
            if (cell.value === CellValue.bomb) {
                return {
                    ...cell,
                    state: CellState.visible
                }
            }
            return cell
        }))
    }

    const showAllBombsFlaged = () => {
        return board.map(row => row.map(cell => {
            if (cell.state === CellState.unopened) {
                return {
                    ...cell,
                    state: CellState.flagged
                }
            }
            return cell
        }))
    }

    const checkHasWon = () => {
        let visibleCells = []
        board.forEach(row => row.forEach(cell => {
            if (cell.state === CellState.unopened || cell.state === CellState.flagged) {
                visibleCells.push(cell)
            }
        }))
        console.log(visibleCells, "eded")
        return visibleCells
    }

    const handleResetGame = () => {
        setFace(Faces.smail)
        setLive(false)
        setTimer(0)
        setBoard(generateBoard(rowsCount, columnsCount, bombsCount))
        setHasLost(false)
        setHasWon(false)
        setBombsCounter(bombsCount)
    }

    return (
        <div className={styles.minesweeper}>
            <div className={styles.header}>
                <Counter value={bombsCounter} />
                <div className={styles.face} onClick={handleResetGame}> {face} </div>
                <Counter value={timer} />

            </div>
            <div className={styles.board}>
                {
                    board.map((row, rowIndex) => {
                        return <div className={styles.row} key={rowIndex}>
                            {row.map((cell, colIndex) => {
                                return <Cell
                                    key={rowIndex + colIndex}
                                    rowIndex={rowIndex}
                                    colIndex={colIndex}
                                    value={cell.value}
                                    state={cell.state}
                                    handleOnClikCell={handleOnClikCell}
                                    handleOnContextClikCell={handleOnContextClikCell}
                                    hasLost={hasLost}
                                />
                            })}
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Board