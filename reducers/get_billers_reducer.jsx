    export default(state = null, action) =>{

        switch(action.type){
            case 'GET_BILLERS_SUCCESS':
                if(action.payload.data)
                return action.payload.data.AllBillerListRes.biller;
                else
                return state;               
            default: return state;
        }
    }