import { useState } from 'react';

type Props = {
    onChangeFunction: Function,
    value: string,
    parent_id: number,
    grandpa_id: number,
    className: string
}


export default function Editable({onChangeFunction, value, parent_id, grandpa_id, className}: Props){
    const [edit, setEdit] = useState(false);
    const [myValue, setMyValue] = useState(value);

    function onBlur(event: any): void {
        setEdit(false);
    }

    function onChange(event: any): void {
        setMyValue(event.target.value)
        onChangeFunction(event.target.value, parent_id, grandpa_id)
    }

    return (
        <div>
            {edit ? 
            <input autoFocus className={className} type="text" placeholder={myValue} defaultValue={myValue} onBlur={onBlur} value={myValue} onChange={onChange}></input>
            :
            <p className={className} onClick={() => setEdit(true)}>{myValue}</p>
            }
        </div>
    )
}