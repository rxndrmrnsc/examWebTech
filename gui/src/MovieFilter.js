import {useEffect, useState} from 'react';
import './MovieFilter.css'

function MovieFilter(props) {
    const {onSelect, onReset} = props;
    const [category, setCategory] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const [isFiltered, setFiltered] = useState(false);

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

    const seeMovies = () => {
        onSelect(category, publicationDate)
        setCategory("")
        setPublicationDate("")
        setFiltered(true)
    }

    const changeFilter = () => {
        onReset()
        setFiltered(false);
    }

    useEffect(() => {}, [isFiltered])

    return (
        <div className="movie-filter">
            <div className="movie-category">
                <label>Choose category:</label> <br/>
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
                <label>Choose earliest year:</label> <br/>
                <input type='date' placeholder='publication date' value={publicationDate} onChange={(evt) => setPublicationDate(evt.target.value)} />
            </div>
            <div className='view'>
                <input type='button' value='View movies' onClick={seeMovies}/>
            </div>
            {
                isFiltered ? (
                    <input type='button' value='View all movies' onClick={changeFilter}/>
                ) : (<></>)
            }
        </div>
    )
}

export default MovieFilter;