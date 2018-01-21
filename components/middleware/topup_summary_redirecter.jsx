const SuccessResponseCode = "000";
const SuccessPaymentDataKey = 'SUCCESS_PAYMENT_DATA';

const updateSuccessPaymentData = (billerId, billReference, easyBillsReference) => {
    if(!billerId || !billReference || !easyBillsReference)
       return;

       sessionStorage.setItem(SuccessPaymentDataKey, 
        JSON.stringify({ billerId, billReference, easyBillsReference }));
};

const PaymentRedirecter = store => next => action => {
    if(action.type === 'TOPUP_SUCCESS' && action.payload.data){
        var paymentSuccess =  action.payload.data.responseCode === SuccessResponseCode;
        updateSuccessPaymentData(action.payload.data.billerId, 
            action.payload.data.billReference, action.payload.data.easyBillReference);
        location.href = `/payment/summary/${paymentSuccess}`        
    }

    return next(action);
};

export default PaymentRedirecter;