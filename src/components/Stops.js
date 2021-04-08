import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getDepartures } from '../services/MetroRequests';
import { isNullOrUndefined } from '../services/TypeChecks';
import DeparturesTable from './DeparturesTable';


export default function Stops({ routePrefix }) {
    //using history to append params to url pathname
    const history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
    const { stopId } = useParams(); //useParams returns an object of key/value pairs of URL parameters. Use it to access match.params of the current <Route>.

    const [stopInfo, setStopInfo] = useState(); //api response once user clicks "Go" button
    const [stopIdText, setStopIdText] = useState(''); //directly maps/binds to textbox

    // ------------------------------------------------------------------------
    // Use Effects for user interface interactions
    // ------------------------------------------------------------------------
    //entire purpose of this useEffect is to make sure we have the latest api information (runs every minute)
    useEffect(() => {
        async function getDeparturesState() {
            if (!isNullOrUndefined(stopId) && !isNullOrUndefined(stopInfo)) {
                const stopInfo = await getDepartures(stopId);
                setStopInfo(stopInfo);
            }
        }
        //setInterval calls the stop api every minute and updates the current departure state
        const intervalId = setInterval(() => {
            getDeparturesState();
        }, 60000 * 1)

        return () => clearInterval(intervalId);
    }, [stopId, stopInfo]);

    // ------------------------------------------------------------------------
    // Use Effects for rehydrating page from url params, user can navigate from address bar, without clicking GO
    // ------------------------------------------------------------------------

    useEffect(() => {
        async function getDeparturesState() {
            const stopInfo = await getDepartures(stopId);
            setStopInfo(stopInfo);
        }

        // if stop id is a truthy value (non-null,non-undefined, non-empty)...
        if (stopId) {
            setStopIdText(stopId);
            getDeparturesState();
        }
    }, [stopId]);

    // ------------------------------------------------------------------------
    //UI event handlers

    //updates my stopIdText state to whatever I typed
    function handleStopIdChange(event) {
        const newStopIdText = event.target.value;
        setStopIdText(newStopIdText);
    }

    async function getStopInformation(event) {
        event.preventDefault();
        const stopInfo = await getDepartures(stopIdText);
        setStopInfo(stopInfo);
        history.push(`${routePrefix}/${stopIdText}`);
    }

    function resetControl() {
        history.push('/stop');
        setStopIdText('');
        setStopInfo(null);
    }

    return (
        <div className="App">
            <form className="container col-xl-4 col-lg-6 col-md-8 pt-4" onSubmit={getStopInformation}>
                <div className="input-group mb-3 py-4">
                    <input type="text" className="form-control py-2" style={{borderColor:'#44a998', color:'#37897b', fontWeight:'bold'}} placeholder="Enter Stop #" value={stopIdText} onChange={handleStopIdChange} />
                    <div className="input-group-append">
                        <button className="btn py-2" style={{backgroundColor:'#44a998', color: 'white', fontWeight:'bold', borderBottomLeftRadius: 0, borderTopLeftRadius: 0}} type="button" id="buttonFancy" onClick={getStopInformation}>GO</button>
                    </div>
                </div>
            </form>

            <DeparturesTable stopInfo={stopInfo} />

            <div style={{marginBottom:20}}>
                <button onClick={resetControl} style={{backgroundColor:'#44a998', borderColor:'#44a998'}} className="border-rounded btn btn-outline-light pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{height:20, width:20}} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>
        </div>
    );
}