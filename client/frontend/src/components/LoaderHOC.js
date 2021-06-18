import React , { useState } from 'react';
import Loader from './Loader';

export const LoaderHOC = ( Component ) => {
    function loader(props){
        const [isLoading, setLoading] = useState(true);
        const setLoadingState = componentLoaded => {
            setLoading(componentLoaded);
        };
        //console.log(isLoading);
        return(
            <>
                {isLoading && <Loader/>}
                <Component {...props} setLoading={setLoadingState}/>
            </>
        );
    }
    return loader;
};

export default LoaderHOC;