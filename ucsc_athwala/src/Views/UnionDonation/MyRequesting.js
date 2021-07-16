import React from 'react';
import './Donation.css';
import Tab from './Donation_tab';
import MyCause from './Donation_MyCauses';
import Side from '../UnionSidebar/UnionStudentSidebar';
import Nav from '../Navbar/Navbar';

export default function View_Allcause(){
    return(
        <div>
            <div><Nav /></div>
            <div style={{display:'flex'}}>
               <Side />
                <div className="container-fluid container-custom">
                    <Tab />
                    <div style={{marginTop:30}}>
                      <MyCause />  
                    </div>
                    
                </div>
            </div>
        </div>
    );
}