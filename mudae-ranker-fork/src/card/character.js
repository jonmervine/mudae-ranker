import React, {useState} from 'react';
import './character.scss';
import {FaRegTrashAlt, FaSave} from 'react-icons/fa';
import {GrClose} from 'react-icons/gr';

function Character({character, index, handleClose, handleRemoval, toggleSkip, updateUrl}) {
    const {name, series, pictureUrl, skip} = character;
    const [skipChecked, setSkipChecked] = useState(skip);
    const [imageUrl, setImageUrl] = useState(pictureUrl);
    const [displayImage, setDisplayImage] = useState(pictureUrl);

    function closeDetails() {
        handleClose();
    }

    function trashcanRemove() {
        handleRemoval(index);
    }

    function changeSkip() {
        let isChecked = !skipChecked
        setSkipChecked(isChecked);
        toggleSkip(isChecked, index);
    }

    function updateImage() {
        updateUrl(imageUrl, index);
        setDisplayImage(imageUrl);
    }

    const inlineStyles = {
        backgroundColor: skip?'lightcoral':'white',
    };

    return (
        <div style={inlineStyles} className={"CharacterCard"}>
            <div className={"CardHeader"}>
                <div className={"Name"}>{name}</div>
                <div className={"Close"} title={"Close Card"}>
                    <GrClose size={"1.5em"} onClick={closeDetails}/>
                </div>
            </div>
            <div className={"Series"}>{series}</div>
            <img className={"Picture"} alt={""} src={displayImage}/>
            <div className={"URL"}>
                <label>URL:</label>
                <input type={"text"} value={imageUrl} onChange={event=>setImageUrl(event.target.value)} />
                <div className={"SaveImage"}>
                <FaSave color={"dodgerblue"} size={"1.5em"} onClick={updateImage}/>
                </div>
            </div>
            <div className={"CardFooter"}>
                <div className={"Skip"} onClick={changeSkip}>
                    <input
                        type={"checkbox"}
                        checked={skipChecked}
                        onChange={changeSkip}
                    />
                    <label>Skip</label>
                </div>
                <div className={"Delete"} title={"Delete Card"}>
                    <FaRegTrashAlt color={"indianred"} size={"1.5em"} onClick={trashcanRemove}/>
                </div>
            </div>
        </div>
    );
}

export default Character;
