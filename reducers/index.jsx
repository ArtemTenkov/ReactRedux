import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import GetBillersReducer from './get_billers_reducer';
import GetBillerReducer from './get_biller_reducer';
import TopupReducer from './topup_reducer';
import PaymentResultReducer from './payment_result_reducer';
import ShowSpinnerReducer from './show_spinner_reducer';

const rootReducer = combineReducers({
    form:FormReducer,
    billers: GetBillersReducer,
    currentBiller: GetBillerReducer,
    topupReducer: TopupReducer,
    paymentResult: PaymentResultReducer,
    showSpinner: ShowSpinnerReducer
});

export default rootReducer;