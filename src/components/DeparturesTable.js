export default function DeparturesTable({ stopInfo }) {
    return (
        <div className="container pt-4">
            {stopInfo && stopInfo.departures.length === 0 &&
                <h2 className="pb-4" style={{fontWeight:'bold'}}>No Departures Available</h2>
            }
            {stopInfo &&
                <table className="table container" style={{color:'#37897b'}}>
                    <thead>
                        <tr>
                            <th scope="col" colSpan="2" style={{fontSize:25, textAlign:'left'}}>{stopInfo.stops[0].description}</th>
                            <th scope="col" style={{fontSize:25, textAlign:'right'}}>Stop# {stopInfo.stops[0].stop_id}</th>
                        </tr>
                        <tr className="table" style={{backgroundColor:'#44a998', color:'white', borderBottomColor:'#44a998', borderTopColor:'#44a998', borderTopWidth:2, borderBottomWidth:2}}>
                            <th scope="col" style={{textAlign:'left'}}>ROUTE</th>
                            <th scope="col" style={{textAlign:'left'}}>DESTINATION</th>
                            <th scope="col" style={{textAlign:'right'}}>DEPARTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stopInfo.departures
                            .map(departure => (
                                <tr style={{border:2, borderColor:'#37897b'}} key={departure.trip_id}>
                                    <th scope="row" style={{textAlign:'left'}}>{departure.route_short_name}{departure.terminal}</th>
                                    <td style={{textAlign:'left'}}>{departure.description}</td>
                                    <td style={{textAlign:'right'}}>{departure.departure_text}</td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
        );

} 

 