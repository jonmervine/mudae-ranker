import React, {useState} from 'react';
import './App.css';
import CardPanel from './card/cardPanel.js';
import InputOutputInterface from "./InputOutput/inputOutputInterface";
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [characterList, setCharacterList] = useState([
        {
            key: uuidv4(),
            name: "Atsuko Kagari",
            series: "Little Witch Academia",
            pictureUrl: "https://imgur.com/Vk3jbUB.png",
            skip: false
        },
        {
            key: uuidv4(),
            name: "Aoi Kiriya",
            series: "Aikatsu",
            pictureUrl: "https://media.discordapp.net/attachments/472313197836107780/553762506217226250/SNVvtNb.png",
            skip: true
        }
    ]);

    function updateCharacterList(cards) {
        setCharacterList(cards);
    }

    return (
        <div className={"App"}>
            <InputOutputInterface updateCharacterList={updateCharacterList}/>
            <CardPanel characterList={characterList} updateCharacterList={updateCharacterList}/>
        </div>
    );
}

export default App;