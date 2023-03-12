import React from 'react';
import video from '../../Assets/Vedios/arms 1.mp4'
function MovmentData(props) {
   let currentAction=props.currentMovment // current selected action name

   let actionList=props.movmentsList    // array of all the actions

   actionList.forEach(element => {
    if(element.action === currentAction){
        currentAction=element
    }
   }); // find action object with the current action name

   let str = currentAction.video;

   

  return (
        <>
        <div className="col-lg-6">
          <div className="embed-responsive embed-responsive-4by3"> 
          <video src={str} className="embed-responsive-item" type="video/mp4" controls="controls"> Your browser does not support HTML5 video. </video> 
          </div>
        </div>
        <div className="col-lg-6 d-flex flex-column justify-content-center">
          <h1 className="font26">{currentAction.action}</h1>
          <br/>
          <p className="mb-0 "><b>Context:</b> {currentAction.context}</p>
          <p className="mb-0"><b>Meaning:</b>  {currentAction.meaning}</p>
        </div>
        </>
  )
}

export default MovmentData