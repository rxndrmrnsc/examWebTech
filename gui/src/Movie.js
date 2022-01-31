import { useState } from 'react'
import './Movie.css'

function Movie(props) {
    const { item, onDelete, onSave, onSelect } = props

    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState(item.title);
    const [category, setCategory] = useState(item.category);
    const [publicationDate, setPublicationDate] = useState(item.publicationDate);
    // console.log(props)

    const getPrettyDate = () => {
        let date = new Date(item.publicationDate)
        return date.toLocaleDateString("en-US")
    }

    const prettyDate = getPrettyDate()

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

    const deleteMovie = (evt) => {
        onDelete(item.id)
    }

    const save = (evt) => {
        onSave(item.id, {
            title, category, publicationDate
        })
        setEditing(false);
    }

    return (
        <>
            {
                isEditing
                    ? (
                        <div className="movie">
                            <div className="title">
                                <input type='text' placeholder='title' value={title} onChange={(evt) => setTitle(evt.target.value)} />
                            </div>
                            <div className="category">
                                <select onChange={(evt) => setCategory(evt.target.value)}>
                                    <option key={item.category}>{item.category}</option>
                                    {
                                        options.map((option) => (
                                            <option key={option.value}>{option.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="publication-date">
                                <input type='date' placeholder='publication date' value={publicationDate} onChange={(evt) => setPublicationDate(evt.target.value)} />
                            </div>
                            <input type="button" value="Save" onClick={save}/>
                            <input type="button" value="Cancel" onClick={(evt) => setEditing(false)}/>
                        </div>
                    )
                    : (
                        <div className="movie">
                            <div className="title">
                                {item.title}
                            </div>
                            <div className="category">
                                {item.category}
                            </div>

                            <div className="publication-date">
                                {prettyDate}
                            </div>
                            <input type="button" value="Delete" onClick={deleteMovie} />
                            <input type="button" value="Edit" onClick={(evt) => {setEditing(true)}} />
                            <input type="button" value="View crew" onClick={() => onSelect(item)} />
                        </div>
                    )

            }
        </>
    )
}

export default Movie;