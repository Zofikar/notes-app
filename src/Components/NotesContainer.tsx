import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Note, Notebook } from "../Types";
import Editable from './Editable';
import NoteContainer from "./NoteContainer";

type Props = {
    notebook:Notebook,
    removeNotes : Function
    addNote: Function,
    removeNote: Function,
    onTitlesChanged: Function,
    onNoteChange: Function
}

export default function NotesContainer({notebook, removeNotes, addNote, removeNote, onTitlesChanged, onNoteChange}: Props){
    return (
        <div id={`Notes${notebook.id}`} className='p-5 bg-gray-600 rounded-lg min-w-[10rem]'>
            <div className="flex items-center grow justify-between flex-nowrap gap-2">
                <Editable className='text-white  text-2xl bg-gray-600' value={notebook.title} parent_id={notebook.id} grandpa_id={-1} onChangeFunction={onTitlesChanged} ></Editable>
                <FontAwesomeIcon icon={icon({name:"minus", style:"solid"})} className="text-white bg-gray-700 h-6 w-6 border-solid border-1 border-gray-700 rounded-md" onClick={()=> removeNotes(notebook.id)}/>
            </div>
            <ul className='mt-1 mb-1'>
                {notebook.notes.map((note) => <NoteContainer note={note} parent_id={notebook.id} key={note.id} removeNote={removeNote} onChangeFunction={onNoteChange}/>)}
            </ul>
            <FontAwesomeIcon icon={icon({name:"plus", style:"solid"})} className="text-white bg-gray-700 h-6 w-6 border-solid border-1 border-gray-700 rounded-md" onClick={()=> addNote(notebook.id)}/>
        </div>
    )
}