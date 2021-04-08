import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Routes from '../components/Routes';
import Stops from '../components/Stops';

export default function Home() {
    // for address bar navigation: calls "/route" or "/stop" and activates the tabs accordingly
    const { pathname } = useLocation();
    const [activeTab, setActiveTab] = useState('route');

    useEffect(() => {
        const pageRoute = pathname.split('/')[1].toLowerCase();
        const activeTab = pageRoute === '' ? 'route' : pageRoute;
        setActiveTab(activeTab);
    }, [pathname]);

    return (
        <div>
            <img className="w-100" src="/pexels-josh-hild-7283557mntransit.jpg" alt="minneapolis-train"/>
            <h1 className="py-4" style={{fontWeight:'bold', fontFamily:'Libre Franklin'}}>Real-Time Departures</h1>
            <ul className="nav nav-pills justify-content-center" >
                <li className="nav-item pill-1" role="presentation">
                    <button style={{padding:20, borderBottomRightRadius: 0, borderTopRightRadius: 0}} className={`nav-link ${activeTab ==='route' ? 'active' : ''}`} data-bs-toggle="tab" data-bs-target="#routes" type="button" role="tab">Search by Route</button>
                </li>
                <li className="nav-item pill-2" role="presentation">
                    <button style={{padding:20, borderBottomLeftRadius: 0, borderTopLeftRadius: 0}} className={`nav-link ${activeTab ==='stop' ? 'active' : ''}`} data-bs-toggle="tab" data-bs-target="#stops" type="button" role="tab">Search by Stop #</button>
                </li>
            </ul>
            <div className="tab-content" role="tabpanel">
                <div id="routes" className={`tab-pane fade ${activeTab ==='route' ? 'active show' : ''}`} role="tabpanel">
                    <Routes routePrefix='/route' />
                </div>
                <div id="stops" className={`tab-pane fade ${activeTab ==='stop' ? 'active show' : ''}`} role="tabpanel">
                    <Stops routePrefix='/stop' />
                </div>
            </div>
        </div>
    );
}