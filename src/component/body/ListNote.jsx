import React from "react";
import "./ListNote.css";

function ListNote(){
  // Dummy notes
  const notes = [
    { title: "Shopping List", body: "Buy milk, eggs, and bread." },
    { title: "Homework", body: "Finish the React project." },
    { title: "Meeting", body: "Team call at 3 PM on Zoom." }
  ];

  return (
    <div className="note-list">
      {notes.map((note, index) => (
        <div className="note-card" key={index}>
          <h3 className="note-title">{note.title}</h3>
          <p className="note-body">{note.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ListNote
