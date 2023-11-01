export function getRankOptions(gameId:string) {
    switch (gameId) {
      case 'cs':
        return (
          <>
            <option> </option>
            <option>Silver I</option>
            <option>Silver II</option>
            <option>Silver III</option>
            <option>Silver IV</option>
            <option>Silver Elite</option>
            <option>Silver Elite Master</option>
            <option>Gold Nova I</option>
            <option>Gold Nova II</option>
            <option>Gold Nova III</option>
            <option>Gold Nova Master</option>
            <option>Master Guardian I</option>
            <option>Master Guardian II</option>
            <option>Master Guardian Elite</option>
            <option>Distinguished Master Guardian</option>
            <option>Legendary Eagle</option>
            <option>Legendary Master Eagle</option>
            <option>Supreme Master First Class</option>
            <option>Global Elite</option>
          </>
        );
      case 'cod':
        return (
          <>
            <option> </option>
            <option>Bronze</option>
            <option>Silver</option>
            <option>Gold</option>
            <option>Platinum</option>
            <option>Diamond</option>
            <option>Crimson</option>
            <option>Iridescent</option>
            <option>Top 250</option>
          </>
        );  
      case 'dota':
        return (
          <>
            <option> </option>
            <option>Herald</option>
            <option>Guardian</option>
            <option>Crusader</option>
            <option>Archon</option>
            <option>Legend</option>
            <option>Ancient</option>
            <option>Divine</option>
            <option>Immortal</option>
          </>
        );
      case 'lol':
        return (
          <>
            <option> </option>
            <option>Iron</option>
            <option>Bronze</option>
            <option>Silver</option>
            <option>Gold</option>
            <option>Platinum</option>
            <option>Diamond</option>
            <option>Master</option>
            <option>Grandmaster</option>
            <option>Challenger</option>
          </>
        );
      case 'fifa':
        return (
          <>
            <option> </option>
            <option>Rank 1</option>
            <option>Rank 2</option>
            <option>Rank 3</option>
            <option>Rank 4</option>
            <option>Rank 5</option>
            <option>Rank 6</option>
            <option>Rank 7</option>
            <option>Rank 8</option>
            <option>Rank 9</option>
            <option>Rank 10</option>
          </>
        );
        case 'hearthstone':
          return (
            <>
              <option> </option>
              <option>Bronze 10</option>
              <option>Bronze 9</option>
              <option>Bronze 8</option>
              <option>Bronze 7</option>
              <option>Bronze 6</option>
              <option>Bronze 5</option>
              <option>Bronze 4</option>
              <option>Bronze 3</option>
              <option>Bronze 2</option>
              <option>Bronze 1</option>
              <option>Silver 10</option>
              <option>Silver 9</option>
              <option>Silver 8</option>
              <option>Silver 7</option>
              <option>Silver 6</option>
              <option>Silver 5</option>
              <option>Silver 4</option>
              <option>Silver 3</option>
              <option>Silver 2</option>
              <option>Silver 1</option>
              <option>Gold 10</option>
              <option>Gold 9</option>
              <option>Gold 8</option>
              <option>Gold 7</option>
              <option>Gold 6</option>
              <option>Gold 5</option>
              <option>Gold 4</option>
              <option>Gold 3</option>
              <option>Gold 2</option>
              <option>Gold 1</option>
              <option>Platinum 10</option>
              <option>Platinum 9</option>
              <option>Platinum 8</option>
              <option>Platinum 7</option>
              <option>Platinum 6</option>
              <option>Platinum 5</option>
              <option>Platinum 4</option>
              <option>Platinum 3</option>
              <option>Platinum 2</option>
              <option>Platinum 1</option>
              <option>Diamond 10</option>
              <option>Diamond 9</option>
              <option>Diamond 8</option>
              <option>Diamond 7</option>
              <option>Diamond 6</option>
              <option>Diamond 5</option>
              <option>Diamond 4</option>
              <option>Diamond 3</option>
              <option>Diamond 2</option>
              <option>Diamond 1</option>
              <option>Legend</option>
            </>
          );        
      case 'ow':
      case 'sc':
        return (
          <>
            <option> </option>
            <option>Bronze</option>
            <option>Silver</option>
            <option>Gold</option>
            <option>Platinum</option>
            <option>Diamond</option>
            <option>Master</option>
            <option>Grandmaster</option>
          </>
        );
      case 'brawlstars':
        return (
          <>
            <option> </option>
            <option>Rank 1 (0-9 trophies)</option>
            <option>Rank 2 (10-19 trophies)</option>
            <option>Rank 3 (20-49 trophies)</option>
            <option>Rank 4 (50-99 trophies)</option>
            <option>Rank 5 (100-149 trophies)</option>
            <option>Rank 6 (150-199 trophies)</option>
            <option>Rank 7 (200-299 trophies)</option>
            <option>Rank 8 (300-399 trophies)</option>
            <option>Rank 9 (400-499 trophies)</option>
            <option>Rank 10 (500-599 trophies)</option>
            <option>Rank 11 (600-699 trophies)</option>
            <option>Rank 12 (700-799 trophies)</option>
            <option>Rank 13 (800-899 trophies)</option>
            <option>Rank 14 (900-999 trophies)</option>
            <option>Rank 15 (1000-1099 trophies)</option>
            <option>Rank 16 (1100-1199 trophies)</option>
            <option>Rank 17 (1200-1299 trophies)</option>
            <option>Rank 18 (1300-1399 trophies)</option>
            <option>Rank 19 (1400-1499 trophies)</option>
            <option>Rank 20 (1500-1599 trophies)</option>
            <option>Rank 21 (1600-1699 trophies)</option>
            <option>Rank 22 (1700-1799 trophies)</option>
            <option>Rank 23 (1800-1899 trophies)</option>
            <option>Rank 24 (1900-1999 trophies)</option>
            <option>Rank 25 (2000+ trophies)</option>
          </>
        );        
      case 'clashroyale':
        return (
          <>
            <option> </option>
            <option>Challenger I (4,000 - 4,299 trophies)</option>
            <option>Challenger II (4,300 - 4,599 trophies)</option>
            <option>Challenger III (4,600 - 4,899 trophies)</option>
            <option>Master I (4,900 - 5,199 trophies)</option>
            <option>Master II (5,200 - 5,499 trophies)</option>
            <option>Master III (5,500 - 5,799 trophies)</option>
            <option>Champion (5,800 - 6,099 trophies)</option>
            <option>Grand Champion (6,100 - 6,399 trophies)</option>
            <option>Ultimate Champion (6,400+ trophies)</option>
          </>
        );
      case 'rocketleague':
        return (
          <>
            <option> </option>
            <option>Bronze I</option>
            <option>Bronze II</option>
            <option>Bronze III</option>
            <option>Silver I</option>
            <option>Silver II</option>
            <option>Silver III</option>
            <option>Gold I</option>
            <option>Gold II</option>
            <option>Gold III</option>
            <option>Platinum I</option>
            <option>Platinum II</option>
            <option>Platinum III</option>
            <option>Diamond I</option>
            <option>Diamond II</option>
            <option>Diamond III</option>
            <option>Champion I</option>
            <option>Champion II</option>
            <option>Champion III</option>
            <option>Grand Champion I</option>
            <option>Grand Champion II</option>
            <option>Grand Champion III</option>
            <option>Supersonic Legend</option>
          </>
        );
      case 'dragonballfighterz':
        return (
          <>
            <option> </option>
            <option>Saibaman</option>
            <option>Earthling</option>
            <option>Namekian</option>
            <option>Saiyan</option>
            <option>Frieza Clan</option>
            <option>Super Saiyan</option>
            <option>Android</option>
            <option>Super Saiyan 2</option>
            <option>Supreme Kai</option>
            <option>Demon</option>
            <option>Super Saiyan 3</option>
            <option>Majin</option>
            <option>Super Saiyan God</option>
            <option>Super Saiyan Blue</option>
            <option>Living Legend</option>
            <option>Super Saiyan Rosé</option>
            <option>Pride Trooper</option>
            <option>Ultra Instinct -Sign-</option>
            <option>SSB Evolved</option>
            <option>God Of Destruction</option>
            <option>Ultra Instinct</option>
            <option>Angel</option>
            <option>Great Priest</option>
            <option>Zen-Oh</option>
          </>
        );
      case 'mortalkombat11':
        return (
          <>
            <option> </option>
            <option>Apprentice</option>
            <option>Kombatant</option>
            <option>Warrior</option>
            <option>Champion</option>
            <option>Master</option>
            <option>Grandmaster</option>
            <option>Demi-God</option>
            <option>God</option>
            <option>Elder God</option>
            <option>Eternal God</option>
          </>
        );
      default:
        return null;
    }
  }
  
export function getBestRankOptions(gameId :string) {
    return getRankOptions(gameId);
  }
