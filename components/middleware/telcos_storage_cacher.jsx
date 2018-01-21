const SESSION_STORAGE_KEY = 'TELCOS';

 const TelcosStorageRedirecter = store => next => action => {
    if(action.type === 'GET_BILLERS_SUCCESS'){
        var cachedBillers = sessionStorage.getItem(SESSION_STORAGE_KEY);

        if((!cachedBillers || typeof(cachedBillers) === 'undefined') && typeof(action.payload.data) !== 'undefined')
            sessionStorage.setItem(SESSION_STORAGE_KEY, 
                JSON.stringify(action.payload.data.AllBillerListRes.biller));
    }

    return next(action);
};

export default TelcosStorageRedirecter;