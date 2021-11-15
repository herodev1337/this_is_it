import React from 'react';
import ReactTooltip from 'react-tooltip';

import { Trash, ArrowUp, ArrowDown } from 'react-bootstrap-icons';

import "styles/scss/quiz_editor.scss"

export default function EditButtons(props){
  return(
    <div>
      <span
        onClick={(e)=>props.moveItem(e, props.index, -1)}
        style={{cursor:'pointer'}}
      >
        <ArrowUp data-tip="move item up" data-for="edit-buttons"/>
      </span>
      <span
        onClick={(e)=>props.moveItem(e, props.index, 1)}
        style={{cursor:'pointer'}}
      >
        <ArrowDown data-tip="move item down" data-for="edit-buttons"/>
      </span>
      <span
        onClick={(e)=>props.trashItem(e, props.index)}
        style={{cursor:'pointer'}}
      >
        <Trash data-tip="delete item" data-for="edit-buttons"/>
      </span>
      <ReactTooltip id="edit-buttons" place="bottom" type="dark" effect="solid" delayShow={400}/>
    </div>
  )
}