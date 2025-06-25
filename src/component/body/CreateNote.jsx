import React from "react";
import "./CreateNote.css";

const CreateNote = () => {
  return (
    <div className="create-note">
      <input
        type="text"
        placeholder="Title"
        className="note-title"
      />
      <textarea
        placeholder="Take a note..."
        className="note-body"
        rows={4}
      ></textarea>
      <button className="add-note-button">Add</button>
    </div>
  );
};

export default CreateNote;
