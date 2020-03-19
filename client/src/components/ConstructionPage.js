import React from 'react';
import Delta from './../delta.png'

class ConstructionPage extends React.Component {

       render() {
        return (
        <div className="padded-page center">
            <h1>mode 2</h1>
            <h2>this page is under construction.</h2>
            <img src={Delta} 
             height="200" width="200"/>
            <p style={{fontStyle: "italic"}}>
            version cpts 489 IA5<br/>
            &copy; 2020 marco ares. all rights reserved.</p>
        </div>
        );
    }   
}

export default ConstructionPage;