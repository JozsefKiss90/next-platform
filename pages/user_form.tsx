import React, { useState } from 'react';
import { gameRanking } from './hooks/gameRanking';
import styles from '../styles/UserForm.module.scss';
import Navbar from "../components/navbar";
import {getRankOptions, getBestRankOptions} from './hooks/rankOptions'
import {getSession} from "next-auth/react";

interface TaskProps{
    email: string | undefined; 
  }

export default function UserForm({ email } : TaskProps) {

  const [waringMessage, setWaringMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  

  const {
      games,
      age, 
      handleGameChecked,
      handleGameRankChange,
      handleGameBestRankChange,
      handleGameTimeChange,
      handleAgeChange,
    } = gameRanking();


    let data
      

    for(let game of games) {
        if(!game.state.checked) {
            continue
        } 
            data = {
                game: game.id,
                email: email,
                rank: game.state.rank,
                bestRank: game.state.bestRank,
                gameTime: game.state.time,
                age: age
            }
            console.log(data)
        }

  const sendGameData = () => {

      let data : any
      
      let options 

      for(let game of games) {
        const requiredFields = ['game', 'email', 'rank', 'bestRank', 'gameTime', 'age'];
      
          if(!game.state.checked) {
              continue
          } 
              data = {
                  game: game.id,
                  email: email,
                  rank: game.state.rank,
                  bestRank: game.state.bestRank,
                  gameTime: game.state.time,
                  age: age
              }
              
              const hasError = requiredFields.some((field) => {
                const value = data[field];
                return value === undefined || value === 0;
              });
        
              if (hasError) {
                setWaringMessage('Required field is missing!');
                return;
              }

              options = {
                  method: "POST",
                  headers: {"Content-type": "application/json; charset=UTF-8"},
                  body: JSON.stringify(data)
              }
              fetch('/api/gameStats', options)
                  .then(res => res.json())
                  .then(() => setWaringMessage(''))
                  .then(() => setSuccessMessage('Success!'))
                  .catch(err => console.log(err))
          }
          if(data === undefined) {
            setWaringMessage('Required field is missing!');
          }
      }

      return (
        <>
        <Navbar />
        <div className={styles.container}>
          <h1 className={styles.heading}>Game and Player Ranking</h1>
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
                  <label htmlFor={`${game.id}Rank`} className={styles.subLabel}>Current Rank:</label>
                  <select
                    id={`${game.id}Rank`}
                    className={styles.select}
                    value={game.state.rank}
                    onChange={(e) => handleGameRankChange(game, e.target.value)}
                    >
                    {getRankOptions(game.id)}
                    </select>
                  <label htmlFor={`${game.id}BestRank`} className={styles.subLabel}>Highest Rank:</label>
                  <select
                    id={`${game.id}BestRank`}
                    className={styles.select}
                    value={game.state.bestRank}
                    onChange={(e) => handleGameBestRankChange(game, e.target.value)}
                    >
                    {getBestRankOptions(game.id)}
                  </select>
                  <label htmlFor={`${game.id}Time`} className={styles.subLabel}>Game Time (in hours):</label>
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
            <label htmlFor="age" className={styles.label}>Age: </label>
            <input
              type="number"
              id="age"
              className={styles.input}
              value={age}
              onChange={handleAgeChange}
            />
          </div>
          <div>
            <button className={styles.task_button} onClick={sendGameData}>
                <p>
                    Save
                </p>
            </button>
            {waringMessage && <p style={{color:'red', marginTop:'10px'}}>{waringMessage}</p>}
            {successMessage && <p style={{color:'rgba(51, 255, 0, 0.7)', marginTop:'10px'}}>{successMessage}</p>}
          </div>
        </div>
        </>
      );
}

export async function getServerSideProps({ req } : any){
    const session = await getSession({ req })
    const email = session?.user?.email || null
    if(!session){
      return {
        redirect : {
          destination: '/login',
          permanent: false
        }
      }
    }
    return {
      props: { email }
    }
  }