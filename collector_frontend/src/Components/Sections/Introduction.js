import {
  React,
  useRef,
  useState,
} from 'react';

import Fade from 'react-reveal/Fade';
import ImageSrc from './favicon.ico';

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
                <a href='#VideoUploadSection' className="btn mt-4 buttoncolors py-3 px-5 shadow radius "><b>Get Started Now</b></a>
              </div>
            </Fade>
          </div>
        </div>
        <div className="col-lg-7 p-3 d-flex flex-column justify-content-center">

          <Fade right>
              <div className="image-container">
                <img src={ImageSrc} alt="Main Image" />
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


