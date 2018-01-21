export default(state = null, action) =>{
    
        switch(action.type){
            case 'TOPUP':
                if(action.payload.data)
                return action.payload.data;
                else
                return state;             
            default: return state;
        }
    }