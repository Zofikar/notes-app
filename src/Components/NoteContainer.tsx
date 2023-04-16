import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Note } from "../Types";
import Editable from './Editable';


type Props = {
    note: Note,
    parent_id: number,
    removeNote: Function,
    onChangeFunction: Function,
}

export default function NoteContainer({note, parent_id, removeNote, onChangeFunction}:Props){
    return (
        <li id={`Note${note.id}`}>
            <div className='flex justify-between flex-nowrap items-center p-5 gap-4'>
                <Editable onChangeFunction={onChangeFunction} value={note.value} parent_id={note.id} grandpa_id={parent_id} className='text-white text-xl min-w-[5rem] bg-gray-600'  />
                <FontAwesomeIcon icon={icon({name:"minus", style:"solid"})} className="text-white bg-gray-700 h-4 w-4 border-solid border-1 border-gray-700 rounded-md" onClick={() => removeNote(parent_id, note.id)}/>
            </div>
        </li>
    )
}