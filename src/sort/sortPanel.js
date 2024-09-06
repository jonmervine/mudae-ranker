import React, {useState} from 'react';
import './sortPanel.scss';
import {GrClose} from 'react-icons/gr';
import EloRating from "../EloRating";
import {create} from "@mui/material/styles/createTransitions";

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
    const [nbrChoices, setNbrChoices] = useState(5);

    // The pool to pull from
    const [randomPool, setRandomPool] = useState(createRandomPool());

    // Choices as they are made
    const [choiceOrder, setChoiceOrder] = useState([]);

    // The character panels to choose from
    const [panelChars, setPanelChars] = useState(refreshChoice());


    function createRandomPool() {
        console.log("populate pool");
        let tempNumberList = [];
        for (let i = 0; i < characterList.length; i++) {
            tempNumberList.push(i);
        }
        let resultArray = shuffleArray(tempNumberList);
        console.log("resultPool: " + resultArray);
        return resultArray
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function refreshChoice() {
        console.log("Refresh Choice");
        let tempPool = randomPool;
        let tempPanelChars = [];
        let amountNeeded = nbrChoices;

        if (tempPool.length < amountNeeded) {
            console.log("need to refresh pool: " + tempPool.length + " left");
            let generatedPool = createRandomPool();
            tempPanelChars.push(...generatedPool.splice(0, amountNeeded));
            setRandomPool(generatedPool);
        } else {
            tempPanelChars.push(...tempPool.splice(0, amountNeeded));
        }

        console.log("refreshed to Panel of: " + tempPanelChars + " length " + tempPanelChars.length);
        return tempPanelChars;
    }

    function randomNumber() {
        return Math.floor(Math.random() * characterList.length);
    }

    function makeChoice(choice) {
        console.log("before: panelChars: " + panelChars + " && choiceOrder: " + choiceOrder);

        let derp = choiceOrder;
        derp.push(choice);
        setChoiceOrder(derp);

        console.log("after: panelChars: " + panelChars + " && choiceOrder: " + choiceOrder);

        if (choiceOrder.length >= nbrChoices - 1) {
            console.log("THIS ISNT TRIGGERING");


            let missing = [];
            for (let i = 0; i < nbrChoices; i++) {
                if (choiceOrder.indexOf(i) === -1) {
                    missing.push(i);
                }
            }

            console.log("adding " + missing + " to choiceOrder")
            let herp = choiceOrder;
            herp.push(missing[0]);
            setChoiceOrder(herp);

            for (let i = 0; i < nbrChoices - 1; i++) {
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

    console.log("RandomPool: " + randomPool);
    console.log("ChoiceOrder: " + choiceOrder);
    console.log("PanelChars: " + panelChars);

    let choicePanels = [];
    for (let i = 0; i < nbrChoices; i++) {
        console.log("i: " + i);
        console.log("panelChar[i]: " + panelChars[i]);
        console.log("characterList[PanelCahrs[i]]: " + characterList[panelChars[i]]);
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
