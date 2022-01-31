import { useEffect, useState } from 'react';
import CrewMemberList from './CrewMemberList.js';
import Movie from './Movie.js'
import MovieForm from './MovieForm.js'
import './MovieList.css'
import MovieFilter from './MovieFilter.js'

const SERVER = 'http://localhost:5000';
// const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`


function MovieList(props) {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [isFiltered, setFiltered] = useState(false);
    const [pageNr, setPageNr] = useState(0);

    const getMovies = async () => {
        try {
            const response = await fetch(`${SERVER}/movies`)
            if (!response.ok) throw response
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.warn(error);
        }
    }

    const getMoviesPages = async () => {
        try {
            const response = await fetch(`${SERVER}/movies/pagination?offset=${pageNr * 5}`)
            if (!response.ok) throw response
            const data = await response.json();
            setMovies(data);
            console.log(data)
            console.log(pageNr)

        } catch (error) {
            console.warn(error);
        }
    }

    const addMovie = async (movie) => {
        try {
            const response = await fetch(`${SERVER}/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            })
            if (!response.ok) throw response
            // getMovies();
            getMoviesPages()
        } catch (error) {
            console.warn(error)
        }
    }

    const deleteMovie = async (movieId) => {
        try {
            const response = await fetch(`${SERVER}/movies/${movieId}`, {
                method: 'DELETE'
            })
            if (!response.ok) throw response
            // getMovies();
            getMoviesPages()
        } catch (error) {
            console.warn(error)
        }
    }

    const saveMovie = async (id, movie) => {
        try {
            const response = await fetch(`${SERVER}/movies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            })
            if (!response.ok) throw response
            // getMovies();
            getMoviesPages()
        } catch (error) {
            console.warn(error)
        }
    }

    const selectMovie = async (movie) => {
        setSelectedMovie(movie);
    }

    const selectFilter = async (category, publicationDate) => {
        try {
            const response = await fetch(`${SERVER}/movies/filterAfter?category=${category}&publicationDate=${publicationDate}`)
            if (!response.ok) throw response
            const data = await response.json();
            setMovies(data);
            setFiltered(true);
        } catch (error) {
            console.warn(error);
        }
    }

    const resetFilter = async () => {
        setFiltered(false);
        getMovies();
    }

    const nextPage = async () => {
        setPageNr(pageNr + 1);
        getMoviesPages();
    }

    const prevPage = async () => {
        if (pageNr > 0) setPageNr(pageNr - 1);
        getMoviesPages();
    }

    useEffect(() => {
        // getMovies()
        getMoviesPages(pageNr)
        // console.log(pageNr)
    }, [setSelectedMovie, pageNr])

    return (
        <div>
            <div className="wrapper-movies">
                <div className="movie-list">
                    {
                        (isFiltered === false) ? (
                            <input type="button" value="Previous" onClick={prevPage} />
                        ) : <></>
                    }
                    {
                        movies.map(e => <Movie key={e.id} item={e} onDelete={deleteMovie} onSave={saveMovie} onSelect={selectMovie} />)
                    }
                    {
                        (isFiltered === false) ? (
                            <input type="button" value="Next" onClick={nextPage} />
                        ) : <></>
                    }
                </div>
                <div className="movie-list">
                    <br />
                    {
                        (isFiltered === false) ? (
                            <MovieForm onAdd={addMovie} />
                        ) : (<></>)
                    }
                    <MovieFilter onSelect={selectFilter} onReset={resetFilter} />
                </div>
            </div>
            {
                (selectedMovie) ? (
                    <div className="wrapper">
                        <h2>Movie selected: {selectedMovie.title}</h2>
                        <br />
                        <div className="crew-list">
                            <CrewMemberList item={selectedMovie} />
                        </div>
                    </div>
                ) : (
                    <h2>Select a movie to see its crew</h2>
                )
            }
        </div>
    )

}

export default MovieList;