import { useEffect, useState } from 'react';
import CrewMember from './CrewMember';
import CrewMemberForm from './CrewMemberForm';
import CrewMemberSort from './CrewMemberSort';
import './CrewMemberList.css'


function CrewMemberList (props) {
    const {item} = props
    const [crewMembers, setCrewMembers] = useState([]);
    const [isSorted, setSorted] =useState(false)
    const SERVER = `http://localhost:5000/movies/${item.id}`;
    // const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/movies/${item.id}`


    const getCrew = async () => {
        try {
            const response = await fetch(`${SERVER}/crewmembers`)
            if (!response.ok) throw response
            const data = await response.json();
            setCrewMembers(data);
        } catch (error) {
            console.warn(error);
        }
    }

    const getCrewSorted = async () => {
        try {
            const response = await fetch(`${SERVER}/crewmembers/sort`)
            if (!response.ok) throw response
            const data = await response.json();
            setCrewMembers(data);
        } catch (error) {
            console.warn(error);
        }
    }

    const addCrew = async (crewMember) => {
        try {
            const response = await fetch(`${SERVER}/crewmembers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(crewMember)
            })
            if (!response.ok) throw response
            if(isSorted){
                getCrewSorted()
            } else {
                getCrew();
            }
        } catch (error) {
            console.warn(error)
        }
    }

    
    const deleteCrew = async (crewMemberID) => {
        try {
            const response = await fetch(`${SERVER}/crewmembers/${crewMemberID}`, {
                method: 'DELETE'
            })
            if (!response.ok) throw response
            if(isSorted){
                getCrewSorted()
            } else {
                getCrew();
            }
        } catch (error) {
            console.warn(error)
        }
    }

    const saveCrew = async (crewMemberID, crewMember) => {
        try {
            const response = await fetch(`${SERVER}/crewmembers/${crewMemberID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(crewMember)
            })
            if (!response.ok) throw response
            if(isSorted){
                getCrewSorted()
            } else {
                getCrew();
            }
        } catch (error) {
            console.warn(error)
        }
    }

    const sortedList = (isTrue) => {
        // console.log(isTrue);
        setSorted(isTrue);
    } 

    useEffect(() => {
        if(isSorted){
            getCrewSorted()
        } else {
            getCrew();
        }
    }, [item, isSorted])

    return (
            <div className="crew-list">
                {
                    crewMembers.map(e => <CrewMember key={e.id} item={e} onDelete={deleteCrew} onSave={saveCrew}/>)
                }
                <CrewMemberForm onAdd={addCrew}/>
                <CrewMemberSort onSort={sortedList}/>
            </div>
    )

}

export default CrewMemberList;