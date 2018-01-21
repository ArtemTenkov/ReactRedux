import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import {getBillers} from '../actions/index';

class FeaturedBillers extends Component{    

    componentDidMount(){
        this.props.getBillers();        
    }

    truncateName(name){
        return _.truncate(name, {
                'length': 10,
                'separator': ' '
                });
    }

    renderBillers(){
        if(!this.props.billers)
            return;

            var noImageUrl = 'http://placehold.it/400x300';
            var billersList =
            this.props.billers.map(biller => 
            <div className="col-lg-2 col-md-2 col-xs-5" key={biller.id}>
                 <h3>{this.truncateName(biller.nameEn)}</h3><br />
                 <Link to={`biller/${biller.id}`} className="d-block mb-4 h-100" >
                    <img className="img-fluid img-thumbnail" src={biller.iconUrl || noImageUrl} alt="" />
                 </Link>                
            </div>);

            return billersList;            
    }

    render(){
        console.log(this.props.billers);

        return(
        <div className="row text-center text-lg-left">
           {this.renderBillers()}
        </div>);
    }
}

function mapStateToProps (state, ownProps) {
    return {
        billers: state.billers
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getBillers}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedBillers);