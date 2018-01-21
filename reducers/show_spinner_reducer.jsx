export default (state = null, action) => {
    switch(action.type){       
        case 'SHOW_SPINNER':
            return action.payload;
        default: return state;
    }
}