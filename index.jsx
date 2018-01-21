import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import promise from 'redux-promise';
import cache from './components/middleware/telcos_storage_cacher';
import paymentRedirecter from './components/middleware/payment_redirecter';
import topupSummaryRedirecter from './components/middleware/topup_summary_redirecter'
import { createEpicMiddleware } from 'redux-observable';

import Actions from './actions/index';
import reducers from './reducers';

import App from './components/app';
import BillerDetails from './containers/biller_details';
import Payment from './containers/payment';
import PaymentSummary from './containers/payment_summary';
import { rootEpic } from './epics';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(epicMiddleware, cache, paymentRedirecter,topupSummaryRedirecter)
    )
  );


var element;
ReactDOM.render(<a className="navbar-brand" href="/" ref={(anchor)=>element = anchor}>easyBills Counter</a>,
document.querySelector('.container'));

ReactDOM.render(<Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>                   
                    <Route exact path="/" component={App} />
                    <Route exact path="/biller/:id" component={BillerDetails} />       
                    <Route exact path="/payment/:billerId/:phoneNo/:amount" component={Payment} />  
                    <Route exact path="/payment/summary/:success" component={PaymentSummary} />  
                </Switch>	    
            </div>
        </BrowserRouter>
    </Provider>,
    
    document.querySelector('#reactive'));
    console.log(element);

