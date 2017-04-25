import { Row, Col, Input, InputNumber } from 'antd'
import { Component, PropTypes } from 'react'
import _ from 'lodash';
import { REGEXP } from '../constants'

class Contact extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    tel: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }

  render() {
    const { disabled, name, tel, email, required } = this.props;
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const values = _.filter(getFieldsError([name, tel, email]), (val) => {
      return val;
    })
    const error = values.join('\t');
    return (
      <div className={error ? 'has-error' : ''}>
        <Row>
          <Col span="7" style={{ marginRight: '2px' }}>
            {getFieldDecorator(name, {
              validateTrigger: 'onBlur',
              rules: required ? [{ required: true, message: '请填写联系人！' }] : [],
            })(
              <Input placeholder="姓名" maxLength="5" disabled={disabled} />,
            )}
          </Col>
          <Col span="7" style={{ marginRight: '2px' }}>
            {getFieldDecorator(tel, {
              validateTrigger: 'onBlur',
              rules: [
                { pattern: REGEXP.TEL, message: '联系电话格式不正确！' },
              ].concat(required ? [{ required: true, message: '请填写联系电话！' }] : []),
            })(
              <Input placeholder="电话" maxLength="11" disabled={disabled} />,
            )}
          </Col>
          <Col span="7">
            {getFieldDecorator(email, {
              validateTrigger: 'onBlur',
              rules: [
                { type: 'email', message: '邮箱格式不正确！' },
              ].concat(required ? [{ required: true, message: '请填写联系邮箱！' }] : []),
            })(
              <Input placeholder="邮箱" disabled={disabled} />,
            )}
          </Col>
        </Row>
        {error ? <div className="ant-form-explain">{error}</div> : null}

      </div>
    )
  }
}

export default Contact

