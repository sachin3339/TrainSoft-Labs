
import React, { useState } from 'react';
const BreadcrumbContext = React.createContext({});
export default BreadcrumbContext;
export const BreadcrumbConsumer = BreadcrumbContext.Consumer;

export const BreadcrumbProvider = (props) => {
    const [breadcrumbs, setBreadcrumbs] = useState({});
    const update = newVal => setBreadcrumbs(prevState => ({...prevState, ...newVal}));
    return <BreadcrumbContext.Provider
        value={{ breadcrumbs, update }} >
        {props.children}
    </ BreadcrumbContext.Provider>
}