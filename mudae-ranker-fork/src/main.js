import React from 'react';
import CardPanel from './card/cardPanel.js';
import InputOutputInterface from "./InputOutput/inputOutputInterface";

function Main() {

    const cards = [
        {
            key: 0,
            name: "Atsuko Kagari",
            series: "Little Witch Academia",
            pictureUrl: "https://imgur.com/Vk3jbUB.png"
        },
        {
            key: 1,
            name: "Aoi Kiriya",
            series: "Aikatsu",
            pictureUrl: "https://media.discordapp.net/attachments/472313197836107780/553762506217226250/SNVvtNb.png"
        }
    ];

    return (
        <div>
            <InputOutputInterface />
            <CardPanel cardList={cards}/>
        </div>
    );
}

export default Main;
