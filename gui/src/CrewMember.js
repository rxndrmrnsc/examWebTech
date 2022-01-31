import { useState } from 'react'
import './CrewMember.css'

function CrewMember(props) {
    const { item, onDelete, onSave } = props
    const [isEditing, setEditing] = useState(false);
    const [name, setName] = useState(item.name);
    const [role, setRole] = useState(item.role);
    // console.log(props)

    const deleteCrew = (evt) => {
        onDelete(item.id)
    }

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


    const saveCrew = (evt) => {
        onSave(item.id, { name, role })
        setEditing(false);
    }

    return (
        <>
            {
                isEditing
                    ? (
                        <div className="crew-member">
                            <div className="crew-name">
                                <input type='text' placeholder='name' value={name} onChange={(evt) => setName(evt.target.value)} />
                            </div>
                            <div className="crew-role">
                                <select onChange={(evt) => setRole(evt.target.value)}>
                                <option key={item.role}>{item.role}</option>
                                    {
                                        options.map((option) => (
                                            <option key={option.value}>{option.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <input type="button" value="Cancel" onClick={() => setEditing(false)} />
                            <input type="button" value="Save" onClick={saveCrew} />
                        </div>
                    ) : (
                        <div className="crew-member">
                            <div className="name">
                                {item.name}
                            </div>
                            <div className="role">
                                {item.role}
                            </div>
                            <input type="button" value="Delete" onClick={deleteCrew} />
                            <input type="button" value="Edit" onClick={(evt) => setEditing(true)} />
                        </div>
                    )
            }
        </>
    )
}

export default CrewMember;