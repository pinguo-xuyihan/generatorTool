import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './app/root';
/* REQUIRE FILES HOOK */

render (
    <AppContainer>
        <Root></Root>
    </AppContainer>,
    document.querySelector('.root')
);


if(module.hot){
	
	module.hot.accept('./app/root' ,() => {
		
		let NewRoot = require('./app/root').default;

		render(
            <AppContainer>
                <NewRoot />
            </AppContainer>,
			document.querySelector('.root')
		)
	})
}
