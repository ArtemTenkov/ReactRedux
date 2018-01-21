import { ajax } from 'rxjs/observable/dom/ajax';
import axios from 'axios';
import _ from 'lodash';

const ROOT_URL = 'http://localhost:17495/api';
const SESSION_STORAGE_KEY = 'TELCOS';
const SuccessPaymentDataKey = 'SUCCESS_PAYMENT_DATA';

export function startSpinner(){
    
    return {
        type: 'SHOW_SPINNER',
        payload: true
    };
}

export function stopSpinner(){
    
    return {
        type: 'SHOW_SPINNER',
        payload: false
    }    
}

export function getPaymentResult(){
    var paymentResult = sessionStorage.getItem(SuccessPaymentDataKey);

    return {
        type: 'PAYMENT_RESULT',
        payload: JSON.parse(paymentResult)
    };
}

export function getBillerById(id){
    var billersList = sessionStorage.getItem(SESSION_STORAGE_KEY);
    var biller = null;

    if(billersList){
       biller = _.find(JSON.parse(billersList), {id:id});   
    }

    return {
        type: 'GET_BILLER',
        payload: biller
    };
}

const validatePaymentInput = (billerId, phoneNumber, amount) => {
    return true;
}

export function preparePaymentForm(billerId, phoneNumber, amount){
    var preparedSucesfully = validatePaymentInput(billerId, phoneNumber, amount);

    return {
        type: 'PREPARE_PAYMENT',
        payload: { prepared: preparedSucesfully, 
                        data: { billerId, phoneNumber, amount }
        }
    };
}


export function topUpSuccess(data){
    return {
        type: 'TOPUP_SUCCESS',
        payload: data
    };
}
    
export function topUpFailure(error){
    return {
        type: 'TOPUP_FAILURE'
        //NB Error scenario logic needs to be implemented
    };
}

export function topUp(billerId, phoneNo, amount, callBack){        

    return {
        type: 'TOPUP',
        payload: {billerId, phoneNo, amount}
    };
}


export function getBillers (callBack) {
    var request = {};

    //data.AllBillerListRes.biller
    let cachedBillers = sessionStorage.getItem(SESSION_STORAGE_KEY);    
    if(cachedBillers){
        request = new Promise((resolve, reject) =>{
            return resolve({
                data : {
                    AllBillerListRes: {
                        biller: JSON.parse(cachedBillers)
                    }
                }
            });
        });
    }
    else
        request = axios.get(`${ROOT_URL}/biller`);
                         
    return {
         type : 'GET_BILLERS',
         payload: request
    };
}

export function getBillersSuccess(data){
    return {
        type : 'GET_BILLERS_SUCCESS',
        payload: data
    };
}
    
export function getBillersFailure(error){
    return {
        type : 'GET_BILLERS_FAILURE'
    };
}