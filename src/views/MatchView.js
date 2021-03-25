import { Fragment, useState} from 'react'
import MatchDetail from '../assets/components/MatchDetail';
import MatchHistory from '../assets/components/MatchHistory';

export default function MatchView() {
    const [matchId, setMatchId] = useState('');

    const handleClick = (x) => {
        setMatchId(x)
    }

    return(
        <Fragment>
            {
                matchId === '' && <MatchHistory parentCallback={handleClick} />
            }
            {
                matchId !== '' && <MatchDetail parentCallback={handleClick} matchId={matchId}/>
            }
        </Fragment>
        
    )
}