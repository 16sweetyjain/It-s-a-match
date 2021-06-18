import React from 'react';

const Loader = () => {
    return (
        <div className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className ='row'>
                <div className='col s12'>
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper center">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Loader;
