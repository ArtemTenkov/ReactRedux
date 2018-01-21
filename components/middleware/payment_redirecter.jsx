 const PaymentRedirecter = store => next => action => {
    if(action.type === 'PREPARE_PAYMENT'){
        if(action.payload.prepared && action.payload.data.billerId && action.payload.data.phoneNumber && action.payload.data.amount){
            location.href = `/payment/${action.payload.data.billerId}/${action.payload.data.phoneNumber}/${parseInt(action.payload.data.amount)}`
        }        
    }

    return next(action);
};

export default PaymentRedirecter;