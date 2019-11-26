/* eslint-disable */
import { Input, Tooltip } from 'antd';
import React, { Component } from 'react';

function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

class NumericInput extends React.Component {
  onChange = e => {
    const { value } = e.target;
    const reg = /^01?([1-9][0-9]*)?$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '') {
      this.props.onChange(value);
      // console.log(value);
    }
    
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      onChange(value.slice(0, -1));
    }
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    const { value } = this.props;
    const title = value ? (
      <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
    ) : (
      'Input a number'
    );
    return (
    //   <Tooltip
    //     trigger={['focus']}
    //     title={title}
    //     placement="topLeft"
    //     overlayClassName="numeric-input"
    //   >
        <Input
          {...this.props}
          onChange={this.onChange}
        //   onBlur={this.onBlur}
          placeholder="Input a number"
          maxLength={10}
        />
    //   </Tooltip>
    );
  }
}


class InputNumber extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
      }
    
      onChange = value => {
        this.setState({ value });
      };
    
      render() {
        // console.log(this.state.value);
        return (
          <NumericInput style={{ width: 120 }} value={this.state.value} onChange={this.onChange} />
        );
      }
}

export default InputNumber;

/* to prevent the arrow overflow the popup container,
or the height is not enough when content is empty */
// .numeric-input .ant-tooltip-inner {
//   min-width: 32px;
//   min-height: 37px;
// }

// .numeric-input .numeric-input-title {
//   font-size: 14px;
// }