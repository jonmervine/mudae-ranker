import React from 'react';
import './card.scss';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Photo} from './photo';

function Card({character, index, openDetails}) {
    const {key, name, pictureUrl, skip} = character;
    const sortable = useSortable({id: character.id});
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

    return (
        <Photo
            ref={setNodeRef}
            style={style}
            character={character}
            index={index}
            {...attributes}
            {...listeners}
        />
    );
    /*

    console.log(`has key of ${index} my character is ${name} with ${pictureUrl} and is skipped? ${skip}`)
    return (
            <div className={"CharacterThumbnail"} ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <img className={"Picture"} alt={name} src={pictureUrl}/>
            </div>
    );
    */
}

export default Card;
