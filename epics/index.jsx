import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';
import {getBillers, getBillersSuccess, getBillersFailure, topUp, topUpSuccess, 
    topUpFailure, startSpinner, stopSpinner} from '../actions/index';

const ROOT_URL = 'http://localhost:17495/api';

function getBillersEpic(action$, store){
    return action$.ofType('GET_BILLERS')
        .do(() => store.dispatch(startSpinner()))
        .mergeMap(action => Observable.fromPromise(getBillers().payload))
        .map(response => getBillersSuccess(response))        
        .catch(error => Observable.of(getBillersFailure(error)))
        .do(() => store.dispatch(stopSpinner()));
}

function topupEpic(action$, store){
    return action$.ofType('TOPUP')
    .do(() => store.dispatch(startSpinner()))
    .mergeMap(action => 
        Observable.fromPromise(axios.post(`${ROOT_URL}/transaction/topup`, {
            billerId: action.payload.billerId, 
            phoneNo: action.payload.phoneNo,
            amount: action.payload.amount}
    )))
    .map(response => topUpSuccess(response))    
    .catch(error => Observable.of(topUpFailure(error)))
    .do(() => store.dispatch(stopSpinner()));
}

export const rootEpic = combineEpics(getBillersEpic, topupEpic);