import React, {useState} from 'react';
import {BsPlusSquareFill} from 'react-icons/bs';
import './cardPanel.scss';
import AddNew from './addNew';
import SortableCard from './sortableCard';
import Character from './character';
import SortPanel from '../sort/sortPanel'
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

import {DraggableCard} from "./draggableCard";

function CardPanel({characterList, updateCharacterList, toggleSort, isSorting, idToChar}) {
    const [showAddNew, toggleAddNew] = useState(false);
    const [showCardDetails, toggleCardDetails] = useState(false);
    const [selectedCharacter, selectCharacter] = useState(-1);
    const sensors = useSensors(useSensor(MouseSensor, {activationConstraint: {distance: 5}}), useSensor(TouchSensor));
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
            skip: false,
            elo: 1600
        };

        let copyCharacters = characterList.slice(0);
        copyCharacters.push(newCharacter);
        updateCharacterList(copyCharacters);
    }

    function openDetails(index) {
        toggleCardDetails(true);
        selectCharacter(index);
    }

    function closeDetails() {
        toggleCardDetails(false);
        selectCharacter(null);
    }

    function deleteCharacter(index) {
        characterList.splice(index, 1);
        updateCharacterList(characterList);
        closeDetails();
    }

    function toggleSkip(skip, index) {
        characterList[index].skip = skip;
        updateCharacterList(characterList);
    }

    function outsideClick(event, closeFunction) {
        if (event.target.className === "popup-box") {
            closeFunction();
        }
    }

    function updateImage(imageUrl, index) {
        characterList[index].pictureUrl = imageUrl;
        updateCharacterList(characterList);
    }

    function closeSort() {
        toggleSort(false);
        reorderCharacters(characterList);
    }

    function reorderCharacters() {
        console.log("before reorder: " + JSON.stringify(easierRead()));
        updateCharacterList(characterList.sort((a, b) => b.elo - a.elo));
        console.log("after reorder: " + JSON.stringify(easierRead()));
    }

    return (
        <div>
            <BsPlusSquareFill className={"AddNew"} onClick={toggleAddCharacter}/>
            {showAddNew &&
             <div className={"popup-box"} onClick={(event) => {outsideClick(event, toggleAddCharacter)}}>
                 <AddNew
                     handleClose={toggleAddCharacter}
                     newCard={addNewCharacter}
                 />
             </div>}

            {showCardDetails && //selectedCharacter > -1 && activeId == null && selectedCharacter < characterList.length &&
            <div className={"popup-box"} onClick={(event) => {outsideClick(event, closeDetails)}}>
                <Character
                    character={characterList[selectedCharacter]}
                    index={selectedCharacter}
                    handleClose={closeDetails}
                    handleRemoval={deleteCharacter}
                    toggleSkip={toggleSkip}
                    updateUrl={updateImage}
                />
            </div>}

            {
                isSorting &&
                    <div className={"popup-box"} onClick={(event) =>{outsideClick(event, closeSort)}}>
                        <SortPanel characterList={characterList} closeSort={closeSort} updateCharacters={updateCharacterList}
                        />
                    </div>
            }

            <DndContext sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragCancel={handleDragCancel}
                        useDragOverlay={false}
            >
                <SortableContext useDragOverlay={false} items={characterList} strategy={rectSortingStrategy}>
                    <div className={"CardPanel"}>
                        {characterList.map((character, index) => (
                            <SortableCard useDragOverlay={false} key={character.id} character={character} index={index} openDetails={openDetails}/>
                        ))}
                    </div>
                </SortableContext>

                {/*  a <DragOverlay> component can be used to control animations about the overlay, this would fix
            the overlapping vs underlapping of some components but it's been pretty finicky to work with */ }
            <DragOverlay dropAnimation={null} useDragOverlay={false} >
                {activeId ? (
                 <DraggableCard useDragOverlay={false} id={activeId} name={idToChar[activeId].name} pictureUrl={idToChar[activeId].pictureUrl} skip={idToChar[activeId].skip}/>
                ) : null}
            </DragOverlay>


            </DndContext>

        </div>
    );

    function handleDragStart(event) {
        const {active} = event;

        setActiveId(active.id);
    }

    function easierRead() {
        const stuff = [];
        for (const character of characterList) {
            stuff.push(character.name);
        }
        return stuff;
    }

    function handleDragEnd(event) {
        const {active, over} = event;

        if (active.id !== over.id) {
            console.log("before drag: " + JSON.stringify(easierRead()));
            const oldIndex = active.data.current.sortable.index;
            const newIndex = over.data.current.sortable.index;

            let newElo = characterList[oldIndex].elo;
            if (characterList.length > 1) {
                if (newIndex === 0) {
                    newElo = characterList[newIndex].elo + 1;
                } else if (newIndex === characterList.length - 1) {
                    newElo = characterList[newIndex].elo - 1;
                } else {
                    newElo = Math.round((characterList[newIndex - 1].elo + characterList[newIndex].elo) / 2);
                }
            }

            characterList[oldIndex].elo = newElo;

            let reorderedChars = arrayMove(characterList, oldIndex, newIndex);
            updateCharacterList(reorderedChars);
        }
        setActiveId(null);
    }

    function handleDragCancel() {
        setActiveId(null);
    }
}

export default CardPanel;