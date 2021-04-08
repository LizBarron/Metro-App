export default function About() {
    return (
        <>
            <header className="container-fluid pt-2" style={{ fontSize: '2.5rem', fontFamily: 'Libre Franklin', fontWeight: 'bold' }}>About</header>

            <div className="container-fluid" style={{ fontSize: 20, paddingTop: 20 }}>
                <p>Hi, this website was created by Elizabeth Barron using the <a href="https://svc.metrotransit.org/swagger/index.html?urls.primaryName=NexTrip%20API%20-%20v2" >NexTrip API</a>.</p>
                <p>You can find my Github repo at <a href="https://www.github.com/lizbarron/metro-app">https://www.github.com/lizbarron/metro-app</a>.</p>
            </div>
        </>
    )
}