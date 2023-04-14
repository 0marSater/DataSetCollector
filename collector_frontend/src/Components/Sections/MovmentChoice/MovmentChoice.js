import './MovmentChoice.css';

import React, {
  useEffect,
  useState,
  useRef,
} from 'react';

import Fade from 'react-reveal/Fade';
import { useNotify } from 'tailwind-notifications-react';
import Typewriter from 'typewriter-effect';


import Options from '../../Options';
import DataDisplay from '../DataDisplay/DataDisplay';
import MovmentData from '../MovmentData';

export default function MovmentChoice() {

  const notify = useNotify();
  const [movments, setMovments] = useState("") //state for available movemnets
  const [formData, setFormData] = useState({
    action: null,
    video: null,
    id: null,
  }) //state for the form data
  const [options, setOptions] = useState("") //state for the dropdown list
  const [uploadMsg, setUploadMsg] = useState("")
  const [submitButDisable, setSubmitButDisable] = useState(false)

  const SubmitInputRef = useRef(null)


  // function to handle the state changes
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'video' ? files[0] : value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault()

    if (formData.action == null || formData.video == null) {
      notify({
        title: "Something went wrong",
        message: "Please make sure that you selected both an action from the Action List and a video.",
        type: "error",
        duration: 15000
      });
    } else {

      let actionId
      movments.forEach(element => {
        if (element.action === formData.action) {
          actionId = element.id
        }
      });

      const formData2 = new FormData();
      formData2.append('video', formData.video);
      formData2.append('action', formData.action);
      formData2.append('id', actionId);

      setUploadMsg("Please Hold On while Uploading The Video")
      setSubmitButDisable(true)
      const response = await fetch('http://127.0.0.1:5000//upload-data', {
        method: "POST",
        body: formData2
      })
      setSubmitButDisable(false)
      setUploadMsg("")
      setFormData({
        ...formData,
        video: null,
      })
      SubmitInputRef.current.value = ""
      if (!response.ok) {
        notify({
          title: "Error On submiting the video.",
          message: "Please make sure that the video is less than 100 MB size.",
          type: "error",
          duration: 15000
        });
      } else {
        notify({
          title: "Thanks for your contribution.",
          message: "Your video is sent successfully.",
          type: "success",
          duration: 15000
        });

      }

    }
  }

  // on page load send movments get request
  useEffect(() =>

    async function fetchData() {
      fetch('http://127.0.0.1:5000//display-data')
        .then(response => response.json())
        .then(res => {
          setMovments(res.Data.response_data)
          const movmentsArr = res.Data.response_data
          setFormData({
            action: movmentsArr[0].action,
          })
          setOptions(movmentsArr.map((item) => (

            <Options value={item.action} key={item.id} />
          )))
        })
    }

    , []);


  return (
    <div>
      <div className='MovmentChoiceFirstSection'>
        <div className='MovmentChoiceFirstSectionInner p-lg-5 px-sm-2 pt-4 m-0 row'>
          {formData.action && <MovmentData currentMovment={formData.action} movmentsList={movments} />}
          <div className="col-lg-4 m-auto  ">
            <h4 className="header MainHeaderText mr-lg-5 my-3">Preview Our List Of Actions</h4>
            <h2 className="mb-3 mt-2 actionheader text-center text-sm-left mr-md-5"> We encourage you to view the list of actions before submitting your videos<br /></h2>
            <div className="form-group">
              <select className="form-select form-control shadow col-md-11 col-sm-12" aria-label="Default select example" onChange={handleChange} value={formData.action} name="action">
                <option key="placeholder" value="">Select Action</option>,
                {options}
              </select>
            </div>
            {formData.action && <DataDisplay currentMovment={formData.action} movmentsList={movments} />}
          </div>
        </div>
        <div>
        </div>
      </div>
      <div className='my-2'></div>
      <Fade up>
        <div className='text-center' id='VideoUploadSection'>
          <div className=' p-lg-5 px-sm-2 pt-4 m-0 row'>
            <div className="col-lg-6 m-auto  ">
              <h4 className="header  mr-lg-5 my-3 mb-0">Ready To Make The Future?</h4>
              <h2 className="mb-3 mt-0 actionheader text-center mr-md-5"> Please Send us a video of yours<br /></h2>
              <p className='text-muted mb-4'>Note: Please Upload A Video Of Yours Performing The Current movement <b> {formData.action}</b> With 5 Seconds Long Max.</p>
              <input type="file" className="form-control shadow" name="video" ref={SubmitInputRef} onChange={handleChange} enctype="multipart/form-data" />
              <button type="submit" className="btn mt-4 buttoncolors btn-lg radius p-2 shadow" disabled={submitButDisable}  onClick={handleSubmit}>Submit Your Video</button>
              {uploadMsg &&
                <div className='row mx-auto mt-2 text-muted justify-center'>
                  <p >{uploadMsg}</p>
                  <Typewriter 
                    options={{
                      strings: ['...'],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </div>
              }

            </div>
          </div>
          <div>
          </div>
        </div>
      </Fade>
    </div>



  )
}

