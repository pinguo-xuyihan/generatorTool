import React from 'react';
import { Router, Route, IndexRoute } from 'react-router'
import indexPage from './page/index/index';


let Root = React.createClass({
    render() {
        return(
            <Router>
				<IndexRoute component={indexPage} />
				<Route path="/" component={indexPage} />
            </Router>
        );
    },
});

export default Root;