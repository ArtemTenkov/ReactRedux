import React, {Component} from 'react';
import FeaturedBillers from '../containers/featured_billers'; 
import LoadingSpinner from '../containers/load_spinner';

export default class App extends Component {
    render(){
        return (
            <div className="container">
                <h1 className="my-4 text-center text-lg-left">Billers</h1>  
                <LoadingSpinner />
                <FeaturedBillers />
            </div>
       );
    }
}