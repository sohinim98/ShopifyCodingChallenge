import React, {useEffect, useState} from 'react';

import './Nominations.scss';

export const Nominations = (props) => {
    const [nominationsList, setNominationsList] = useState(props.nominationsList);
    useEffect(() => {
        setNominationsList(props.nominationsList);
    }, [props.nominationsList]);
    return (
        <section>
            <h2>Nominations</h2>
            {nominationsList.map(movie => {
                return (
                    <p key={movie.imdbID}>{movie.Title} ({movie.Year})</p>
                )
            })}
        </section>
    );
}
export default Nominations;
