import {useEffect, useState} from 'react';
import './MovieForm.css'

function MovieForm(props) {
    const {onAdd} = props;
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [publicationDate, setPublicationDate] = useState("");

    const options = [{
        label: 'romance',
        value: 'romance'
      }, {
        label: 'horror',
        value: 'horror'
      }, {
        label: 'action',
        value: 'action'
      }, {
        label: 'drama',
        value: 'drama'
      }]

    const addMovie = () => {
        onAdd({title, category, publicationDate})
        setTitle("")
        setCategory("")
        setPublicationDate("")
    }

    return (
        <div className="movie-form">
            <div className="movie-title">
                <input type='text' placeholder='title' value={title} onChange={(evt) => setTitle(evt.target.value)} />
            </div>
            <div className="movie-category">
               <select onChange={(evt) => setCategory(evt.target.value)}>
                    <option value=''></option>
                   {
                       options.map((option) => (
                           <option  key={option.value}>{option.label}</option>
                       ))
                   }
               </select>
            </div>
            <div className="movie-date">
                <input type='date' placeholder='publication date' value={publicationDate} onChange={(evt) => setPublicationDate(evt.target.value)} />
            </div>
            <div className='add'>
                <input type='button' value='Add' onClick={addMovie}/>
            </div>
        </div>
    )
}

export default MovieForm;