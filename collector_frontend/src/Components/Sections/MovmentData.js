import {
  React,
  useRef,
  useState
} from 'react';

function MovmentData(props) {
   let currentAction=props.currentMovment // current selected action name

   let actionList=props.movmentsList    // array of all the actions

    actionList.forEach(element => {
    if(element.action === currentAction){
        currentAction=element
    }
   }); // find action object with the current action name

   let str = currentAction.video; // current video path

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

   const handleVideoClick = () => {
    const videoElement = videoRef.current;
    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  return (
        <>
        <div className="col-lg-7 col-sm-12 ">
          <div className="embed-responsive embed-responsive-4by3 " style={{ borderRadius: '25px', overflow: 'hidden'}}> 
          <video src={str} className="embed-responsive-item  " type="video/mp4" ref={videoRef}  onClick={handleVideoClick} autoPlay={true} controls muted loop> Your browser does not support HTML5 video. </video> 
          </div>
        </div>
        </>
  )
}

export default MovmentData