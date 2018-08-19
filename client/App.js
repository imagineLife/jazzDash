import React from 'react';
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import Nav from './components/Nav';
import JazzDash from './containers/JazzDash';

class App extends React.Component {

	render(){
		return (
			<React.Fragment>
					<Router>
						<div className="routerWrapper">						
						<Nav />
						<Switch>
					        <Route exact path="/" component={JazzDash} />
					    </Switch>
					    </div>
					</Router>
			</React.Fragment>
		);
	}

};
export default App;
