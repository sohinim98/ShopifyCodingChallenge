import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './Search.scss';
import Results from '../Results/Results';
import searchIcon from '../../assets/search.png';

export const Search = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState('');
    // Make API call 500 ms after the user stops typing
    useEffect(() => {
        const timeOutId = setTimeout(() => fetchMovies(query), 500);
        return () => clearTimeout(timeOutId);
    }, [query]);

    const fetchMovies = event => {
        {
            axios
                .get(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${event}&type=movie`)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.Response === "False") {
                            setMovies(res.data.Error);
                        } else {
                            const resUnique =  res.data.Search.filter((movie, index) => res.data.Search.findIndex(obj => obj.imdbID === movie.imdbID) === index);
                            setMovies(resUnique);
                        }
                    }
                })
                .catch(error => {
                    console.log('error', error);
                })
        }
    }
    return (
        <section>
            <div className="search">
                <h2 className="search--header">Movie title</h2>
                <div className="search--bar">
                    <img src={searchIcon} className="search--icon" alt="Search Icon"/>
                    <input
                        onChange={event => setQuery(event.target.value)}
                        className="search--input"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <Results movies={movies} query={query}/>
        </section>
    );
}

export default Search;
