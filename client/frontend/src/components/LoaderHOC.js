import React , { useState } from 'react';
import Loader from './Loader';

export const LoaderHOC = ({ Component, loadingMessage }) => {
    function loader(props){
        const [isLoading, setLoading] = useState(true);
        const setLoadingState = componentLoaded => {
            setLoading(componentLoaded);
        };

        return(
            <>
                {isLoading && <Loader message ={loadingMessage}/>}
                <Component {...props} setLoading={setLoadingState}/>
            </>
        );
    }
    return loader;
};

export default LoaderHOC;