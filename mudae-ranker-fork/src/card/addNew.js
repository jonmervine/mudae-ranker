import React, {useState} from 'react';
import './addNew.scss';
import {BsFillXSquareFill, BsPlusSquareFill} from 'react-icons/bs'
import {GrClose} from "react-icons/gr";


function AddNew({handleClose, newCard}) {
    const [name, setName] = useState("");
    const [series, setSeries] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");

    function clearAndClose() {
        setName("")
        setSeries("")
        setPictureUrl("")
        handleClose()
    }

    function addNewCharacter() {
        let newCharacter = {
            name: name,
            series: series,
            pictureUrl: pictureUrl
        }
        newCard(newCharacter)
        clearAndClose()
    }

    return (
        <div className={"box"}>
            <div className={"Header"}>
                <div className={"Title"}>Create New Character Card</div>
                <div className={"Close"} title={"Close"}>
                    <GrClose onClick={clearAndClose}/>
                </div>
            </div>
            <div className={"addInfo"}>
                <label>Character Name:</label>
                <input type={"text"} value={name} onChange={event => setName(event.target.value)}/>
            </div>
            <div className={"addInfo"}>
                <label>Character Series:</label>
                <input type={"text"} value={series} onChange={event => setSeries(event.target.value)}/>
            </div>
            <div className={"addInfo"}>
                <label>Image URL:</label>
                <input type={"text"} value={pictureUrl} onChange={event => setPictureUrl(event.target.value)}/>
            </div>
            <div className={"SaveAndCancelButtons"}>
                <BsPlusSquareFill className={"SaveCharacter"} title={"Add Card"} onClick={addNewCharacter}/>
                <BsFillXSquareFill className={"CancelNewCharacter"} title={"Cancel"} onClick={clearAndClose}/>
            </div>

        </div>
    );
}

export default AddNew;