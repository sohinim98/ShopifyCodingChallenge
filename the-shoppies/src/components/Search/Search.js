import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './Search.scss';
import Results from '../Results/Results'
import searchIcon from '../../assets/search.png';

export const Search = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState('');
    // Make API call 500 ms after the user stops typing
    useEffect(() => {
        const timeOutId = setTimeout(() => fetchMovies(query), 5000);
        return () => clearTimeout(timeOutId);
    }, [query]);

    const fetchMovies = event => {
        {
            axios
                .get(`http://www.omdbapi.com/?apikey=83ecb157&s=${event}&type=movie`)
                .then(res => {
                    if (res.status === 200) {
                        setMovies(res.data.Search)
                        console.log('these', movies)
                    }
                })
                .catch(error => {
                    console.log('error', error);
                })
        }
    }
    return (
        <section>
            <h2>Movie title</h2>
            <div className="movie--search">
                <img src={searchIcon} className="movie--search--icon" alt="Search Icon"/>
                <input
                    onChange={event => setQuery(event.target.value)}
                    className="movie--input"
                    placeholder="Search..."
                />
            </div>
            <Results movies={movies} query={query}/>
        </section>
    );
}

export default Search;
