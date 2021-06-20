import React from 'react';
import './card.scss';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Photo} from './photo';

export const Card = (props) => {
    const sortable = useSortable({id: props.character});
    const {
        attributes,
        listeners,
        isDragging,
        setNodeRef,
        transform,
        transition,
    } = sortable;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    console.log("props is: " + JSON.stringify(props));
    return (
        <Photo
            ref={setNodeRef}
            style={style}
            {...props}
            {...attributes}
            {...listeners}
        />
    );
};


/*
function Card({character, index, openDetails}) {
    const {name, pictureUrl, skip} = character;
    const sortable = useSortable({id: character});
    const {
        attributes,
        listeners,
        isDragging,
        setNodeRef,
        transform,
        transition,
    } = sortable;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    function selectCharacter() {
        openDetails(index)
    }

    console.log(`has key of ${index} my character is ${name} with ${pictureUrl} and is skipped? ${skip}`)
    return (
            <div className={"CharacterThumbnail"} ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <img className={"Picture"} alt={name} src={pictureUrl}/>
            </div>
    );
}

export default Card;*/
