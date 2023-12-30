import 'bootstrap/dist/css/bootstrap.min.css';
import directoryCSS from './directory.module.css';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';


function Directory() {
    return (

        <section>
            <div className='container p-2'>
                <div className='card'>
                    <div className='card-body'>
                        <h4 className='card-title'>Directory</h4>


                    </div>
                </div>
            </div>
        </section>
    );
}

export default Directory;