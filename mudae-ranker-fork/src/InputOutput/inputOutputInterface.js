import React from 'react';
import './inputOutputInterface.scss';

function InputOutputInterface() {
    return (
        <div>
            <div className={"TextFields"}>
                <textarea></textarea>
                <textarea></textarea>
            </div>
            <div className={"ButtonRow"}>
                <button>Parse Input</button>
                <button>Start Ranking</button>
                <button>Resume Ranking</button>
                <button>Export All Characters</button>
                <button>Generate Sort Commands</button>
                <button>Clean Output</button>
                <button>Reset</button>
            </div>
        </div>
    );
}

export default InputOutputInterface;