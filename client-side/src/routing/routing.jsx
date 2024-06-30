import React from 'react';
import {Route, Routes} from 'react-router-dom';
import ListComponent from '../components/ListComponent';
export const Routing =()=>{
    return(
        <Routes>
            <Route path="/" element={<ListComponent />} />
           
        </Routes>
    )
}