import React, {useState} from 'react';
import './App.css';
import CardPanel from './card/cardPanel.js';
import InputOutputInterface from "./InputOutput/inputOutputInterface";
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [characterList, setCharacterList] = useState([{
        "id":uuidv4(),
        "name": "Atsuko Kagari",
        "series": "Little Witch Academia",
        "pictureUrl": "https://imgur.com/Vk3jbUB.png",
        "skip": false,
        "elo": 1600
    },
    {
        "id":uuidv4(),
            "name": "Aoi Kiriya",
            "series": "Aikatsu",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/553762506217226250/SNVvtNb.png",
            "skip": true,
        "elo": 1600
    },
       {
        "id":uuidv4(),
            "name": "Riza Hawkeye",
            "series": "Full Metal Alchemist",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/748751337042346004/2yvxZvc.png",
            "skip": false,
           "elo": 1600
        },
        {
        "id":uuidv4(),
            "name": "Belldandy",
            "series": "Ah! My Goddess",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/723706845981573180/7WfEVKD.png",
            "skip": false,
            "elo": 1600
        }, {
        "id":uuidv4(),
            "name": "Skuld",
            "series": "Ah! My Goddess",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/745504419549937734/i9Gxa0x.png",
            "skip": false,
            "elo": 1600
        },        {
        "id":uuidv4(),
            "name": "Myne",
            "series": "AScendance of a Bookworm",
            "pictureUrl": "https://imgur.com/USq1uFs.png",
            "skip": false,
            "elo": 1600
        },
        {
        "id":uuidv4(),
            "name": "Satanichia Kurumizawa McDowell",
            "series": "Gabriel Drop",
            "pictureUrl": "https://imgur.com/dAhzyT5.png",
            "skip": false,
            "elo": 1600
        },
         {
        "id":uuidv4(),
            "name": "Miria Harvent",
            "series": "Baccano",
            "pictureUrl": "https://imgur.com/Q6Wr9fz.png",
            "skip": true,
             "elo": 1600
        },
         {
        "id":uuidv4(),
            "name": "Casca",
            "series": "Berserk",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/745507542221717504/jo2UdYR.png",
            "skip": false,
             "elo": 1600
        },
         {
        "id":uuidv4(),
            "name": "Michiru Kagemori",
            "series": "BNA",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/722686553914343516/B2Uwazu.png",
            "skip": false,
             "elo": 1600
        },         {
        "id":uuidv4(),
            "name": "Ochako Uraraka",
            "series": "Boku no Hero ACademia",
            "pictureUrl": "https://imgur.com/EVHh9W6.png",
            "skip": false,
            "elo": 1600
        },         {
        "id":uuidv4(),
            "name": "Chii",
            "series": "Chobits",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/533092429516242944/8StN5cE.png",
            "skip": false,
            "elo": 1600
        }, {
        "id":uuidv4(),
            "name": "C.C.",
            "series": "Code Geass",
            "pictureUrl": "https://i.imgur.com/1bTeiEN.png",
            "skip": true,
            "elo": 1600
        },
         {
        "id":uuidv4(),
            "name": "Hikair Takanashi",
            "series": "Demi-chan",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/533070945339047936/lbork0A.png",
            "skip": false,
             "elo": 1600
        },
         {
        "id":uuidv4(),
            "name": "Hibiki Sakura",
            "series": "Dumbbell",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/582724579558948869/bbMoDoB.png",
            "skip": false,
             "elo": 1600
        },         {
        "id":uuidv4(),
            "name": "Ishtar",
            "series": "Fate/Grand order",
            "pictureUrl": "https://imgur.com/DBigfuf.png",
            "skip": true,
            "elo": 1600
        },         {
        "id":uuidv4(),
            "name": "Tohru Honda",
            "series": "Fruits Basket",
            "pictureUrl": "https://media.discordapp.net/attachments/472313197836107780/747642418924486716/iy1Np5H.png",
            "skip": false,
            "elo": 1600
        }
]);
    const [isSorting, toggleSort] = useState(false)

    function updateCharacterList(cards) {
        setCharacterList(cards);
    }

    return (
        <div className={"App"}>
            <InputOutputInterface characterList={characterList} updateCharacterList={updateCharacterList} startSort={toggleSort}/>
            <CardPanel characterList={characterList} updateCharacterList={updateCharacterList} toggleSort={toggleSort} isSorting={isSorting}/>
        </div>
    );
}

export default App;