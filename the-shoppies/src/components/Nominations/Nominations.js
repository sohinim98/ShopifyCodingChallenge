import React, {useEffect, useState} from 'react';

import './Nominations.scss';

export const Nominations = (props) => {
    const [nominationsList, setNominationsList] = useState(props.nominationsList);
    useEffect(() => {
        setNominationsList(props.nominationsList);
    }, [props.nominationsList]);
    const removeNominations = (movie) => {}
    return (
        <section className="nominations">
            <h2 className="nominations--header">Nominations</h2>
            <ul>
                {nominationsList.map(movie => {
                    return (
                        <li className="nominations--entry">
                            <p key={movie.imdbID}>{movie.Title} ({movie.Year})</p>
                            <button onClick={() => removeNominations(movie)} className="nominations--button">Remove</button>
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}
export default Nominations;
