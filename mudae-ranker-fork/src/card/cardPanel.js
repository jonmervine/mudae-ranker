import React, {useState} from 'react';
import {BsPlusSquareFill} from 'react-icons/bs';
// import './cardPanel.scss';
import AddNew from './addNew';
import {Card} from './card';
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
import {Photo} from "./photo";

function CardPanel({characterList, updateCharacterList}) {
    // const [showAddNew, toggleAddNew] = useState(false);
    // const [showCardDetails, toggleCardDetails] = useState(false);
    // const [selectedCharacter, selectCharacter] = useState(-1);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const [activeId, setActiveId] = useState(null);
    const [items, setItems] = useState(
       [
           "https://media.discordapp.net/attachments/472313197836107780/553762506217226250/SNVvtNb.png",
           "https://imgur.com/Vk3jbUB.png",
           "https://media.discordapp.net/attachments/472313197836107780/723706845981573180/7WfEVKD.png",
           "https://imgur.com/JUeRmTD.png"
       ]
    );

    const toggleAddCharacter = () => {
        // toggleAddNew(!showAddNew);
    }

    const addNewCharacter = (character) => {
        // const {name, series, pictureUrl} = character;
        // let newCharacter = {
        //     key: uuidv4(),
        //     name: name,
        //     series: series,
        //     pictureUrl: pictureUrl,
        //     skip: false
        // };
        // characterList.push(newCharacter)
        // updateCharacterList(characterList)
    }

    function openDetails(index) {
    //     toggleCardDetails(true)
    //     selectCharacter(index)
    }
    //
    function closeDetails() {
    //     toggleCardDetails(false)
    //     selectCharacter(-1)
    }

    function deleteCharacter(index) {
    //     characterList.splice(index, 1)
    //     updateCharacterList(characterList)
    //     closeDetails()
    }

    return (
        <div>
            {/*<BsPlusSquareFill className={"AddNew"} onClick={toggleAddCharacter}/>*/}
            {/*{showAddNew &&*/}
            {/*// <div className={"popup-box"}>*/}
            {/*//     <AddNew*/}
            {/*//         handleClose={toggleAddCharacter}*/}
            {/*//         newCard={addNewCharacter}*/}
            {/*//     />*/}
            {/*// </div>}*/}
            {/*{showCardDetails && selectedCharacter > -1 && selectedCharacter < characterList.length &&*/}
            {/*<div className={"popup-box"}>*/}
            {/*    <Character*/}
            {/*        character={characterList[selectedCharacter]}*/}
            {/*        index={selectedCharacter}*/}
            {/*        handleClose={closeDetails}*/}
            {/*        handleRemoval={deleteCharacter}*/}
            {/*    />*/}
            {/*</div>}*/}
            <DndContext sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragCancel={handleDragCancel}>
                <SortableContext items={items} strategy={rectSortingStrategy}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(10, 1fr)`,
                        gridGap: 10,
                        padding: 10,
                    }}>
                        {items.map((url, index) => (
                            <Card key={url} character={url} index={index} />
                        ))}
                        {/*{items.map(*/}
                        {/*    (url, index) => <Card url={url} index={index}*/}
                        {/*                                //openDetails={openDetails}*/}
                        {/*    key={url} />*/}
                        {/*)}*/}
                    </div>
                </SortableContext>
                <DragOverlay adjustScale={true}>
                    {activeId ? (
                        console.log("activity id: " + JSON.stringify(activeId)) &&
                        <Photo character={activeId} index={items.indexOf(activeId)} />
                        // <Card character={activeId} index={characterList.indexOf(activeId)} />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragEnd(event) {
        const {active, over} = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    }

    function handleDragCancel() {
        setActiveId(null);
    }
};

export default CardPanel;