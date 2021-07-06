import React, { useRef, useEffect } from 'react';
import { mount } from 'dashboard/DashboardApp';

export default () => {
    const ref = useRef(null);
    console.log('DashboardApp in container is called');
    useEffect(() => {
        mount(ref.current);
    }, []);

    return <div ref={ref} />;
};