import React from 'react';

class DropDownSelect extends React.Component {

  renderSelectOptions(val){
    return <option key={val.id} value={val.amount}>{val.amount}</option>
  }

  render() {
    const { input, label, type, value, defaultValue, meta: { touched, error, warning } } = this.props;
    return (
      <div>
        <label>{label}</label>
        <select className="form-control" {...input}>
          <option value="">----</option>  
          {this.props.items.map(this.renderSelectOptions)}
        </select>
        {touched &&
            ((error && <span style={{color: 'red'}}>{error}</span>)||(warning && <span>{warning}</span>))}
      </div>
    );
  }
}

DropDownSelect.propTypes = {
    items: React.PropTypes.array,
    input: React.PropTypes.object,
    label: React.PropTypes.string,
  };
  
  export default DropDownSelect;