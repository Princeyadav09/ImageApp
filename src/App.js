import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { AiOutlinePlus } from "react-icons/ai";

function App() {
  const [photo,setPhoto] = useState(null);
  const [name,setName] = useState(null);
  const [image,setImage] = useState([]);

  const onChange = (e)=>{
    e.preventDefault();
    const file = e.target.files[0];
    setPhoto(file);
  }
  

  const handleSubmit = async (e)=>{  
    if(photo){  
    const config = {headers:{"Content-Type":"multipart/form-data"}}
    const newForm = new FormData();
    newForm.append("photos",photo)
    newForm.append("name",name);
    axios.post("http://localhost:4000/api/upload",newForm,config,)
    .then((res)=>{
      setPhoto(null);
    })
    }
  }

  const allPhotos = async ()=>{
    const res = await axios.post("http://localhost:4000/api/allphotos") 
    setImage(res.data.img);
    console.log(res.data.img);
  }

  useEffect(()=>{
    handleSubmit();
    allPhotos();
  },[photo])


  return (
    <> 
    <center><h1 className='mt-10 text-3xl'>PHOTOS</h1><br /></center>
   <div className='grid grid-cols-4 m-10 gap-10'>
   
          {
          image.length  === 0 ? (null) : (
            image.map((item,index)=>(
              <div className='border-2 h-[200px] w-[200px] grid content-center border-gray-300 '>
               <img src={item.photos} key={index} alt="" />
              </div>
            ))
           )
          }
 
          <div className='border-2 h-[200px] w-[200px] grid content-center border-gray-300'>
              {/* <form action="" onSubmit={}> */}
              <label htmlFor="file-input" className=''>
                <AiOutlinePlus size={30} className='m-auto text-gray-400 cursor-pointer'/>
              <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=""
                    onChange={onChange}
                    className="sr-only"
                  />
              </label>
              {/* <button>Submit</button> */}
              {/* </form> */}
          </div>
   </div>
   </>
  );
}

export default App;
