import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Contacts from './Contacts'
import AddContact from './AddContact';

const App = () => {

  const [contacts, setContacts] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [opacity, setOpacity] = useState(false)

  const [reload, setReload] = useState(false)

  const [id, setId] = useState("")

  const URL = "http://localhost:2000";

    useEffect(()=>{
        const fetchData = async()=>{
            const api = await axios.get(`${URL}/`,{
                headers:{
                    "Content-Type":"application/json"
                },
            })
            console.log(api.data.contact)
            setContacts(api.data.contact)
            console.log(contacts)
        }
        fetchData()
    },[reload])

    const handelModal =()=> {
      setShowModal(!showModal);
      setOpacity(!opacity);
    }
  return (
    
    <>
      <AddContact 
      handelModal={handelModal} showModal={showModal} URL={URL} reload={reload} setReload={setReload} id={id} setId={setId} contacts={contacts}/>

      <Contacts
      contacts={contacts} opacity={opacity} URL={URL} reload={reload} setReload={setReload} id={id} setId={setId} handelModal={handelModal}/>
    </>
  )
}

export default App