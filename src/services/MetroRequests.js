import { isNullOrUndefined } from './TypeChecks';

export async function getRoutes() {
    const response = await fetch('https://svc.metrotransit.org/nextripv2/routes');
    return response.ok ? await response.json() : [];
}

export async function getDirections(routeId) {
    if (isNullOrUndefined(routeId)) {
        return [];
    }

    const response = await fetch(`https://svc.metrotransit.org/nextripv2/directions/${routeId}`);
    return response.ok ? await response.json() : [];
}

export async function getPlaceCodes(routeId, directionId) {
    if (isNullOrUndefined(routeId) || isNullOrUndefined(directionId)) {
        return [];
    }

    const response = await fetch(`https://svc.metrotransit.org/nextripv2/stops/${routeId}/${directionId}`);
    return response.ok ? await response.json() : [];
}

export async function getTimePointDepartures(routeId, directionId, placeCode) {
    if (isNullOrUndefined(routeId) || isNullOrUndefined(directionId) || isNullOrUndefined(placeCode)) {
        return null; //not an array, so make it null instead
    }

    const response = await fetch(`https://svc.metrotransit.org/nextripv2/${routeId}/${directionId}/${placeCode}`);
    return response.ok ? await response.json() : null;
}

export async function getDepartures(stopId) {
    if (isNullOrUndefined(stopId)) {
        return null;
    }
    
    const response = await fetch(`https://svc.metrotransit.org/nextripv2/${stopId}`);
    return response.ok ? await response.json() : null;
}