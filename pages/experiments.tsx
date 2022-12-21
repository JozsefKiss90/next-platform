import Link from "next/link"
import styles from "../styles/Experiments.module.scss"
import { useRouter } from 'next/router'

export default function Experiments(){

    return (
        <div className={styles.main}>
            <a href={'/rtTask'}>
                <h1>
                    Simple Reaction Time Task
                </h1>
            </a>
            <a href={'/flankerTask'}>
                <h1>
                    Flanker Compatibility Task
                </h1>
            </a> 
        </div>
    )
}