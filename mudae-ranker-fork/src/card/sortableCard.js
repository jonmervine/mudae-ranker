import React from 'react';
import './card.scss';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import {DraggableCard} from "./draggableCard";

function SortableCard({character, index, openDetails}) {
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
        openDetails(index);
    }

    const inlineStyles = {
        backgroundColor: skip ? 'crimson' : 'white',
        ...style,
    };

    return (
        <DraggableCard useDragOverlay={false} className={"CharacterThumbnail"} ref={setNodeRef}
                       style={inlineStyles} {...attributes} {...listeners}
                       onClick={selectCharacter} name={name} pictureUrl={pictureUrl} skip={skip}/>
        // <div className={"CharacterThumbnail"} ref={setNodeRef} style={inlineStyles} {...attributes} {...listeners}
        //      onDoubleClick={selectCharacter}>
        //     <img referrerPolicy="no-referrer" className={"Picture"} alt={name} src={pictureUrl} draggable={false}/>
        // </div>
    );
}

export default SortableCard;
