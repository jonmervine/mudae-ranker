import React, {useState} from 'react';
import './inputOutputInterface.scss';
import { v4 as uuidv4 } from 'uuid';

function InputOutputInterface({characterList, updateCharacterList, startSort}) {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");

    function cleanOutput() {
        setOutputText("")
    }

    function reset() {
        // TODO Change to library or custom implementation. window.confirm is a blocking modal
        if (window.confirm("Clear everything?")) {
            setOutputText("")
            setInputText("")
            updateCharacterList([])
        }
    }

    function parseInput() {
        console.log("starting parsing of input text");

        let processingText = inputText;
        console.log("start processing text is: " + processingText);

        //Remove Multiple newlines
        processingText = processingText.replace(/\n\n+/g,'\n');
        console.log("remove multiple new lines: " + processingText);

        //Remove zero-width spaces
        processingText = processingText.replace(/\u200b/g,'');
        console.log("remove empty 0 width spaces: " + processingText);

        //Get rid of Timestamps
        processingText = processingText.replace(/\[([1-9]|1[12]):([0-5][0-9]) [AP]M\] BOTMuda(e|maid)( \d+)?: /gi, '');
        processingText = processingText.replace(/Muda(e|maid \d+)BOTToday at ([1-9]|1[12]):([0-5][0-9]) [AP]M/gi, '');
        console.log("rid of timestamps: " + processingText);

        // Clear the character counts on series and put a '$' before the series name for splitting
        processingText = processingText.replace(/(.*) (- | +)\d+\/\d+/g, '$$$1');
        console.log("clear character counts: " + processingText);

        let initialSeriesArray = processingText.split('$').slice(1);
        console.log("split and splice processingText: " + initialSeriesArray);

        let seriesArray = [];

        for (let seriesData of initialSeriesArray) {
            let series = seriesData.trim().split('\n');
            const seriesName = series.splice(0,1)[0].trim();
            console.log("Series Name: " + seriesName);

            for (let characterData of series) {
                let originalName = characterData.replace(/ - https:.*/i, '').replace(/(?: \| .*)?/gi, '').trim();
                let imageURLIndex = characterData.lastIndexOf(' - https:');
                let characterImage = null;

                if (imageURLIndex > 0) {
                    characterImage = characterData.substring(imageURLIndex + 3).trim();
                    console.log("Card Image: " + characterImage);
                }

                const characterName = originalName.replace(/(?: \([A-Z]+\))?/gi, '').trim();
                console.log("Card Name: " + characterName);

                let uniqueKey = uuidv4()

                let character = {
                    id: uniqueKey,
                    name: characterName,
                    series: seriesName,
                    pictureUrl: characterImage,
                    skip: false,
                    elo: 1600
                };

                console.log("Adding Card: " + character);

                seriesArray.push(character);
            }
        }

        updateCharacterList(seriesArray);
    }

    function printOrder() {
        let outputDisplay = ""
        for (let character of characterList) {
            outputDisplay = outputDisplay + character.name + " " + character.elo + "\n"
        }
        setOutputText(outputDisplay)
    }

    function startSorting() {
        startSort(true)
    }

    return (
        <div>
            <div className={"TextFields"}>
                <textarea value={inputText} onChange={event => setInputText(event.target.value)}/>
                <textarea value={outputText} readOnly={true}/>
            </div>
            <div className={"ButtonRow"}>
                <button onClick={parseInput}>Parse Input</button>
                <button onClick={startSorting}>Start Ranking</button>
                <button>Resume Ranking</button>
                <button>Export All Characters</button>
                <button onClick={printOrder}>Generate Sort Commands</button>
                <button onClick={cleanOutput}>Clean Output</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default InputOutputInterface;