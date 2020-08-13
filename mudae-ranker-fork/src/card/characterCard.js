import React from 'react';
import './characterCard.scss';

function CharacterCard({cardData}) {
    const {name, series, pictureUrl} = cardData;
    return (
        <div className={"CharacterCard"}>
            <div className={"CardHeader"}>
                <div className={"Name"}>{name}</div>
                <div className={"Close"} title={"Close Card"}>X</div>
            </div>
            <div className={"Series"}>{series}</div>
            <img className={"Picture"} alt={""} src={pictureUrl}/>
            <div className={"URL"}>
                <label>URL:</label>
                <input type={"text"} value={pictureUrl}/>
            </div>
            <div className={"CardFooter"}>
                <div className={"Skip"}>
                    <input type={"checkbox"}/>
                    <label>Skip?</label>
                </div>
                <div className={"Delete"} title={"Delete Character"}>D</div>
            </div>
        </div>
    );
}

export default CharacterCard;
