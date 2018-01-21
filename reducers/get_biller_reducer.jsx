export default(state = null, action) => { 
    switch(action.type)
    {
        case 'GET_BILLER':
            return action.payload;
        default: return state;
    }
}