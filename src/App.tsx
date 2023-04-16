import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import NotesContainer from './Components/NotesContainer';
import { Note, Notebook, Notebooks } from './Types';
import './styles.css';


function App() {

  const [notes, setNotesToWrap] = useState<Notebooks>();

  useEffect(() => 
    {
      const items = localStorage.getItem('notes');
      if (items) {
        setNotesToWrap(JSON.parse(items));
      }
    },
    [notes]
  )

  function setNotes(notes: Notebooks){
    setNotesToWrap(notes)
    localStorage.setItem('notes', JSON.stringify(notes));
  }


  function addNotes(){
    if (notes){
      const notesCopy = structuredClone(notes);
      notesCopy.push({ id: Date.now(), notes: [], title:"Title"})
      setNotes(notesCopy)
    }else{
      const notesCopy = [{ id: Date.now(), notes: [], title:"Title"}]
      setNotes(notesCopy)
    }
  }

  function removeNotes(id:number){
    const notesCopy = structuredClone(notes!);
    notesCopy.forEach((value: Notebook, index: number) => {
      if (id === value.id){
        notesCopy.splice(index, 1)
      }
    })
    setNotes(notesCopy)
  }

  function getParentIndex(parent_id:number, parent: any = notes):number {
    let index_r = -1
    parent?.forEach((value: Notebook, index: number) => {
      if (parent_id === value.id){
        index_r = index
      }
    })
    return index_r
  }

  function addNote(parent_id:number){
    const notesCopy = structuredClone(notes!);
    const parent = getParentIndex(parent_id)
    notesCopy.at(parent)!.notes.push({ value: "Note", id: Date.now()})
    setNotes(notesCopy)
  }

  function removeNote(parent_id:number, id:number){
    const notesCopy = structuredClone(notes!);
    const parent = getParentIndex(parent_id)
    notesCopy.at(parent)!.notes.forEach((value: Note, index: number) => {
      if ( value.id === id){
        notesCopy.at(parent)!.notes.splice(index, 1)
      }
    })
    setNotes(notesCopy)
  }

  function onTitleChanged(title:string, parent_id:number, _granda_id:number){
    const notesCopy = structuredClone(notes!);
    const parent = getParentIndex(parent_id);
    notesCopy.at(parent)!.title = title
    setNotes(notesCopy)
  }

  function onNoteChanged(value:string, parent_id:number, granda_id:number){
    const notesCopy = structuredClone(notes!);
    const grandpa = getParentIndex(granda_id);
    const parent = getParentIndex(parent_id, notesCopy.at(grandpa)!.notes)
    notesCopy.at(grandpa)!.notes.at(parent)!.value = value
    setNotes(notesCopy)
  }

  function removeAll(){
    localStorage.removeItem('notes')
    const notesCopy = structuredClone(notes!);
    notesCopy.splice(0, notesCopy.length)
    setNotesToWrap(notesCopy)
  }

  return (
    <div className='relative flex flex-col'>
      <div className='p-3'>
        <div className='flex justify-end mb-2 gap-2 h-fit'>
          <div className="text-white bg-gray-700 h-8 border-solid border-2 border-gray-900 rounded-md text-xl text-center pl-2 pr-2" onClick={removeAll}>Remove all</div>
          <div className="text-white bg-gray-700 h-8 w-8 border-solid border-2 border-gray-900 rounded-md justify-center items-center flex">
            <FontAwesomeIcon icon={icon({name:"plus", style:"solid"})} className="text-white h-8 w-8 flex" onClick={addNotes}/>
          </div>
        </div>
          <div className='flex justify-start flex-wrap items-start gap-4'>
            {notes?.map(notebook => <NotesContainer notebook={notebook} removeNotes={removeNotes} key={notebook.id} addNote={addNote} removeNote={removeNote} onTitlesChanged={onTitleChanged} onNoteChange={onNoteChanged}/> )}
          </div>
      </div>
      <footer className='fixed w-full bottom-0 bg-gradient-to-t from-gray-500 from-50% to-transparent'>
        <div className='justify-center w-full flex h-[2.25rem] items-center pt-2 mt-1'>
          <p className='text-white text-md text-center'>Made with ❤️ by Zofi</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
