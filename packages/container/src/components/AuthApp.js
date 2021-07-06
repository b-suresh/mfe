import React, { useRef, useEffect } from 'react';
import { mount } from 'auth/AuthApp';
import { useHistory } from 'react-router-dom';

export default ({onSignIn}) => {
    const ref = useRef(null);
    const history = useHistory();
    console.log('AuthApp in container is called');
    useEffect(() => {
        const {onParentNavigate} = mount(ref.current, {
            initialPath: history.location.pathname,
            // update browser history whenever the auth memory history is updated
            onNavigate: ({pathname: nextPathName}) => {
                // check introduced to prevent infinite loops
                const { pathname } = history.location;

                if( pathname !== nextPathName ){
                    history.push(nextPathName);
                }
            },
            onSignIn
        });

        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />;
};