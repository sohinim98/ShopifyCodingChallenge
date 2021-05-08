import React, { useContext, useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import './Results.scss';
import Nominations from '../Nominations/Nominations'
import { saveContent, getUserDocument } from '../../firebase';
import { UserContext } from '../../providers/UserProvider';

export const Results = (props) => {
    const user = useContext(UserContext);
    const [movieResults, setMovieResults] = useState('');
    const [nominationsList, setNominationsList] = useState([]);
    const [nominationsNum, setNominationsNum] = useState(0);
    const [movieNotFound, setMovieNotFound] = useState('');

    useEffect(() => {
        (async () => {
            let onLoadDocument = await getUserDocument(user.uid);
            if(onLoadDocument.content !== undefined) {
                setNominationsList(onLoadDocument.content.nominationsList);
                setNominationsNum(onLoadDocument.content.nominationsNum);
            }
        })()
    }, [setNominationsList, setNominationsNum, user.uid]);

    useEffect(() => {
        saveContent(user, { nominationsList: nominationsList, nominationsNum: nominationsNum});
    }, [nominationsList, nominationsNum]);

    useEffect(() => {
        if (props.movies === 'Movie not found!') {
            setMovieNotFound('No matches found!');
        } else if (props.movies === 'Error fetching movies!') {
            setMovieNotFound('Error fetching movies!');
        }
        else {
            setMovieNotFound('');
            setMovieResults(props.movies);
        }
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
                    { ((typeof movieResults === "object" && movieResults.length > 0) || movieNotFound === 'No matches found!' || movieNotFound === 'Error fetching movies!') ? (
                        (movieNotFound === 'No matches found!' || movieNotFound === 'Error fetching movies!') ?  (<p>{movieNotFound}</p>) :  (<ul className="results--list">
                            { movieResults.map(movie => {
                                return (
                                    <li className="results--entry">
                                        <p key={movie.imdbID}>{movie.Title} ({movie.Year})</p>
                                        <button onClick={() => editNominations(movie, 'add')} className="results--button" disabled={nominationsList.some(entry => entry.imdbID === movie.imdbID)}>Nominate</button>
                                    </li>
                                )
                            })}
                        </ul>)
                    ) : <ReactLoading type='spin' color={'#96bf48'} height={'20%'} width={'20%'} />}
                </div>
                <Nominations nominationsList={nominationsList} editNominations={editNominations} nominationsNum={nominationsNum}/>
            </section>
        );
    } else {
        return (<Nominations nominationsList={nominationsList} editNominations={editNominations} nominationsNum={nominationsNum}/>)
    }

}

export default Results
