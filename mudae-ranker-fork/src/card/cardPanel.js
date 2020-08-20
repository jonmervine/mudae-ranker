import React from 'react';
import CharacterCard from './characterCard.js';
import AddCard from './addCard';
import './characterCard.scss';

function CardPanel({cardList}) {
    return (
        <div>
            <AddCard/>
            <div className={"CardPanel"}>
                {cardList.map(
                    singleCard => <CharacterCard card={singleCard} key={singleCard.key}/>
                )}
            </div>
        </div>
    );
}

export default CardPanel;