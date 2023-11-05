export const sendGameData = (gameData:any) => {

    let data : any

    let options 

    for(let game of gameData.games) {
        const requiredFields = ['game', 'email', 'rank', 'bestRank', 'gameTime', 'age'];

        if(!game.state.checked) {
            continue
        } 
            data = {
                game: game.id,
                email: gameData.email,
                rank: game.state.rank,
                bestRank: game.state.bestRank,
                gameTime: game.state.time,
                age: gameData.age
            }
            
            const hasError = requiredFields.some((field) => {
                const value = data[field];
                return value === undefined || value === 0;
            });
        
            if (hasError) {
                gameData.setWaringMessage('Required field is missing!');
                return;
            }

            options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                    //"Session": JSON.stringify(session) 
                },
                body: JSON.stringify(data)
            }
            fetch('/api/gameStats', options)
                .then(res => res.json())
                .then(() => gameData.setWaringMessage(''))
                .then(() => gameData.setSuccessMessage('Mentve!'))
                .catch(err => console.log(err))
        }
        if(data === undefined) {
            gameData.setWaringMessage('Required field is missing!');
        }
    }

export const deleteAccount = (gameData:any) => {
    console.log('EMAIL IS: ' + gameData.email);

    let options = {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({email:gameData.email}) 
    };
  
    fetch('/api/userAccount', options)
      .then(res => {
        console.log('Response:', res);
        return res.json();
      })
      .then(() => gameData.setSuccessMessage('Account deleted!'))
      .then(() => gameData.signOut())
      .catch(err => console.log(err));
  };
     