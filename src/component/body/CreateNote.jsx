import React, {useState} from "react";
import "./CreateNote.css";
import Fab from '@mui/icons-material/Add';
import ListNote from "./ListNote";
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';

const CreateNote = () => {
  const [takeNote, setTakeNote]=useState({
    title:'',
    note:''
  });

  const {title,note}=takeNote;

   const [storeNote, setStoreNote] = useState([])
   const [isZoom, setZoom] = useState({
     ZoomBool:false,
     texRow:0
   });
 

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

    setZoom({
      ZoomBool:false,
      texRow:0
    });
  }

  const deleteItem = (idDelete)=>{
        
    setStoreNote((prev) => prev.filter((_, index) => index !== idDelete));
    
  }
  const handleZoom = ()=>{
    setZoom({
      ZoomBool:true,
      texRow:5
    });
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
        onClick={handleZoom}
      />
      <Zoom  in={isZoom.ZoomBool}>
        <div>
      <textarea
        onChange={handleChange}
        name="note"
        placeholder="Take a note..."
        className="note-body"
        rows={isZoom.texRow}
        value={takeNote.note}
      ></textarea>
      <Fab className="add-note-button" 
        onClick={  title && note && submitChange}>
          <AddIcon />
        </Fab>
        </div>
      </Zoom>
      
    </div>

    <ListNote  list={storeNote}
              onChecked={deleteItem}  
            />

    </>
  );
};

export default CreateNote;
