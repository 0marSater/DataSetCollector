import React from 'react';

import video from '../../Assets/Vedios/countdown-2637.mp4';

function Introduction() {
  return (<div className="container py-3 bg-light shadow" style={{borderRadius: "20px"}} >
  <div className="row ">
    <div className=" col-lg-6 p-3 d-flex flex-column justify-content-center">
      <h4 className="display-6 font26 mb-4">Non verbal actions contribution survey</h4>
      <p className="mb-0 font20 textHeight">Help us improve our nonverbal actions machine learning model by providing <b>a 10 seconds duration videos</b> that demonstrate different nonverbal actions that you can choose from. Your contributions can make a difference in building a more empathetic and understanding world. We take your privacy seriously and assure you that your personal information and videos will not be even stored .<b>Be assured assured that all contributors will remain anonymous to protect your privacy</b>. Join us in building a better world through nonverbal communication.</p>
    </div>
    <div className="col-lg-6 p-3 d-flex flex-column justify-content-center">
      <div className="embed-responsive embed-responsive-16by9 "> <video src={video} className="embed-responsive-item" type="video/mp4" controls="controls"> Your browser does not support HTML5 video. </video> </div>
    </div>
  </div>
</div>
)
}

export default Introduction
