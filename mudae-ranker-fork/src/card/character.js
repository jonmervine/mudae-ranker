import React from 'react';
import './character.scss';
import {FaRegTrashAlt} from 'react-icons/fa';
import {GrClose} from 'react-icons/gr';

function Character({character, index, handleClose, handleRemoval}) {
    const {name, series, pictureUrl, skip} = character;

    function closeDetails() {
        handleClose()
    }

    function trashcanRemove() {
        handleRemoval(index)
    }

    // console.log(character);
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
                        checked={skip}
                        readOnly={true}
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
