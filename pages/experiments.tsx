import Link from "next/link"
import styles from "../styles/Experiments.module.scss"
import { useRouter } from 'next/router'
import {getSession, signIn} from "next-auth/react";
import { useState, useEffect } from "react";

export default function Experiments(){

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const securePage = async () =>{
            const session = await getSession()
            if(!session) {
                signIn()
            } else {
                setLoading(false)
            }
        }
        securePage()
    },[])

    if(loading) {
        return <h1>Loading...</h1>
    }

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