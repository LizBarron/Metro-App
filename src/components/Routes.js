import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getRoutes, getDirections, getPlaceCodes, getTimePointDepartures } from '../services/MetroRequests';
import DeparturesTable from './DeparturesTable';

export default function Routes({ routePrefix }) {
    const history = useHistory();
    const { routeId, directionId, placeCode } = useParams();

    // these are for combo box selected item state
    const [selectedRoute, setSelectedRoute] = useState();
    const [selectedDirection, setSelectedDirection] = useState();
    const [selectedPlaceCode, setSelectedPlaceCode] = useState();

    // these are the json results from the api, which will be items listed in the combo-boxes
    const [routes, setRoutes] = useState([]);
    const [directions, setDirections] = useState([]);
    const [placeCodes, setPlaceCodes] = useState([]);

    //state for departures table
    const [stopInfo, setStopInfo] = useState();

    // ------------------------------------------------------------------------
    // Use Effects for user interface interactions
    // ------------------------------------------------------------------------
    useEffect(() => {
        async function getRoutesState() {
            const routes = await getRoutes();
            setRoutes(routes);
        }

        getRoutesState();
    }, []);

    useEffect(() => {
        async function getDirectionsState() {
            //if user has selected a route, optional chaining operator allows to check if route id is selected, if not it returns undefined
            const directions = await getDirections(selectedRoute?.route_id);
            setDirections(directions);
        }

        getDirectionsState();
    }, [selectedRoute]);

    useEffect(() => {
        async function getPlaceCodesState() {
            const placeCodes = await getPlaceCodes(selectedRoute?.route_id, selectedDirection?.direction_id);
            setPlaceCodes(placeCodes);
        }

        getPlaceCodesState();
    }, [selectedRoute, selectedDirection]);

    useEffect(() => {
        async function getTimePointDeparturesState() {
            const stopInfo = await getTimePointDepartures(selectedRoute?.route_id, selectedDirection?.direction_id, selectedPlaceCode?.place_code);
            setStopInfo(stopInfo);
        }

        getTimePointDeparturesState();

        const intervalId = setInterval(() => {
            getTimePointDeparturesState();
        }, 60000 * 1)

        return () => clearInterval(intervalId);
    }, [selectedRoute, selectedDirection, selectedPlaceCode]);

    // ------------------------------------------------------------------------
    // Use Effects for rehydrating page from url params
    // ------------------------------------------------------------------------

    useEffect(() => {
        // route array has items AND
        // selectedRoute is null OR selectedRoute.route_id not equal to routeId in url
        if (routes.length > 0 && (!selectedRoute || selectedRoute.route_id.toString() !== routeId)) {
            //The find() method returns the value of the first element in the provided array that satisfies 
            //the provided testing function. If no values satisfy the testing function, undefined is returned.
            const selectedRoute = routes.find(route => route.route_id.toString() === routeId);
            setSelectedRoute(selectedRoute);
        }
    }, [routes, selectedRoute, routeId]);

    useEffect(() => {
        if (directions.length > 0 && (!selectedDirection || selectedDirection.direction_id.toString() !== directionId)) {
            const selectedDirection = directions.find(direction => direction.direction_id.toString() === directionId);
            setSelectedDirection(selectedDirection);
        }
    }, [directions, selectedDirection, directionId]);

    useEffect(() => {
        if (placeCodes.length > 0 && (!selectedPlaceCode || selectedPlaceCode.place_code !== placeCode)) {
            const selectedPlaceCode = placeCodes.find(pc => pc.place_code === placeCode);
            setSelectedPlaceCode(selectedPlaceCode);
        }
    }, [placeCodes, selectedPlaceCode, placeCode]);

    // ------------------------------------------------------------------------
    //event handlers
    function handleRouteChange(event) {
        const routeId = event.target.value;
        const newSelectedRoute = routes.find(route => route.route_id.toString() === routeId);

        setSelectedPlaceCode(null);
        setSelectedDirection(null);
        setSelectedRoute(newSelectedRoute);
        history.push(`${routePrefix}/${routeId}`);
    }

    function handleDirectionChange(event) {
        const directionId = event.target.value;
        const newSelectedDirection = directions.find(direction => direction.direction_id.toString() === directionId);

        setSelectedPlaceCode(null);
        setSelectedDirection(newSelectedDirection);
        history.push(`${routePrefix}/${selectedRoute.route_id}/${directionId}`);
    }

    function handlePlaceCodeChange(event) {
        const placeCode = event.target.value;
        const newSelectedPlaceCode = placeCodes.find(pc => pc.place_code === placeCode);
        setSelectedPlaceCode(newSelectedPlaceCode);
        history.push(`${routePrefix}/${selectedRoute.route_id}/${selectedDirection.direction_id}/${placeCode}`);
    }

    function resetControl() {
        history.push(routePrefix);
        setSelectedPlaceCode(null);
        setSelectedDirection(null);
        setSelectedRoute(null);
    }

    return (
        <div className="App">
            <form className="col-lg-6 container py-4">
                <select className="form-control form-control-lg" style={{color:'#37897b', borderColor:'#44a998'}} value={selectedRoute?.route_id ?? ''} onChange={handleRouteChange}>
                    <option value="">Select Route</option>
                    {routes.map(route =>
                        <option key={route.route_id} value={route.route_id}>{route.route_label}</option>)}
                </select>
                <br />
                {selectedRoute && <select className="form-control form-control-lg" style={{color:'#37897b', borderColor:'#44a998'}} value={selectedDirection?.direction_id ?? ''} onChange={handleDirectionChange}>
                    <option value="">Select Direction</option>
                    {directions.map(direction =>
                        <option key={direction.direction_id} value={direction.direction_id}>{direction.direction_name}</option>)}
                </select>}
                <br />
                {selectedDirection && <select className="form-control form-control-lg" style={{color:'#37897b', borderColor:'#44a998'}} value={selectedPlaceCode?.place_code ?? ''} onChange={handlePlaceCodeChange}>
                    <option value="">Select Stop</option>
                    {placeCodes.map(pc =>
                        <option key={pc.place_code} value={pc.place_code}>{pc.description}</option>)}
                </select>}
            </form>

            <DeparturesTable stopInfo={stopInfo} />

            <div style={{paddingBottom:20}}>
                <button onClick={resetControl} style={{backgroundColor:'#44a998', borderColor:'#44a998'}} className="border-rounded btn btn-outline-light pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{height:20, width:20}} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>
        </div>
    );
}