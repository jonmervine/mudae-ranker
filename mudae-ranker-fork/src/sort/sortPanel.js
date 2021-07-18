import React, {useState} from 'react';
import './sortPanel.scss';
import {GrClose} from 'react-icons/gr';
import {EloRating} from "../EloRating";

function SortPanel({characterList, closeSort}) {

    function stopSorting() {
        closeSort()
    }

    return (
      <div className={"box"}>
          <div className={"Close"} title={"Close Card"}>
              <GrClose size={"1.5em"} onClick={stopSorting}/>
          </div>
      </div>
    );
}

export default SortPanel