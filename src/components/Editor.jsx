import React, { useEffect, useState } from 'react'
import './Editor.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextField } from '@mui/material';

export default function Editor({selectedNote, selectedNoteIndex, notes, updateNote}) {
  const [text, setText] = useState();
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  
  useEffect(()=>{
    if(selectedNote) {
      setText(selectedNote.body);
      setTitle(selectedNote.title);
      setId(selectedNote.id);
    }
  },[selectedNote])

  
  const updateBody = (value) =>{
    setText(value)
  }
  const update = (id, title, text)=>{
    if(selectedNote) updateNote(id, {title:title,body:text})
  }
  

  useEffect(()=>{
    const interval = setInterval(()=>{
      update(id,title,text)
    },10000);
    return ()=> clearInterval(interval);
  },[id,title, text]);
  
  return (
    <div className='editorContainer' style={{height:'100vh'}}>
      <BorderColorIcon />
      <TextField
            sx={{mt:1,mb:1}}
            value={title}
            variant="standard"
            color="primary"
            onChange={(e)=>setTitle(e.target.value)}
            focused
          />
      <ReactQuill value={text} onChange={updateBody}></ReactQuill>
    </div>
      
    
  )
}
