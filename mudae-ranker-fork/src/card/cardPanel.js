import React, {useState} from 'react';
import {BsPlusSquareFill} from 'react-icons/bs';
import './cardPanel.scss';
import AddNew from './addNew';
import Card from './card';
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

function CardPanel({characterList, updateCharacterList, toggleSort, isSorting}) {
    const [showAddNew, toggleAddNew] = useState(false);
    const [showCardDetails, toggleCardDetails] = useState(false);
    const [selectedCharacter, selectCharacter] = useState(-1);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    // const [activeId, setActiveId] = useState(null);

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
        characterList[index].skip = skip;
        updateCharacterList(characterList);
    }

    function outsideClick(event, closeFunction) {
        if (event.target.className === "popup-box") {
            closeFunction()
        }
    }

    function updateImage(imageUrl, index) {
        characterList[index].pictureUrl = imageUrl;
        updateCharacterList(characterList)
    }

    function closeSort() {
        toggleSort(false);
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
                        <SortPanel characterList={characterList} closeSort={closeSort}
                        />
                    </div>
            }

            <DndContext sensors={sensors}
                        collisionDetection={closestCenter}
                        // onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        // onDragCancel={handleDragCancel}
                >
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

    // function handleDragStart(event) {
    //     setActiveId(event.active.data.current.sortable.index);
    // }

    function handleDragEnd(event) {
        const {active, over} = event;

        if (active.id !== over.id) {
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

            updateCharacterList((items) => {
                return arrayMove(items, oldIndex, newIndex);
            });
        }
        // setActiveId(null);
    }

    // function handleDragCancel() {
    //     setActiveId(null);
    // }
}

export default CardPanel;