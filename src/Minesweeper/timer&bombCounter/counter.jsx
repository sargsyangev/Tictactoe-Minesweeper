import styles from "./counter.module.css"

function Counter({ value }) {
    return (
        <div className={styles.counter}>
            {value < 0 ?
                `-${Math.abs(value).toString().padStart(2, "0")}` :
                value.toString().padStart(3, "0")}
        </div>
    )
}

export default Counter