import styles from '../styles/Spinner.module.scss'

export default function Spinner(){
    return (
        <>
            <div className={styles.lds_spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </>
    )
} 