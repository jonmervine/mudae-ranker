import React, {useState} from 'react';
import CardPanel from './card/cardPanel.js';
import InputOutputInterface from "./InputOutput/inputOutputInterface";

function Main() {
    const [cardList, setCardList] = useState([
        {
            key: 0,
            name: "Atsuko Kagari",
            series: "Little Witch Academia",
            pictureUrl: "https://imgur.com/Vk3jbUB.png",
            skip: false
        },
        {
            key: 1,
            name: "Aoi Kiriya",
            series: "Aikatsu",
            pictureUrl: "https://media.discordapp.net/attachments/472313197836107780/553762506217226250/SNVvtNb.png",
            skip: true
        }
    ]);

    function updateCardList(cards) {
        setCardList(cards);
    }

    return (
        <div>
            <InputOutputInterface updateCardList={updateCardList}/>
            <CardPanel cardList={cardList}/>
        </div>
    );
}

export default Main;
