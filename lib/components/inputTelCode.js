import { Component, PropTypes } from 'react';
import { Button, Row, Col, Form, message, Modal } from 'antd';
import request from '../../request';
import InputImageCode from './inputImageCode'

/**
 * @type:
 *   create_account: 创建资金账户验证短信
 *   bind_phone:     申请手机绑定的验证码
 *   verify_phone:    验证原手机验证码
 *   withdraw:       申请提现的验证码
 * @api: /api/common/smsverifycode
 * */
/**
 * @type:
 *   modify_password: 修改密码验证短信
 *   reset_password:  重置密码时验证短信
 *   modify_phone:    修改绑定手机验证码
 * @api: /api/partner/smsverifycode
 * */
// bind_phone:申请手机绑定的验证码 withdraw:申请提现的验证码 verify_code:通用的验证码

const SECOND = 5;
const FormItem = Form.Item;
class InputTelCode extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      'create_account', 'bind_phone', 'verify_phone', 'withdraw',
      'modify_password', 'reset_password', 'modify_phone']),
  }
  state = {
    isSending: false,
    second: SECOND,
    visible: false,
    imageValue: '',
    imageKey: 0, //每次都修改下image的key 让他重新生成
    imageError: '', //验证错误
    neeeImageCode: false,
  }
  componentWillUnmount = () => {
    this.onStopTime()
  }

  onSendTelValid = () => {
    if (this.state.neeeImageCode) {
      this.openImageCodeDialog()
    } else {
      this.sendTelCode();
    }
  }
  onStopTime = () => {
    this.setState({
      isSending: false,
    })
    window.clearInterval(this.interVal)
  }
  onOk = () => {
    if (!this.state.imageValue) {
      this.setState({
        imageError: '请输入验证码',
      })
    } else {
      this.sendTelCode()
    }
  }
  onCancel = () => {
    this.setState({
      visible: false,
      imageError: '',
    })
  }
  openImageCodeDialog = () => {
    this.setState({
      visible: true,
      imageValue: '',
      imageKey: this.state.imageKey + 1,
    })
  }
  sendTelCode = async () => {
    const { type, phoneNum } = this.props;
    const { imageValue } = this.state;
    const partnerArr = ['modify_password', 'reset_password', 'modify_phone'];
    let apiType = 'common';
    if (partnerArr.indexOf(type) !== -1) {
      apiType = 'partner';
    }
    this.setState({ isSending: true, second: SECOND })
    this.startTime()
    const self = this;
    try {
      await request(`/p/operate/api/${apiType}/smsverifycode?type=${type}&phone=${phoneNum}&verify_code=${imageValue}`)
      self.onCancel()//关闭
    } catch (e) {
      if (e.context && e.context.result.need_verify_code) {
        self.setState({
          neeeImageCode: true,
        })
        //如果当前有imageCode 就是图片验证错误
        if (self.state.imageValue) {
          self.setState({
            imageError: '验证码错误',
          })
        }
        this.openImageCodeDialog()
      }
      self.onStopTime();
    }
  }
  startTime() {
    const self = this;
    this.interVal = window.setInterval(() => {
      if (self.state.second <= 1) {
        self.setState({ isSending: false })
        self.onStopTime()
      } else {
        self.setState({ second: self.state.second - 1 })
      }
    }, 1000)
  }


  imageChange = (e) => {
    this.setState({
      imageValue: e.target.value,
    })
  }

  render() {
    const { isSending, second, visible, imageValue, imageKey, imageError } = this.state;
    const { phoneNum } = this.props;
    const props = {
      ...this.props,
    }
    delete props.type
    delete props.phoneNum;
    props.value = props.value || ''//如果是undefined 就是uncontrolled 对象了
    return (
      <div>
        <Row>
          <Col span="16">
            <input className="ant-input ant-input-lg" type="text" {...props} />
          </Col>
          <Col span="6" offset="2">
            <Button
              disabled={!phoneNum || isSending}
              onClick={this.onSendTelValid}
            >{isSending ? `重新发送（${second}s）` : '获取验证码'}</Button>
          </Col>
        </Row>
        <Modal onOk={this.onOk} onCancel={this.onCancel} visible={visible} title={'操作频繁，完成图片验证码后继续'}>
          <FormItem label={'图片验证码'} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            <InputImageCode key={imageKey} value={imageValue} onChange={this.imageChange} ref="imageCode" />
          </FormItem>
          {imageError ? <div className="text-danger  ant-col-16 ant-col-offset-6">{imageError}</div> : null}
        </Modal>
      </div>
    )
  }
}
export default InputTelCode
