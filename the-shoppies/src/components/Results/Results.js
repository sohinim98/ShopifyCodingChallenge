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
    const editNominations = (movie, op) => {
        if (op === 'add') {
            if (nominationsNum < 5 ) {
                setNominationsList([...nominationsList, movie]);
                setNominationsNum(nominationsNum+1);
            }
        }
        else {
            let newNominationList = [...nominationsList];
            const index = newNominationList.indexOf(movie)
            if (index !== -1) {
                newNominationList.splice(index, 1);
                setNominationsList(newNominationList);
            }
            setNominationsNum(nominationsNum-1);
        }
    }
    if (props.query.length > 0) {
        return (
            <section className="results-container">
                <div className="results">
                    <h2>Results for "{props.query}"</h2>
                    { movieResults?.length > 0 ? (
                        <ul>
                            {movieResults.map(movie  => {
                            return (
                            <li className="results--entry">
                            <p key={movie.imdbID}>{movie.Title} ({movie.Year})</p>
                            <button onClick={() => editNominations(movie, 'add')} className="results--button" disabled={nominationsList.includes(movie)}>Nominate</button>
                            </li>
                            )
                        })}
                        </ul>
                    ) : 'Loading...'}
                </div>
                <Nominations nominationsList={nominationsList} editNominations={editNominations}/>
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
