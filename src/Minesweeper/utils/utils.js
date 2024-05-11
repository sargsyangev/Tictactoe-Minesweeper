import { CellState, CellValue } from "../constants/constants";

function getAllAdjacentCells(board, rowIndex, colIndex, rowsCount, columnsCount) {

    const topLeftCell = rowIndex > 0 && colIndex > 0 ? board[rowIndex - 1][colIndex - 1] : null
    const topCell = rowIndex > 0 ? board[rowIndex - 1][colIndex] : null
    const topRigthCell = rowIndex > 0 && colIndex < columnsCount - 1 ? board[rowIndex - 1][colIndex + 1] : null
    const leftCell = rowIndex > 0 ? board[rowIndex][colIndex - 1] : null
    const rigthCell = colIndex < columnsCount - 1 ? board[rowIndex][colIndex + 1] : null
    const bottomLeftCell = rowIndex < rowsCount - 1 && colIndex > 0 ? board[rowIndex + 1][colIndex - 1] : null
    const bottomCell = rowIndex < rowsCount - 1 ? board[rowIndex + 1][colIndex] : null
    const bottomRigthCell = rowIndex < rowsCount - 1 && colIndex < columnsCount - 1 ? board[rowIndex + 1][colIndex + 1] : null

    return {
        topLeftCell,
        topCell,
        topRigthCell,
        leftCell,
        rigthCell,
        bottomLeftCell,
        bottomCell,
        bottomRigthCell
    }
}

export function generateBoard(rowsCount, columnsCount, bombsCount) {

    const board = []
    for (let row = 0; row < rowsCount; row++) {
        board.push([])
        for (let col = 0; col < columnsCount; col++) {
            board[row].push({
                value: CellValue.none,
                state: CellState.unopened
            })
        }
    }

    let bombPlacedCount = 0
    while (bombPlacedCount < bombsCount) {
        let rowIndex = Math.floor(Math.random() * rowsCount)
        let colIndex = Math.floor(Math.random() * columnsCount)

        if (board[rowIndex][colIndex].value !== CellValue.bomb) {
            board[rowIndex][colIndex].value = CellValue.bomb
            bombPlacedCount++
        }
    }

    for (let row = 0; row < rowsCount; row++) {
        for (let col = 0; col < columnsCount; col++) {

            const currentCell = board[row][col]

            if (currentCell.value === CellValue.bomb) continue

            const { topLeftCell, topCell, topRigthCell, leftCell, rigthCell, bottomLeftCell, bottomCell, bottomRigthCell } = getAllAdjacentCells(board, row, col, rowsCount, columnsCount)

            let numberBombs = 0
            if (topLeftCell && topLeftCell.value === CellValue.bomb) {
                numberBombs++
            }
            if (topCell && topCell.value === CellValue.bomb) {
                numberBombs++
            }
            if (topRigthCell && topRigthCell.value === CellValue.bomb) {
                numberBombs++
            }
            if (leftCell && leftCell.value === CellValue.bomb) {
                numberBombs++
            }
            if (rigthCell && rigthCell.value === CellValue.bomb) {
                numberBombs++
            }
            if (bottomLeftCell && bottomLeftCell.value === CellValue.bomb) {
                numberBombs++
            }
            if (bottomCell && bottomCell.value === CellValue.bomb) {
                numberBombs++
            }
            if (bottomRigthCell && bottomRigthCell.value === CellValue.bomb) {
                numberBombs++
            }

            if (numberBombs > 0) {
                currentCell.value = numberBombs
            }
        }
    }

    return board
}
export function visibleMultiCells(board, rowIndex, colIndex, rowsCount, columnsCount) {
    const currentCell = board[rowIndex][colIndex]

    // if (currentCell.state === CellState.visible || currentCell.state === CellState.flagged) {
    //     return board
    // }

    let currentBoard = board.slice()
    currentCell.state = CellState.visible
    const { topLeftCell, topCell, topRigthCell, leftCell, rigthCell, bottomLeftCell, bottomCell, bottomRigthCell } = getAllAdjacentCells(board, rowIndex, colIndex, rowsCount, columnsCount)

    if (topLeftCell?.state === CellState.unopened && topLeftCell.value !== CellValue.bomb) {
        if (topLeftCell.value === CellValue.none) {
            currentBoard = visibleMultiCells(currentBoard, rowIndex - 1, colIndex - 1, rowsCount, columnsCount)
        } else {
            currentBoard[rowIndex - 1][colIndex - 1].state = CellState.visible
        }
    }
    if (topCell?.state === CellState.unopened && topCell.value !== CellValue.bomb) {
        if (topCell.value === CellValue.none) {
            currentBoard = visibleMultiCells(currentBoard, rowIndex - 1, colIndex, rowsCount, columnsCount)
        } else {
            currentBoard[rowIndex - 1][colIndex].state = CellState.visible
        }
    }
    if (topRigthCell?.state === CellState.unopened && topRigthCell.value !== CellValue.bomb) {
        if (topRigthCell.value === CellValue.none) {
            currentBoard = visibleMultiCells(currentBoard, rowIndex - 1, colIndex + 1, rowsCount, columnsCount)
        } else {
            currentBoard[rowIndex - 1][colIndex + 1].state = CellState.visible
        }
    }
    if (leftCell?.state === CellState.unopened && leftCell.value !== CellValue.bomb) {
        if (leftCell.value === CellValue.none) {
            currentBoard = visibleMultiCells(currentBoard, rowIndex, colIndex - 1, rowsCount, columnsCount)
        } else {
            currentBoard[rowIndex][colIndex - 1].state = CellState.visible
        }
    }
    if (rigthCell?.state === CellState.unopened && rigthCell.value !== CellValue.bomb) {
        if (rigthCell.value === CellValue.none) {
            currentBoard = visibleMultiCells(currentBoard, rowIndex, colIndex + 1, rowsCount, columnsCount)
        } else {
            currentBoard[rowIndex][colIndex + 1].state = CellState.visible
        }
    }
    if (bottomLeftCell?.state === CellState.unopened && bottomLeftCell.value !== CellValue.bomb) {
        if (bottomLeftCell.value === CellValue.none) {
            currentBoard = visibleMultiCells(currentBoard, rowIndex + 1, colIndex - 1, rowsCount, columnsCount)
        } else {
            currentBoard[rowIndex + 1][colIndex - 1].state = CellState.visible
        }
    }
    if (bottomCell?.state === CellState.unopened && bottomCell.value !== CellValue.bomb) {
        if (bottomCell.value === CellValue.none) {
            currentBoard = visibleMultiCells(currentBoard, rowIndex + 1, colIndex, rowsCount, columnsCount)
        } else {
            currentBoard[rowIndex + 1][colIndex].state = CellState.visible
        }
    }
    if (bottomRigthCell?.state === CellState.unopened && bottomRigthCell.value !== CellValue.bomb) {
        if (bottomRigthCell.value === CellValue.none) {
            currentBoard = visibleMultiCells(currentBoard, rowIndex + 1, colIndex + 1, rowsCount, columnsCount)
        } else {
            currentBoard[rowIndex + 1][colIndex + 1].state = CellState.visible
        }
    }

    return currentBoard
}