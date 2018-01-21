import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import DropDownSelect from '../components/drop_down_select';
import {renderField} from '../components/field_generator';

import _ from 'lodash';

import {getBillerById, preparePaymentForm} from '../actions/index';

const dropDownValidation = value => isNaN(parseInt(value))  ? 'Please, select the value' : undefined ;
const mobileNoValidation = value => isNaN(parseInt(value))  ? 'Please, specify the phone number' : undefined ;

class BillerDetails extends Component{
    componentDidMount(){
        var billerId = this.props.match.params.id;
        this.props.getBillerById(billerId); 
    }

    onSubmit(values){
        this.props.preparePaymentForm(this.props.match.params.id, _.trim(values.phoneNo), 
        _.trim(values.amount));
    }

    generateAmountField(label, name){
        if(!this.props.currentBiller) return;

        if(this.props.currentBiller.denomination && this.props.currentBiller.denomination.length > 0){
            return (                    
                <Field
                name={name}
                label={label}
                component={DropDownSelect}
                validate={dropDownValidation}
                items={this.props.currentBiller.denomination}
                className="form-control" />
                    ); 
        }   

        return this.generateTextInput(label, name);        
    }

    generateTextInput(label, name){
        return (<Field 
        type="text"
        component={renderField}
        validate={mobileNoValidation}
        label={label}
        name={name} />);
    }

    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return(<div className="container">
            <h1>Topup</h1>            
            <form action="" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="jumbotron">
                    <h4 style={{display: 'inline-block'}}>Biller:</h4><span style={{color : 'green'}}>{this.props.currentBiller? ` ${this.props.currentBiller.nameEn}`: ' Biller not found'}</span>
                    <br /><br /><br />
                    {this.generateTextInput('Top Up Mob. No:', 'phoneNo')}                    
                    {this.generateAmountField('Bill amount', 'amount')}
                </div>                
                <Link to={'/'} className="btn btn-success" style={{display: 'inline-block'}}>Change biller</Link> <button type="submit" className="btn btn-success">Next</button>
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
    return bindActionCreators({getBillerById, preparePaymentForm}, dispatch);
}

export default reduxForm({
    validate, warnings, form: 'BillerDetails'
})(
    connect(mapStateToProps, mapDispatchToProps)(BillerDetails)
);
