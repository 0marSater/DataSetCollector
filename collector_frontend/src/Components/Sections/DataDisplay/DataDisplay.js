import React from 'react';
import './DataDisplay.css'
import Fade from 'react-reveal/Fade';

export default function DataDisplay(props) {

    let currentAction=props.currentMovment // current selected action name

    let actionList=props.movmentsList    // array of all the actions

    actionList.forEach(element => {
    if(element.action === currentAction){
        currentAction=element
    }
   }); // find action object with the current action name
   
  return (
    <Fade right>
    <div className="pb-4">
          <p className="actionattributes mt-4 ">Action Name: <span className='text-muted'>{currentAction.action}</span></p>
          <p className="mb-0 actionattributes ">Context: <span className='text-muted'>{currentAction.context} </span></p>
          <p className="mb-0 actionattributes">Meaning:  <span className='text-muted'>{currentAction.meaning} </span></p>
        </div>
    </Fade>
  )
}
// col-lg-4 d-flex flex-column justify-content-center