import React from 'react';
import './card.scss';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

function Card({character, index, openDetails}) {
    const {name, pictureUrl, skip} = character;
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
        //I can't seem to figure out how to make this on single click without interfering with the dragndrop
        openDetails(index);
    }

    const inlineStyles = {
        backgroundColor: skip?'lightcoral':'white',
        ...style,
    };

    return (
        <div className={"CharacterThumbnail"} ref={setNodeRef} style={inlineStyles} {...attributes} {...listeners}
             onDoubleClick={selectCharacter}>
            <img className={"Picture"} alt={name} src={pictureUrl} draggable={false}/>
        </div>
    );
}

export default Card;
