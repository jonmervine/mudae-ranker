import React, {useState} from 'react';
import './App.css';
import CardPanel from './card/cardPanel.js';
import InputOutputInterface from "./InputOutput/inputOutputInterface";
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [characterList, setCharacterList] = useState({
        [uuidv4()]: {
            "name": "Atsuko Kagari",
            "series": "Little Witch Academia",
            "pictureUrl": "https://imgur.com/Vk3jbUB.png",
            "skip": false,
            "position":0
        },
    [uuidv4()]: {
            "name": "Aoi Kiriya",
            "series": "Aikatsu",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/553762506217226250/SNVvtNb.png",
            "skip": true,
        "position":1
    },
        [uuidv4()]: {
            "name": "Riza Hawkeye",
            "series": "Full Metal Alchemist",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/748751337042346004/2yvxZvc.png",
            "skip": false,
            "position":2
        },
        [uuidv4()]: {
            "name": "Belldandy",
            "series": "Ah! My Goddess",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/723706845981573180/7WfEVKD.png",
            "skip": false,
            "position":3
        },        [uuidv4()]: {
            "name": "Skuld",
            "series": "Ah! My Goddess",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/745504419549937734/i9Gxa0x.png",
            "skip": false,
            "position":4
        },        [uuidv4()]: {
            "name": "Myne",
            "series": "AScendance of a Bookworm",
            "pictureUrl": "https://imgur.com/USq1uFs.png",
            "skip": false,
            "position":5
        },
        [uuidv4()]: {
            "name": "Satanichia Kurumizawa McDowell",
            "series": "Gabriel Drop",
            "pictureUrl": "https://imgur.com/dAhzyT5.png",
            "skip": false,
            "position":6
        },
        [uuidv4()]: {
            "name": "Miria Harvent",
            "series": "Baccano",
            "pictureUrl": "https://imgur.com/Q6Wr9fz.png",
            "skip": true,
            "position":7
        },
        [uuidv4()]: {
            "name": "Casca",
            "series": "Berserk",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/745507542221717504/jo2UdYR.png",
            "skip": false,
            "position":8
        },
        [uuidv4()]: {
            "name": "Michiru Kagemori",
            "series": "BNA",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/722686553914343516/B2Uwazu.png",
            "skip": false,
            "position":9
        },        [uuidv4()]: {
            "name": "Ochako Uraraka",
            "series": "Boku no Hero ACademia",
            "pictureUrl": "https://imgur.com/EVHh9W6.png",
            "skip": false,
            "position":10
        },        [uuidv4()]: {
            "name": "Chii",
            "series": "Chobits",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/533092429516242944/8StN5cE.png",
            "skip": false,
            "position":11
        },[uuidv4()]: {
            "name": "C.C.",
            "series": "Code Geass",
            "pictureUrl": "https://imgur.com/UO8zq5g.png",
            "skip": true,
            "position":12
        },
        [uuidv4()]: {
            "name": "Hikair Takanashi",
            "series": "Demi-chan",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/533070945339047936/lbork0A.png",
            "skip": false,
            "position":13
        },
        [uuidv4()]: {
            "name": "Hibiki Sakura",
            "series": "Dumbbell",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/582724579558948869/bbMoDoB.png",
            "skip": false,
            "position":14
        },        [uuidv4()]: {
            "name": "Ishtar",
            "series": "Fate/Grand order",
            "pictureUrl": "https://imgur.com/DBigfuf.png",
            "skip": false,
            "position":15
        },        [uuidv4()]: {
            "name": "Tohru Honda",
            "series": "Fruits Basket",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/747642418924486716/iy1Np5H.png",
            "skip": false,
            "position":16
        }
});

    function updateCharacterList(cards) {
        setCharacterList(cards);
        console.log(JSON.stringify(cards))
    }
    console.log(JSON.stringify(characterList))
    return (
        <div className={"App"}>
            <InputOutputInterface updateCharacterList={updateCharacterList}/>
            <CardPanel characterList={characterList} updateCharacterList={updateCharacterList}/>
        </div>
    );
}

export default App;