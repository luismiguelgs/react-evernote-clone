import { useState, useEffect } from 'react';
import './App.css';
import { firestore } from './utils/firebase';
import { collection, doc, getDocs, onSnapshot, updateDoc, serverTimestamp, addDoc, deleteDoc } from 'firebase/firestore'
import Sidebar from './components/Sidebar';
import Editor from './components/Editor'

function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);

  const db = collection(firestore, 'notes');

  useEffect(()=>{
    onSnapshot(db, (data)=>{
      setNotes(data.docs.map((item)=>{
        return { ...item.data(), id:item.id}
      }));
    });
  },[]);

  const selectNote = (note, index) => {
    console.log(note,index);
    setSelectedNoteIndex(index);
    setSelectedNote(note);
  }
  const deleteNote = async(id) =>{
    try{
      await deleteDoc(doc(firestore,'notes',id));
    }
    catch(err){
      console.log(err.message);
    }
  }
  const newNote = async(title) =>{
    const data = {
      title: title,
      body: '',
      timestamp: serverTimestamp()
    }
    let docRef = null;
    try{
      docRef = await addDoc(db, data)
    }catch(err){
      console.log(err.message);
    }
    const newId = docRef.id;
    selectNote({...data, id:newId},newId);
    //const newNoteIndex = notes.indexOf(notes.filter(_note=> _note.id === newId)[0]);
    //console.log(newNoteIndex);
    //setSelectedNote(notes[newNoteIndex]);
    //setSelectedNoteIndex(newNoteIndex);
  }
  
  const updateNote = (id,noteObj)=>{
    let dataToUpdate = doc(firestore, 'notes', id);
    updateDoc(dataToUpdate,{
      title: noteObj.title,
      body: noteObj.body,
      timestamp: serverTimestamp()
    }).then(()=>{console.log('update');}).catch((err)=>console.log(err.message));
  }

  return (
    <div className="App">
     <Sidebar 
        deleteNote={deleteNote}
        selectNote={selectNote}
        newNote={newNote}
        selectedNoteIndex={selectedNoteIndex} 
        notes={notes}>
     </Sidebar>
     <Editor 
        selectedNote={selectedNote} 
        updateNote={updateNote}
        selectedNoteIndex={selectedNoteIndex} 
        notes={notes}>
     </Editor>
    </div>
  );
}

export default App;
