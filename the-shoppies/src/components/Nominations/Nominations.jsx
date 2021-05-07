import React, {useEffect, useState} from 'react';

import './Nominations.scss';

export const Nominations = (props) => {
    const [nominationsList, setNominationsList] = useState(props.nominationsList);
    useEffect(() => {
        setNominationsList(props.nominationsList);
    }, [props.nominationsList]);
    return (
        <section className="nominations">
            <h2 className="nominations--header">Nominations</h2>
            {props.nominationsNum === 5 ? (<h3 className="nominations--banner">You've nominated all 5 films!</h3>) : null}
            <ul>
                {nominationsList.map(movie => {
                    return (
                        <li className="nominations--entry">
                            <p key={movie.imdbID}>{movie.Title} ({movie.Year})</p>
                            <button onClick={() => props.editNominations(movie, 'remove')} className="nominations--button">Remove</button>
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}
export default Nominations;
