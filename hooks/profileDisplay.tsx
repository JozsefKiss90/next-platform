
import gameRanking from "./gameRanking"
import { sendGameData, deleteAccount } from './profileHandlers';
import {signOut} from "next-auth/react";
import styles from '../styles/UserForm.module.scss';
import { AppContext } from "../components/layout"
import { useContext, useState } from 'react';
import {getRankOptions, getBestRankOptions} from './rankOptions'

interface AppContextValue {
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean;
    languageData: any
    language: boolean
  }

const ProfileDisplay = ({email} :any ) => {

    const { setIsDarkMode, languageData, language } = useContext(AppContext)  as AppContextValue;

    const [waringMessage, setWaringMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');  
    const [verifyModal, setVerifyModal] = useState(false)

    const {
        games,
        age, 
        handleGameChecked,
        handleGameRankChange,
        handleGameBestRankChange,
        handleGameTimeChange,
        handleAgeChange,
      } = gameRanking();

      const gameData = {
        games,
        email, 
        age, 
        setWaringMessage, 
        setSuccessMessage,
        signOut,
      }   

    return(
        <>
        <div className={styles.container} style={verifyModal ? { display: "none" } : {}}>
            <h1 className={styles.heading}>{language ? languageData.hun.profile[0] : "Game and Player Ranking"}</h1>
            {games.map((game) => (
                <div className={styles.gameContainer} key={game.id}>
                <input
                    type="checkbox"
                    id={game.id}
                    className={styles.checkbox}
                    checked={game.state.checked}
                    onChange={(e) => handleGameChecked(game, e.target.checked)}
                />
                <label htmlFor={game.id} className={styles.label}>{game.label}</label>
                {game.state.checked && (
                    <div className={styles.gameDetails}>
                    <label htmlFor={`${game.id}Rank`} className={styles.subLabel}>{language ? languageData.hun.profile[1] : "Current Rank:"}</label>
                    <select
                        id={`${game.id}Rank`}
                        className={styles.select}
                        value={game.state.rank}
                        onChange={(e) => handleGameRankChange(game, e.target.value)}
                        >
                        {getRankOptions(game.id)}
                        </select>
                    <label htmlFor={`${game.id}BestRank`} className={styles.subLabel}>{language ? languageData.hun.profile[2] : "Highest Rank:"}</label>
                    <select
                        id={`${game.id}BestRank`}
                        className={styles.select}
                        value={game.state.bestRank}
                        onChange={(e) => handleGameBestRankChange(game, e.target.value)}
                        >
                        {getBestRankOptions(game.id)} 
                    </select>
                    <label htmlFor={`${game.id}Time`} className={styles.subLabel}>{language ? languageData.hun.profile[3] : "Game Time (in hours):"}</label>
                    <input
                        type="number"
                        id={`${game.id}Time`}
                        className={styles.input}
                        value={game.state.time}
                        onChange={(e) => handleGameTimeChange(game, parseInt(e.target.value))}
                    />
                    </div>
                )}
                </div>
            ))}
        
            <div className={styles.gameContainer}>
                <label htmlFor="age" className={styles.label}>{language ? languageData.hun.profile[4] : "Age: "}</label>
                <input
                type="number"
                id="age"
                className={styles.input}
                value={age}
                onChange={handleAgeChange}
                />
            </div> 
            <div className={styles.task_button_container}>
                <button className={styles.task_button} onClick={(e)=>{e.preventDefault(),  sendGameData(gameData)}}>
                    <p>
                    {language ? languageData.hun.profile[5] : "Save"}
                    </p>
                </button>
                <button style={{padding:'20px 55px'}} className={styles.task_button}  onClick={(e)=>{e.preventDefault(); setVerifyModal(true), setIsDarkMode(true)}}>
                    <p>
                    {language ? languageData.hun.profile[6] : "Delete Account"}
                    </p>
                </button>
                {waringMessage && <p style={{color:'red', marginTop:'10px'}}>{waringMessage}</p>}
                {successMessage && <p style={{color:'rgba(51, 255, 0, 0.7)', marginTop:'10px'}}>{successMessage}</p>}
            </div>

            </div>
            {verifyModal && <div className={styles.modal}>
                <p style={{textAlign:"center"}}>
                    {language ? languageData.hun.profile[7] : "Are you sure?"}
                </p> 
                <div className={styles.modal_buttons}>
                    <div>
                    <button onClick={(e)=>{e.preventDefault(), deleteAccount(gameData)}}>
                        <p>
                        {language ? languageData.hun.profile[8] : "Yes"}
                        </p>
                    </button>
                    </div>
                    <div>
                    <button onClick={(e)=> {e.preventDefault(), setVerifyModal(false),  setIsDarkMode(false)}}>
                        <p>
                        {language ? languageData.hun.profile[9] : "No"}
                        </p>
                    </button>
                    </div>
                </div>
                </div>
            }
        </>
    )
}

export default ProfileDisplay