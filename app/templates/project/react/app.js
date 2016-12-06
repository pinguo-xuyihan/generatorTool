var React = require('react');
var ReactRouter = require('reactRouter');
var indexPage = require('react:app/page/index');

var Link = ReactRouter.Link,

    IndexRoute = ReactRouter.IndexRoute,

    Route = ReactRouter.Route,

    hashHistroy = ReactRouter.hashHistroy,

    Router = ReactRouter.Router,

    Redirect = ReactRouter.Redirect;

React.render(
    (<Router>
        <Route path="/" component={indexPage} >
            <IndexRoute component={indexPage} />
        </Route>
    </Router>)
    ,document.getElementById('root'));