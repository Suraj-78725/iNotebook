import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // Dynamically set the API base URL based on the environment
  const host = process.env.NODE_ENV === 'production'
    ? 'https://inotebook-production-119d.up.railway.app/api' // Replace with your Railway backend URL
    : 'http://localhost:5000'; // Use localhost for development
  
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Add a note
  const addNote = async (title, description, tag) => {
    console.log("Adding a new note");
    // API Call
    const response = await fetch(`${host}/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Get all notes
  const getNote = async () => {
    // API Call
    const response = await fetch(`${host}/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API Call
    await fetch(`${host}/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    // Update state after deletion
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    await fetch(`${host}/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // Logic to update the note in state
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
