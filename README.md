# Metro-App

The real-time metro transit departure feed.

## Project Details / Assumptions
This website is a metro transit real-time departure data feed. It will refresh departures every minute. Listing data is provided through the [NexTrip API](https://svc.metrotransit.org/swagger/index.html?urls.primaryName=NexTrip%20API%20-%20v2).

Obtaining departures is provided by two means:

### By Route
1. Select a route
2. Select a direction
3. Select a stop. Selecting an option will list the departures.

### By Stop Number
1. Enter a stop number and click Go. Clicking go will list the departures.

### Technical details assumed
* End-user actions should utilize browser navigation (back/forward buttons)
* Departure urls should be navigatable from the browser address bar and/or from external links.
* Departures should update every minute as to provide real-time data functionality.

## Installation / Development / Deployment
To build this website

### First install the dependencies:
```bash
yarn
```

### For running in a local developer environment:
```bash
yarn start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### For running unit tests:
```bash
yarn test
```
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### For creating a production build:
```bash
yarn build
```
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


Enjoy :)