import React, { useRef, useEffect } from 'react';
import { mount } from 'marketing/MarketingApp';
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const history = useHistory();
    console.log('MarketingApp in container is called');
    useEffect(() => {
        const {onParentNavigate} = mount(ref.current, {
            initialPath: history.location.pathname,
            // update browser history whenever the marketing memory history is updated
            onNavigate: ({pathname: nextPathName}) => {
                // check introduced to prevent infinite loops
                const { pathname } = history.location;

                if( pathname !== nextPathName ){
                    history.push(nextPathName);
                }
            }
        });

        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />;
};