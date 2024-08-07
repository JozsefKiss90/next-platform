import { useState } from 'react';
import { ChangeEvent } from 'react';
import { GameStateType } from '../types/types';

export default function gameRanking() {

  const [cs, setCs] = useState({
    checked: false,
    rank: '',
    bestRank: '',
    time: 0,
  });

  const [cod, setCod] = useState({
    checked: false,
    rank: '',
    bestRank: '',
    time: 0,
  });

  const [dota, setDota] = useState({
    checked: false,
    rank: '',
    bestRank: '',
    time: 0,
  });

  const [lol, setLol] = useState({
    checked: false,
    rank: '',
    bestRank: '',
    time: 0,
  });

  const [fifa, setFifa] = useState({
    checked: false,
    rank: '',
    bestRank: '',
    time: 0, 
  });

  const [hearthstone, setHearthstone] = useState({
    checked: false,
    rank: '',
    bestRank: '',
    time: 0,
  });

  const [ow, setOw] = useState({
    checked: false,
    rank: '',
    bestRank: '',
    time: 0,
  });

  const [sc, setSc] = useState({
    checked: false,
    rank: '',
    bestRank: '',
    time: 0,
  });

  const [brawl, setBrawl] = useState({
    checked: false,
    rank: '',
    bestRank: '',
    time: 0,
  });

  const [clash, setClash] = useState({
    checked: false,
    rank: '',
    bestRank: '',
    time: 0,
  });

  const [rocket, setRocket] = useState({
    checked: false,
    rank: '',
    bestRank: '',
    time: 0,
  });

  const [dbz, setDbz] = useState({
    checked: false,
    rank: '',
    bestRank: '',
    time: 0,
  });


  const [mortal, setMortal] = useState({
    checked: false,
    rank: '',
    bestRank: '',
    time: 0,
  });

  const games = [
    { id: 'cs', label: 'Counter Strike', state: cs, setState: setCs },
    { id: 'cod', label: 'Call of Duty: Warzone', state: cod, setState: setCod },
    { id: 'dota', label: 'Dota 2', state: dota, setState: setDota },
    { id: 'lol', label: 'League of Legends', state: lol, setState: setLol },
    { id: 'fifa', label: 'FIFA', state: fifa, setState: setFifa },
    { id: 'hearthstone', label: 'Hearthstone', state: hearthstone, setState: setHearthstone },
    { id: 'ow', label: 'Overwatch', state: ow, setState: setOw },
    { id: 'sc', label: 'Starcraft', state: sc, setState: setSc },
    { id: 'brawlstars', label: 'Brawl Stars', state: brawl, setState: setBrawl },
    { id: 'clashroyale', label: 'Clash Royale', state: clash, setState: setClash },
    { id: 'rocketleague', label: 'Rocket League', state: rocket, setState: setRocket },
    { id: 'dragonballfighterz', label: 'Dragon Ball FighterZ ', state: dbz, setState: setDbz },
    { id: 'mortalkombat11', label: 'Mortal Kombat 11 ', state: mortal, setState: setMortal },
  ];

  const [age, setAge] = useState(14);

  const handleGameChecked = (game: { state: GameStateType, setState: React.Dispatch<React.SetStateAction<GameStateType>> }, checked: boolean) => {
    game.setState({ ...game.state, checked: checked });
  };

  const handleGameRankChange = (game: { state: GameStateType, setState: React.Dispatch<React.SetStateAction<GameStateType>> }, rank : string) => {
    game.setState({ ...game.state, rank: rank });
  };

  const handleGameBestRankChange = (game: { state: GameStateType, setState: React.Dispatch<React.SetStateAction<GameStateType>> }, bestRank : string) => {
    game.setState({ ...game.state, bestRank: bestRank });
  };

  const handleGameTimeChange = (game: { state: GameStateType, setState: React.Dispatch<React.SetStateAction<GameStateType>> }, time : number) => {
    game.setState({ ...game.state, time: time });
  };

  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(event.target.value));
  };

  return {
    games,
    age,
    setAge,
    handleGameChecked,
    handleGameRankChange,
    handleGameBestRankChange,
    handleGameTimeChange,
    handleAgeChange,
  };
};
