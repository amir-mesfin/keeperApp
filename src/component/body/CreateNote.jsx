import React, {useState} from "react";
import "./CreateNote.css";
import ListNote from "./ListNote";

const CreateNote = () => {
  const [takeNote, setTakeNote]=useState({
    title:'',
    note:''
  });

  const {title,note}=takeNote;

 const [storeNote, setStoreNote] = useState([])
 

  const handleChange = (e) =>{
    const {name,value}= e.target;
    setTakeNote( 
       (prev)=>({
         ...prev,
         [name]:value
       })
    )
  }
  const submitChange = ()=>{
    setStoreNote(
       (prev)=> {
         return [...prev,takeNote]
       }
    )
    setTakeNote({
      title:'',
      note:''
    });
  }

  const deleteItem = (idDelete)=>{
        
    setStoreNote((prev) => prev.filter((_, index) => index !== idDelete));
    
  }

  return (
    <>
    <div className="create-note">
      <input
       onChange={handleChange}
        name="title"
        type="text"
        placeholder="Title"
        className="note-title"
        value={takeNote.title}
      />
      <textarea
        onChange={handleChange}
        name="note"
        placeholder="Take a note..."
        className="note-body"
        rows={7}
        value={takeNote.note}
      ></textarea>
      <button className="add-note-button" 
        onClick={  title && note && submitChange}>Add</button>
    </div>

    <ListNote  list={storeNote}
              onChecked={deleteItem}  
            />

    </>
  );
};

export default CreateNote;
