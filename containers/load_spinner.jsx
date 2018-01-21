import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class LoadingSpinner extends Component {
 render() {
   return (
				<div className={this.props.show? 'spinner-shown wrapper' : 'spinner-hidden wrapper'}>
					<div className="inner">
						<span>L</span>
						<span>o</span>
						<span>a</span>
						<span>d</span>
						<span>i</span>
						<span>n</span>
						<span>g</span>
					</div>
				</div>
   )
 }
}

function mapStateToProps (state, ownProps) {
    return {
        show: state.showSpinner
    };
}

export default connect(mapStateToProps)(LoadingSpinner);