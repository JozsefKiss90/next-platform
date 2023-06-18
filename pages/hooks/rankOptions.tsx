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
      default:
        return null;
    }
  }
  
export function getBestRankOptions(gameId :string) {
    return getRankOptions(gameId);
  }
