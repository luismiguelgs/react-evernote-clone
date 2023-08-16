import React from 'react';
import { ListItem, ListItemButton, ListItemText,IconButton } from '@mui/material';
import './SidebarItem.css';
import DeleteIcon from '@mui/icons-material/Delete';
import {removeHTMLTags} from '../utils/helpers';

export default function SidebarItem({index, note, selectedNoteIndex, deleteNote, selectNote}) {
  const _selectNote = (note,index) =>{
    selectNote(note,index);
  }
  const _deleteNote = ()=>{
    if(window.confirm(`Are you sure you want to delete: ${note.title}`)){
      deleteNote(note.id);
    }
  }
  return (
    <div>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={()=>_deleteNote()}>
            <DeleteIcon />
          </IconButton>
        }
        disablePadding>
        <ListItemButton selected={selectedNoteIndex === index} onClick={()=>_selectNote(note,index)}>
          <ListItemText primary={note.title} secondary={`${removeHTMLTags(note.body.substring(0,30))}...`}/>
        </ListItemButton>
      </ListItem>
    </div>
  )
}
