import {
  React,
  useRef,
  useState,
} from 'react';

import Fade from 'react-reveal/Fade';

function Introduction() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    const videoElement = videoRef.current;
    if (videoElement.muted) {
    videoElement.muted = false;
    }
    else if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="container ">
      <div className="row mx-auto mb-4">
        <div className=" col-lg-5 p-3 d-flex  flex-column justify-content-center align-center">
          <div className='mr-lg-5 pr-lg-5 '>
            <Fade left>
              <h4 className="display-6 header MainHeaderText mr-lg-3">HELP US </h4>
              <h4 className="display-6 header MainHeaderText  mr-lg-3">TO UNLOCK</h4>
              <h4 className="display-6 header MainHeaderText mb-2 mr-lg-3">THE FUTURE OF AI</h4>
              <p className="mb-0 subheader text-muted mr-lg-3">Help Us With Growing Our Database To Create Body Language AI Detector</p>
              <div class="col-sm-12 col-md-6">
              <button className="btn mt-4 buttoncolors py-3 px-5 shadow radius "><b>Get Started Now</b></button>
              </div>
            </Fade>
          </div>
        </div>
        <div className="col-lg-7 p-3 d-flex flex-column justify-content-center">

          <Fade right>
            <div className="embed-responsive embed-responsive-16by9 shadow" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <video src={process.env.PUBLIC_URL + '/Introduction.mp4'} ref={videoRef} className="embed-responsive-item" type="video/mp4" onClick={handleVideoClick} autoPlay loop muted > Your browser does not support HTML5 video. </video>
            </div>
          </Fade>

        </div>
      </div>
      <div className='row'>
      <h4 className=' my-3 mb-5 text-muted mx-auto subheader'></h4>
        </div>
    </div>
  )
}

export default Introduction


// Help us improve our nonverbal actions machine learning model by providing <b>a 10 seconds duration videos</b> that demonstrate different nonverbal actions that you can choose from. Your contributions can make a difference in building a more empathetic and understanding world. We take your privacy seriously and assure you that your personal information and videos will not be even stored .<b>Be assured assured that all contributors will remain anonymous to protect your privacy</b>. Join us in building a better world through nonverbal communication.