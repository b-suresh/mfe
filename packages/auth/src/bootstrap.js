import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app
const mount = (el, {onSignIn, onNavigate, defaultHistory, initialPath}) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    if( onNavigate ){
        history.listen(onNavigate);
    }
    
    ReactDOM.render(<App onSignIn={onSignIn} history={history}/>, el);

    return {
        onParentNavigate: ({pathname: nextPathName}) => {
            console.log(nextPathName);
            if( history.location !== nextPathName ) {
                history.push(nextPathName);
            }
                
        }
    };
};


// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development'){
    const devRoot = document.querySelector('#_auth_dev_root');

    if(devRoot){
        console.log('In bootstrap before mounting');
        mount(devRoot, {defaultHistory: createBrowserHistory()});
    }
}


// We are running through container and we should export the mount function
export{ mount };