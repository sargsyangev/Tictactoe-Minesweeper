import styles from "./board.module.css"
import Square from "../square/square";

function Board({squares, onSquareClick}) {

    return (
        <div className={styles.board}>
            <div className={styles.board_row}>
                <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} />
                <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} />
                <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} />
            </div>
            <div className={styles.board_row}>
                <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
                <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
                <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
            </div>
            <div className={styles.board_row}>
                <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} />
                <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} />
                <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} />
            </div>
        </div>
    );
}

export default Board