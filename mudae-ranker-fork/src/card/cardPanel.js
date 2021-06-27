import React, {useState} from 'react';
import {BsPlusSquareFill} from 'react-icons/bs';
import './cardPanel.scss';
import AddNew from './addNew';
import Card from './card';
import Character from './character';
import {v4 as uuidv4} from 'uuid';
import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
} from '@dnd-kit/sortable';

function CardPanel({characterList, updateCharacterList}) {
    const [showAddNew, toggleAddNew] = useState(false);
    const [showCardDetails, toggleCardDetails] = useState(false);
    const [selectedCharacter, selectCharacter] = useState(-1);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const [activeId, setActiveId] = useState(null);

    const toggleAddCharacter = () => {
        toggleAddNew(!showAddNew);
    }

    //New characters don't drag properly when just added. But after first drag then they work fine
    const addNewCharacter = (character) => {
        const {name, series, pictureUrl} = character;
        let newCharacter = {
            id: uuidv4(),
            name: name,
            series: series,
            pictureUrl: pictureUrl,
            skip: false
        };
        characterList.push(newCharacter)
        updateCharacterList(characterList)
    }

    function openDetails(index) {
        toggleCardDetails(true)
        selectCharacter(index)
    }

    function closeDetails() {
        toggleCardDetails(false)
        selectCharacter(null)
    }

    function deleteCharacter(index) {
        characterList.splice(index, 1)
        updateCharacterList(characterList)
        closeDetails()
    }

    function toggleSkip(skip, index) {
        // Skip i think needs some kind of redraw maybe? These changes aren't sticking?
        console.log("toggle skip to: " + skip + " is currently: " + characterList[index].skip);
        characterList[index].skip = skip;
        updateCharacterList(characterList);
    }

    return (
        <div>
            <BsPlusSquareFill className={"AddNew"} onClick={toggleAddCharacter}/>
            {showAddNew &&
             <div className={"popup-box"}>
                 <AddNew
                     handleClose={toggleAddCharacter}
                     newCard={addNewCharacter}
                 />
             </div>}
            {showCardDetails && selectedCharacter > -1 && activeId == null && selectedCharacter < characterList.length &&
            <div className={"popup-box"}>
                <Character
                    character={characterList[selectedCharacter]}
                    index={selectedCharacter}
                    handleClose={closeDetails}
                    handleRemoval={deleteCharacter}
                    toggleSkip={toggleSkip}
                />
            </div>}
            <DndContext sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragCancel={handleDragCancel}>
                <SortableContext items={characterList} strategy={rectSortingStrategy}>
                    <div className={"CardPanel"}>
                        {characterList.map((character, index) => (
                            <Card key={character.id} character={character} index={index} openDetails={openDetails}/>
                        ))}
                    </div>
                </SortableContext>

            {/*  a <DragOverlay> component can be used to control animations about the overlay, this would fix
            the overlapping vs underlapping of some components but it's been pretty finicky to work with
            <DragOverlay adjustScale={true}>
                {activeId ? (
                 <Photo url={activeId} index={items.indexOf(activeId)} />
                ) : null}
            </DragOverlay>
      */}

            </DndContext>

        </div>
    );

    function handleDragStart(event) {
        setActiveId(event.active.data.current.sortable.index);
    }

    function handleDragEnd(event) {
        const {active, over} = event;

        if (active.id !== over.id) {
            updateCharacterList((items) => {
                const oldIndex = active.data.current.sortable.index;
                const newIndex = over.data.current.sortable.index;

                return arrayMove(items, oldIndex, newIndex);
            });
        }
        setActiveId(null);
    }

    function handleDragCancel() {
        setActiveId(null);
    }
}

export default CardPanel;