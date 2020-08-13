import React from 'react';
import CharacterCard from './card/characterCard.js';

function Main() {

    const card1 = {
        name: "Atsuko Kagari",
        series: "Little Witch Academia",
        pictureUrl: "https://imgur.com/Vk3jbUB.png"
    };

    return (
        <div>
            <p>Hello</p>
            <CharacterCard cardData={card1}/>
        </div>
    );
}

export default Main;
