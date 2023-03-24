import React, {
  useEffect,
  useState
} from 'react';

import { useNotify } from 'tailwind-notifications-react';

import Options from '../Options';
import MovmentData from './MovmentData';

export default function MovmentChoice() {

  const notify = useNotify();

  const [movments, setMovments] = useState("") //state for available movemnets

  const [formData, setFormData] = useState({
    action : null,
    video: null,
    id : null,
  }) //state for the form data

  const [error, setError] = useState("")

  const [options, setOptions] = useState("") //state for the dropdown list

  // function to handle the state changes
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'video' ? files[0] : value,
    }));
  };

  function handleSubmit(event){
    event.preventDefault()
    
    if(formData.action == null || formData.video == null){
      notify({
        title: "Something went wrong",
        message: "Please make sure that you selected both an action from the Action List and a video.",
        type: "error",
        duration: 7000
      });
    }else{
      
      let actionId 
      movments.forEach(element => {
        if(element.action === formData.action){
          actionId=  element.id
      }
      });

      const formData2 = new FormData();
      formData2.append('video', formData.video);
      formData2.append('action', formData.action);
      formData2.append('id', actionId);


      fetch('http://www.dataset-collector.online:5000//upload-data', {method: "POST",
     
      body:formData2})

      notify({
        title: "Thanks for your contribution.",
        message: "Your video is sent successfully.",
        type: "success",
        duration: 7000
      });
    }
  }

  // on page load send movments get request
  useEffect(() => 
    async function fetchData(){
      fetch('http://www.dataset-collector.online:5000//display-data')
      .then(response => response.json())
      .then(res => {
        setMovments(res.Data.response_data)
        const movmentsArr = res.Data.response_data
        setFormData({
          action : movmentsArr.action,
          video: movmentsArr.video,
          id: movmentsArr.id
        })
        setOptions(movmentsArr.map((item)=>(
          
          <Options value={item.action} key={item.id} />
        )))
      })
    }
    
  ,[]);

  return (
    <div className="container" >
      <div className="row pb-5">
        <div className="col-lg-4 offset-lg-4">
          <h2 className="mb-3 mt-4 font20">Actions list<br/></h2>
          <div className="form-group">
            <select className="form-select form-control shadow" aria-label="Default select example" onChange={handleChange} value={formData.action} name="action">
            <option key="placeholder" value="">Select Action</option>,
              {options}
            </select>

          </div>
        </div>
      </div>
      <div className="row bg-light py-5 shadow" style={{borderRadius: "20px"}}>
        { formData.action &&
        <MovmentData currentMovment={formData.action} movmentsList={movments}/>
        }
      </div>
      <div className="row py-5 justify-content-center">
        <div className="col-md-6 bg-light p-3 shadow" style={{borderRadius: "20px"}}>
          <h2 className="mb-3 font20">Contribute with us</h2>
          <form>
            <div className="form-group">
              <label className="form-label font18" htmlFor="formFile">Add your video here &nbsp;</label>
              <input type="file" className="form-control shadow" name="video" onChange={handleChange} enctype="multipart/form-data"/>
            </div>
            <button type="submit" className="btn mt-4 btn-block btn-outline-dark p-2 shadow" onClick={handleSubmit}><b>Send your video</b></button>
            {error && <p className="lead mt-1 text-danger">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
