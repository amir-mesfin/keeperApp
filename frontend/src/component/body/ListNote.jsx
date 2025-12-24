import React from "react";
import "./ListNote.css";
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
const ListNote = ({list,onChecked}) => {
  
  return (
    <div className="note-list">
      {list.map((not, index) => (
        <div className="note-card" key={index}>
          <h3 className="note-title">{not.title}</h3>
          <p className="note-body">{not.note}</p>
          <Fab 
          key={index}
          className="delete-button" 
          onClick={() => onChecked(index)}
          >
           <DeleteIcon />
          </Fab>
        </div>
      ))}
    </div>
  );
};

export default ListNote;
