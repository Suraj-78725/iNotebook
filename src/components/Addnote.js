// import React, { useState } from 'react'
import React, { useContext ,useState} from 'react'
import noteContext from '../context/notes/noteContext';
const Addnote=(props)=> {
const context = useContext(noteContext);
const {addNote}=context;
const[note,setNote]=useState({title:"",description:"",tag:""})
const handleclick=(e)=>
    {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("Added Successfully","success");
    }
const onchange=(e)=>
    {
    setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <div className="container my-3" >
      <h1> Add Notes</h1>
      <form className='my-3'>
     <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onchange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <textarea type="textarea" className="form-control" id="description" name="description" value={note.description} onChange={onchange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="number" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} minLength={5} required/>
  </div>
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
</form>
</div>
    </div>
  )
}

export default Addnote;