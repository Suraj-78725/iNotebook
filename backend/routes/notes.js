const express=require('express');
const router=express.Router();
const fetchuser= require('../middleware/fetchuser');
const Note= require('../models/Note');
const { body, validationResult } = require('express-validator');
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// Route 1:  get all notes
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try
    {
    const notes= await Note.find({user: req.user.id});
    res.json(notes);
    }catch (error) { 
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});

// Route 2:  add  notes  sing Post login required

router.post('/addnote',fetchuser,[
    body('title',"Enter Valid name").isLength({min:3}),
    body('description',"Enter valid password").isLength({min:5}),
],async(req,res)=>{
    try{
    const{title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const note= await new Note({
    title,description,tag,user: req.user.id});
    const savedNotes=await note.save()
    res.json(savedNotes);
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// Route 3:  update an exising notes  notes 

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;
    // crete new project
    try{
    const newNote = {};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    // find note  to be upadted
    let note=await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json({note});
   }catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
 }

})


// Route 4:  deleting an exising notes

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    // const {title,description,tag}=req.body;
    try{
    let note=await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Sucess":"notes has been deleted",note:note});
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports= router