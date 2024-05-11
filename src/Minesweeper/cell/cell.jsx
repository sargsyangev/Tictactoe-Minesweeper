import { CellState, CellValue } from "../constants/constants"
import styles from "./cell.module.css"

function Cell({ value, state, rowIndex, colIndex, handleOnClikCell, handleOnContextClikCell ,hasLost}) {

    function getCellValue() {
        if (state === CellState.visible) {
            if (value === CellValue.bomb) return <span>💣</span>
            return <span>{value}</span>
        }
        if (state === CellState.flagged) return <span>🚩</span>
    }

    return (
        <div className={`
        ${styles.cell} 
        ${value === CellValue.bomb && hasLost? styles.red: "" }
        ${state === CellState.visible ? styles.visible : ""}
         ${value === 1 ? styles.value1 :
                value === 2 ? styles.value2 :
                    value === 3 ? styles.value3 :
                        value === 4 ? styles.value4 :
                            value === 5 ? styles.value5 :
                                value === 6 ? styles.value6 :
                                    value === 7 ? styles.value7 :
                                        value === 8 ? styles.value8 : ""}
        `}
            onClick={() => handleOnClikCell(rowIndex, colIndex)}
            onContextMenu={() => handleOnContextClikCell(event, rowIndex, colIndex)} >
            {getCellValue()}
        </div>
    )
}

export default Cell