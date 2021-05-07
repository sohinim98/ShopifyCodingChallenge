import React, { useState, useEffect } from 'react';
import './Results.scss';

export const Results = (props) => {
    const [movieResults, setMovieResults] = useState('');
    console.log('console', movieResults, "also", props.movies);
    useEffect(() => {
        console.log('triggered')
        setMovieResults(props.movies);
    }, [props.movies]);
    return (
        (movieResults === '' || movieResults === null) ? 'Loading...' : (
            <div>{movieResults.map(movie => {
                return (
                    <div key={movie.imdbID}>
                        {movie.Title} ({movie.Year})
                    </div>
                )
            })}</div>
        )
    );
}

export default Results
