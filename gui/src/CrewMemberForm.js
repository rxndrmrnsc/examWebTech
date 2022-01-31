import {useEffect, useState} from 'react';
import './CrewMemberForm.css'

function CrewMemberForm(props) {
    const {onAdd} = props;
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const options = [{
        label: 'director',
        value: 'director'
      }, {
        label: 'writer',
        value: 'writer'
      }, {
        label: 'actor',
        value: 'actor'
      }]

    const addCrewMember = () => {
        onAdd({name, role})
        setName("")
        setRole("")
    }

    return (
        <div className="crew-form">
            <div className="crew-name">
                <input type='text' placeholder='name' value={name} onChange={(evt) => setName(evt.target.value)} />
            </div>
            <div className="crew-role">
               <select onChange={(evt) => setRole(evt.target.value)}>
                    <option value=''></option>
                   {
                       options.map((option) => (
                           <option  key={option.value}>{option.label}</option>
                       ))
                   }
               </select>
            </div>
            <div className='add'>
                <input type='button' value='Add' onClick={addCrewMember}/>
            </div>
        </div>
    )
}

export default CrewMemberForm;