export default (state = null, action) => {
    switch(action.type){
        case 'PAYMENT_RESULT':
            return action.payload;

        default: return state;
    }
}