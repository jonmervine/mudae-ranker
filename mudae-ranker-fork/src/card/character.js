import React, {useState} from 'react';
import './character.scss';
import {FaRegTrashAlt} from 'react-icons/fa';
import {GrClose} from 'react-icons/gr';

function Character({character, index, handleClose, handleRemoval, toggleSkip}) {
    const {name, series, pictureUrl, skip} = character;
    const [localSkip, setLocalSkip] = useState(skip);

    function closeDetails() {
        handleClose();
    }

    function trashcanRemove() {
        handleRemoval(index);
    }

    function changeSkip() {
        // Not working might help https://stackoverflow.com/questions/43476729/react-checkbox-does-not-update
        console.log("initial localSkip: " + localSkip + " what is : " + !localSkip);
        setLocalSkip(initialState => ({
            localSkip: !initialState
        }));
        console.log("new localSkip: " + localSkip);
        toggleSkip(localSkip, index);
    }

    return (
        <div className={"CharacterCard"}>
            <div className={"CardHeader"}>
                <div className={"Name"}>{name}</div>
                <div className={"Close"} title={"Close Card"}>
                    <GrClose onClick={closeDetails}/>
                </div>
            </div>
            <div className={"Series"}>{series}</div>
            <img className={"Picture"} alt={""} src={pictureUrl}/>
            <div className={"URL"}>
                <label>URL:</label>
                <input type={"text"} value={pictureUrl} readOnly={true} />
            </div>
            <div className={"CardFooter"}>
                <div className={"Skip"}>
                    <input
                        type={"checkbox"}
                        checked={localSkip}
                        onChange={changeSkip}
                    />
                    <label>Skip</label>
                </div>
                <div className={"Delete"} title={"Delete Card"}>
                    <FaRegTrashAlt onClick={trashcanRemove}/>
                </div>
            </div>
        </div>
    );
}

export default Character;
