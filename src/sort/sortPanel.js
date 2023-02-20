import React, {useState} from 'react';
import './sortPanel.scss';
import {GrClose} from 'react-icons/gr';
import EloRating from "../EloRating";

function SortPanel({characterList, closeSort, updateCharacters}) {

    function stopSorting() {
        closeSort();
    }

    return (
        <div className={"sortBox"}>
            <div className={"header"}>
                <div className={"title"}>Choose One</div>
                <div className={"Close"} title={"Close SortableCard"}>
                    <GrClose className={"closeX"} size={"1.5em"} onClick={stopSorting}/>
                </div>
            </div>

            <div className={"decisionPanel"}>
                <ChoicePanels characterList={characterList} updateCharacters={updateCharacters}/>
            </div>
        </div>
    );
}

export default SortPanel

export function ChoicePanels({characterList, updateCharacters}) {
    const [choices, setChoices] = useState(5);

    const [choiceOrder, setChoiceOrder] = useState([]);
    const [panelChars, setPanelChars] = useState(refreshChoice());

    function randomNumber() {
        return Math.floor(Math.random() * characterList.length);
    }

    function makeChoice(choice) {
        console.log("before: panelChars: " + panelChars + " && choiceOrder: " + choiceOrder);

        let derp = choiceOrder;
        derp.push(choice);
        setChoiceOrder(derp);

        console.log("after: panelChars: " + panelChars + " && choiceOrder: " + choiceOrder);

        if (choiceOrder.length >= choices - 1) {
            console.log("THIS ISNT TRIGGERING");


            let missing = [];
            for (let i = 0; i < choices; i++) {
                if (choiceOrder.indexOf(i) === -1) {
                    missing.push(i);
                }
            }

            console.log("adding " + missing + " to choiceOrder")
            let herp = choiceOrder;
            herp.push(missing[0]);
            setChoiceOrder(herp);

            for (let i = 0; i < choices - 1; i++) {
                const winnersIndex = panelChars[choiceOrder[i]];
                const losersIndex = panelChars[choiceOrder[i+1]];
                console.log(winnersIndex + " > " + losersIndex);
                console.log(characterList[winnersIndex]);
                const winner = characterList[winnersIndex];
                const loser = characterList[losersIndex];

                console.log(winner);
                console.log(loser);

                const [newWinnerElo, newLoserElo] = EloRating(winner.elo, loser.elo);
                winner.elo = newWinnerElo;
                loser.elo = newLoserElo;
                characterList[winnersIndex] = winner;
                characterList[losersIndex] = loser;
                updateCharacters(characterList);
            }
            setChoiceOrder([])
            setPanelChars(refreshChoice());
        }
    }

    function refreshChoice() {
        const newNumbers = new Set();
        do {
            newNumbers.add(randomNumber());
        } while(newNumbers.size < choices)

        return Array.from(newNumbers);
    }
    // TODO The randomness is fine but  needs to be a bit more evenly distributed. So that after so many rounds everyone has roughly the same number of appearances
    let choicePanels = [];
    for (let i = 0; i < choices; i++) {

        choicePanels.push(

            // TODO The choiceOrder.includes isn't updating/refreshing, probably because in an array and the array needs to re/return
            <div key={characterList[panelChars[i]].id} className={"choicePanel"}>
                {console.log(choiceOrder + " " + i)}
                { choiceOrder.includes(i) && <div id={"chosenPanelTransparency"} /> }
                    <div className={"sortCharacterThumbnail"} onClick={(event) =>{makeChoice(i)}}>
                        <img referrerPolicy="no-referrer" className={"sortPicture"} alt={characterList[panelChars[i]].name} src={characterList[panelChars[i]].pictureUrl}/>
                    </div>
                <button className={"sortSkip"} onClick={refreshChoice}>Skip</button>
            </div>
        );
    }

    return choicePanels;
}
