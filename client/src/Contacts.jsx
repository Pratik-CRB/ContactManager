import React, { useEffect } from 'react';
import axios from 'axios';

const Contacts = ({contacts, opacity, URL, reload, setReload, id, setId, handelModal}) => {

  const blur = opacity ? "0.2" : "1";

  const deleteContact = async(id)=> {
    const api = await axios.delete(`${URL}/${id}`,{
      headers:{
          "Content-Type":"application/json"
      },
  });
  console.log(api);
  setReload(!reload)
  }
  return (
   <>
   <div className='container my-5' style={{width:"600px" , opacity:`${blur}`}}>
        {contacts.map((data)=><div key={data._id} className='bg-black p-3 my-3' 
        style={{borderRadius: "10px", border: '2px solid yellow', display:"flex",
        justifyContent: "space-around", alignItems:"center"}}>
            
            <div>
            <h1><span className="material-symbols-outlined mx-3" >account_circle</span>{data.name}</h1>
            <h5><span className="material-symbols-outlined mx-3">mail</span>{data.gmail}</h5>
            <h5><span className="material-symbols-outlined mx-3">call</span>{data.number}</h5>
            </div> 
            <div style={{ display:"flex",justifyContent: "space-between", alignItems:"center", flexDirection: "column", gap:"10px"}}>
                <button className="btn btn-primary" onClick={()=> {setId(data._id); handelModal()}}>Edit</button>
                <button className="btn btn-danger" onClick={()=> deleteContact(data._id)}>Delete</button>
            </div>
        </div>)}
   </div>
   </>
  )
}

export default Contacts