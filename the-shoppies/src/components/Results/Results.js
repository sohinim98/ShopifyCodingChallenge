import React, { useState, useEffect } from 'react';
import './Results.scss';

export const Results = (props) => {
    const [movieResults, setMovieResults] = useState('');
    useEffect(() => {
        setMovieResults(props.movies);
    }, [props.movies]);
    if (props.query.length > 0) {
        return (
            <section>
                <h2>Results for "{props.query}"</h2>
                { movieResults?.length > 0 ? (
                    movieResults.map(movie => {
                        return (
                            <p key={movie.imdbID}>{movie.Title} ({movie.Year})</p>
                        )
                    })
                ) : 'Loading...'}
            </section>
        );
    } else {
        return (<div></div>)
    }

}

export default Results

// (movieResults === '' || movieResults === null || movieResults === undefined) ? 'Loading...' : (
//     <div>{movieResults.map(movie => {
//         return (
//             <div key={movie.imdbID}>
//                 {movie.Title} ({movie.Year})
//             </div>
//         )
//     })}</div>
// )
