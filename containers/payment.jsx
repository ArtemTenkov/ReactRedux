import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {getBillerById, topUp} from '../actions/index';
import LoadingSpinner from '../containers/load_spinner';

import _ from 'lodash';

class Payment extends Component{
    componentDidMount(){
        var billerId = this.props.match.params.billerId;
        this.props.getBillerById(billerId); 
    }

    onSubmit(values){
        this.props.topUp(this.props.match.params.billerId, this.props.match.params.phoneNo, this.props.match.params.amount)
    }

    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return(<div className="container">     
            <LoadingSpinner />   
            <h1>Payment</h1> 
            <br />
            <h4 style={{color : 'green'}}>Please check you payment details and press 'Confirm' to proceed.</h4>                          
            <form action="" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="jumbotron" style={{position: 'relative'}}>
                Biller: <span style={{color : 'green'}}>{this.props.currentBiller? ` ${this.props.currentBiller.nameEn}`: ' Biller not found'}</span><br />
                Transaction Ref: <span style={{color : 'green'}}>{this.props.match.params.phoneNo? ` ${this.props.match.params.phoneNo}`: ' Phone number not specified'}</span> <br />
                Bill Amount: <span style={{color : 'green'}}>{this.props.match.params.amount?  `${this.props.match.params.amount}.00 THB`: ' Amount not specified'}</span> 
                <br /><br />
                    <button type="submit" className="btn btn-success" style={{display: 'inline-block', marginRight: '10px'}}>Confirm</button><Link to={'/'} className="btn btn-danger">Cancel</Link>
                </div>         
            </form>
        </div>);
    }
}

const validate = values => {
    const errors = {};
    return errors;
};

const warnings = values => {
    const warnings = {};
    return warnings;
};

const mapStateToProps = (state) => ({
    currentBiller: state.currentBiller
});

function mapDispatchToProps(dispatch){
    return bindActionCreators({getBillerById, topUp}, dispatch);
}

export default reduxForm({  
    validate, warnings, form: 'Payment'
})(
    connect(mapStateToProps, mapDispatchToProps)(Payment)
);
