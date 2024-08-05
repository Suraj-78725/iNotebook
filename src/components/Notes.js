import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNote,editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    // console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token')){
    getNote();
    }else{
      navigate('/login');
    }
  }, []);

  const ref = useRef(null);
  const refclose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id ,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  
  };


  const handleclick = (e) => {
    refclose.current.click();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    // e.preventDefault();
      props.showAlert("Updated Successfully","success");
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showAlert={props.showAlert}/>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="container my-3">
                  <h1> Edit Notes</h1>
                  <form className="my-3">
                    <div className="mb-3">
                      <label htmlFor="etitle" className="form-label">
                        title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="etitle"
                        name="etitle"
                        aria-describedby="emailHelp" value={note.etitle}
                        onChange={onchange} minLength={5} required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="edescription" className="form-label">
                        Description
                      </label>
                      <input
                        type="textarea"
                        className="form-control"
                        id="edescription"
                        name="edescription" value={note.edescription}
                        onChange={onchange}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button  disabled={note.etitle.length<5 || note.edescription.length<5}  onClick={handleclick} type="button"  className="btn btn-primary">
                Update Notes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes && notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
