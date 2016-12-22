
import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import indexPage from './app/page/index/index';
/* REQUIRE FILES HOOK */


render(
  (<Router>
    <Route path="/" component={indexPage}>
      <Route path="/index" component={indexPage} />
    </Route>
  </Router>), document.querySelector('.root'));