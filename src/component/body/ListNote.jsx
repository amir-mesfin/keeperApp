import React from "react";
import "./ListNote.css";

const ListNote = ({list,onChecked}) => {
  
  return (
    <div className="note-list">
      {list.map((not, index) => (
        <div className="note-card" key={index}>
          <h3 className="note-title">{not.title}</h3>
          <p className="note-body">{not.note}</p>
          <button 
          key={index}
          className="delete-button" 
          onClick={() => onChecked(index)}
          >Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ListNote;
