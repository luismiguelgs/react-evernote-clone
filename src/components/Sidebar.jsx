import { List, Button, Divider,TextField } from '@mui/material';
import React, { useState } from 'react';
import './Sidebar.css';
import SidebarItem from './SidebarItem';


export default function Sidebar({notes, selectedNoteIndex, selectNote, newNote, deleteNote}) {
  const[addingNote, setAddingNote] = useState(false);
  const[title, setTitle] = useState('')

  const newNoteBtnClick = ()=>{
    setAddingNote(!addingNote);
    setTitle('');
  }
  const handleNewNote = (title)=>{
    newNote(title);
    setAddingNote(!addingNote);
  }
  return (
    <div className='sidebarContainer'>
      <Button 
        sx={{borderRadius:0}} 
        color='primary' 
        variant='contained' 
        fullWidth
        onClick={newNoteBtnClick}>
          { addingNote? 'Cancel' : 'New Note'}
      </Button>
      {
        addingNote ? 
        <div>
          <TextField
            sx={{mt:1,mb:1}}
            label="Enter note Title"
            variant="standard"
            color="primary"
            onChange={(e)=>setTitle(e.target.value)}
            focused
            fullWidth
          />
          <Button 
            sx={{borderRadius:0}} 
            color='success' 
            variant='contained' 
            fullWidth
            onClick={()=> handleNewNote(title)}>
              Submit Note
      </Button>
        </div> :
        null
      }
      <List>
        {
          notes && notes.map((note,index)=>{
            return(
              <div key={index}>
                <SidebarItem 
                  note={note} 
                  index={index} 
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={selectNote}
                  deleteNote={deleteNote}
                />
                <Divider />
              </div>
            )
          })
        }
      </List>
      
    </div>
  )
}
