import React from 'react';
import './characterCard.scss';
import {FaRegTrashAlt} from 'react-icons/fa';
import {GrClose} from 'react-icons/gr';


function CharacterCard({card}) {
    const {name, series, pictureUrl, skip} = card;
    // const [skip, setSkip] = useState(false);

    console.log(card);
    return (
        <div className={"CharacterCard"}>
            <div className={"CardHeader"}>
                <div className={"Name"}>{name}</div>
                <div className={"Close"} title={"Close Card"}>
                    <GrClose />
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
                <div className={"Delete"} title={"Delete Character"}>
                    <FaRegTrashAlt />
                </div>
            </div>
        </div>
    );
}

export default CharacterCard;
