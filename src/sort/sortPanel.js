import React, {useState} from 'react';
import './sortPanel.scss';
import {GrClose} from 'react-icons/gr';
import EloRating from "../EloRating";

function SortPanel({characterList, closeSort, updateCharacters}) {
    const [left, setLeft] = useState(randomNumber());
    const [right, setRight] = useState(randomNumber());

    function randomNumber() {
        return Math.floor(Math.random() * characterList.length);
    }

    function stopSorting() {
        closeSort();
    }

    function sortChoice(winnerIndex, loserIndex) {
        const winner = characterList[winnerIndex];
        const loser = characterList[loserIndex];
        const [newWinnerElo, newLoserElo] = EloRating(winner.elo, loser.elo);
        winner.elo = newWinnerElo;
        loser.elo = newLoserElo;
        characterList[winnerIndex] = winner;
        characterList[loserIndex] = loser;
        updateCharacters(characterList)

        refreshChoice();
    }

    function refreshChoice() {
        const left = randomNumber();
        let right;
        do {
            right = randomNumber();
        } while(left === right)

        setLeft(left);
        setRight(right);
    }

    return (
        <div className={"sortBox"}>
            <div className={"header"}>
                <div className={"title"}>Choose One</div>
                <div className={"Close"} title={"Close SortableCard"}>
                    <GrClose size={"1.5em"} onClick={stopSorting}/>
                </div>
            </div>
            <div className={"decisionPanel"}>
                <div className={"choicePanel"}>
                    <div className={"sortCharacterThumbnail"} onClick={(event) =>{sortChoice(left, right)}}>
                        <img referrerPolicy="no-referrer" className={"sortPicture"} alt={characterList[left].name} src={characterList[left].pictureUrl}/>
                    </div>
                    <button className={"sortSkip"} onClick={refreshChoice}>Skip</button>
                </div>
                <div className={"choicePanel"}>
                    <div className={"sortCharacterThumbnail"} onClick={(event) =>{sortChoice(right, left)}}>
                        <img referrerPolicy="no-referrer" className={"sortPicture"} alt={characterList[right].name}
                             src={characterList[right].pictureUrl}/>
                    </div>
                    <button className={"sortSkip"} onClick={refreshChoice}>Skip</button>
                </div>
            </div>
        </div>
    );
}

export default SortPanel