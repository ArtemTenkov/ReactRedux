import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPaymentResult, getBillerById} from '../actions/index';

import _ from 'lodash';

class PaymentSummary extends Component{
    componentDidMount(){
        this.props.getPaymentResult();
    }

    renderPaymentDetails(paymentDetails){
        if(!paymentDetails || this.props.match.params.success !== 'true') return;

        return (
        <div>            
            <strong>Operator:</strong> {paymentDetails.billerId} <br />
            <strong>Bill reference:</strong> {paymentDetails.billReference} <br />
            <strong>easyBills reference:</strong> {paymentDetails.easyBillsReference} <br />
        </div>);
    }

    render(){
        return (
        <div className="jumbotron">
               <h1>{this.props.match.params.success === 'true'? 'Successful topup' : 'Payment error'}</h1>
               {this.renderPaymentDetails(this.props.paymentDetails)}
        </div>)
    }
}   

const mapStateToProps = (state) => ({
    paymentDetails: state.paymentResult
});

function mapDispatchToProps(dispatch){
    return bindActionCreators({getPaymentResult, getBillerById}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSummary);
