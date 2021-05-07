import React, { useState, useEffect } from 'react';
import './Results.scss';
import Nominations from '../Nominations/Nominations'

export const Results = (props) => {
    const [movieResults, setMovieResults] = useState('');
    const [nominationsList, setNominationsList] = useState([]);
    const [nominationsNum, setNominationsNum] = useState(0);
    useEffect(() => {
        setMovieResults(props.movies);
    }, [props.movies]);
    const addNominations = (movie) => {
        if (nominationsNum < 5 ) {
            setNominationsList([...nominationsList, movie]);
            setNominationsNum(nominationsNum+1);
        }
    }
    if (props.query.length > 0) {
        return (
            <section>
                <div className="results">
                    <h2>Results for "{props.query}"</h2>
                    { movieResults?.length > 0 ? (
                        movieResults.map(movie => {
                            return (
                                <div className="results--entry">
                                    <p key={movie.imdbID}>{movie.Title} ({movie.Year})</p>
                                    <button onClick={() => addNominations(movie)} className="results--button">Nominate</button>
                                </div>
                            )
                        })
                    ) : 'Loading...'}
                </div>
                <Nominations nominationsList={nominationsList}/>
            </section>
        );
    } else {
        return (<Nominations nominationsList={nominationsList}/>)
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
