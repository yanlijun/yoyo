import { Input } from 'antd'
import { Component } from 'react';


class MaxLengthInput extends Component {
  render() {
    const { value, maxLength } = this.props;
    return (
      <Input {...this.props} addonAfter={`${value ? value.length : 0}/${maxLength}`} />
    )
  }
}
export default MaxLengthInput
