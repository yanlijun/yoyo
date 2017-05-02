import { PropTypes, Component } from 'react';
import { Button, Modal, Input, Row, Col, Tabs } from 'antd';
import { routerRedux } from 'dva/router'
import _ from 'lodash'
import request from '../../request'
import style from './bankInput.less'

const TabPane = Tabs.TabPane;
let commonBanks;
let charBanks
function getCommonBanks() {
  return new Promise((resolve, reject) => {
    if (commonBanks) {
      resolve(commonBanks)
    } else {
      request('/p/operate/api/common/banklist?type=1')
        .then((re) => {
          commonBanks = re;
          resolve(commonBanks)
        }).catch(reject)
    }
  })
}
function getCharBanks(char) {
  return new Promise((resolve, reject) => {
    if (charBanks) {
      resolve(_.filter(charBanks, (item) => {
        return item.first_char === char;
      }))
    } else {
      request('/p/operate/api/common/banklist?type=2')
        .then((re) => {
          charBanks = re;
          resolve(_.filter(charBanks, (item) => {
            return item.first_char === char;
          }))
        }).catch(reject)
    }
  })
}
function generateChar() {
  let startIndex = 97;
  const arr = [];
  while (startIndex < 122) {
    arr.push(String.fromCharCode(startIndex).toUpperCase());
    startIndex++;
  }
  return arr;
}
class BankInput extends Component {
  static propTypes = {
    bankCode: PropTypes.string.isRequired,
    bankBranch: PropTypes.string.isRequired,
    bankName: PropTypes.string.isRequired,
  }
  static defaultProps = {
    bankCode: 'bankCode',
    bankName: 'bankName',
    bankBranch: 'bankBranch',
  }

  static contextTypes={
    form: PropTypes.object,
  }
  state = {
    visible: false,
    commonBanks: null,
    currentChar: 'A',
    charBanks: null,
  }
  onOk = () => {
    this.setState({ visible: false })
    const { bankCode, bankName } = this.props;
    if (this.state.newCurrent) {
      this.context.form.setFieldsValue({
        [bankCode]: this.state.newCurrent.code,
        [bankName]: this.state.newCurrent.name,
      });
    }
  }
  onShowModal = () => {
    const self = this;
    this.setState({ visible: true })
    if (!this.state.commonBanks) {
      getCommonBanks().then((re) => {
        self.setState({ commonBanks: re })
      })
    }
    //将form 的bankcode 传入内部中
    const { bankCode, bankName } = this.props;
    const { getFieldValue } = this.context.form;
    const currentCode = getFieldValue(bankCode);
    const currentName = getFieldValue(bankName);
    if (currentCode) {
      this.setState({ newCurrent: {
        code: currentCode,
        name: currentName,
      } })
    }
  }
  onShowCharList = () => {
    const self = this;
    this.setState({ visible: true })

    if (!this.state.charBanks) {
      //默认取A值
      getCharBanks(self.state.currentChar).then((re) => {
        self.setState({ charBanks: re })
      })
    }
  }
  setNewCurrent = (item) => {
    this.setState({ newCurrent: item })
  }
  charFilterData=(char) => {
    const self = this;
    //默认取A值
    getCharBanks(char).then((re) => {
      self.setState({ charBanks: re, currentChar: char })
    })
  }
  render() {
    const self = this;
    const { bankBranch, bankCode, bankName, required } = this.props;

    const { commonBanks, charBanks, newCurrent, currentChar } = this.state;
    const { getFieldValue, getFieldDecorator, getFieldsError, getFieldError } = this.context.form;

    //必须要先注册下
    getFieldDecorator(bankCode, {
      rule: [
        required && { required: true, message: '请选择收款银行' },
      ],
    })

    getFieldDecorator(bankName)
    const currentCode = getFieldValue(bankCode);
    const currentName = getFieldValue(bankName)
    //todo: 加上验证的help
    const errors = getFieldsError([bankBranch])
    let error;
    return (
      <div className={error ? 'has-error' : ''}>
        <Row>
          <Col span="12">
            <Button onClick={this.onShowModal}>{currentCode ? currentName : '请选择'}</Button>
          </Col>
          <Col span="12">
            {getFieldDecorator(bankBranch, {
              rule: [
                required && { required: true, message: '请输入支行或者分行名称' },
              ],
            })(
              <Input placeholder="请输入支行或者分行名称" />,
            )}

          </Col>
        </Row>
        {error ? <div>
          {error}
        </div> : null}
        <Modal
          onCancel={() => {
            this.setState({ visible: false })
          }} onOk={this.onOk} visible={this.state.visible} title={<h4 style={{ fontSize: '14px' }}>选择银行 <span
            style={{ fontSize: '10px', color: '#999' }}
          >请选择您的收款银行</span></h4>} closable={false}
        >
          <Tabs onTabClick={this.onShowCharList}>
            <TabPane tab="常用银行" key="1">
              <ul className={style.bankList}>
                {(commonBanks || []).map((item) => {
                  return (
                    <li
                      onClick={() => {
                        self.setNewCurrent(item)
                      }} key={item.code} className={newCurrent && item.code === newCurrent.code ? 'active' : ''}
                    >
                      <span >{item.name}</span>
                    </li>
                  )
                })}
              </ul>
            </TabPane>
            <TabPane tab="其他银行" key="2">
              <div className={style.charList}>
                {
                  generateChar().map((item) => {
                    return (<a
                      key={item} className={currentChar === item ? 'active' : ''} onClick={() => {
                        self.charFilterData(item);
                      }
                    }
                    >{item}</a>)
                  })
                }
              </div>
              <ul className={style.bankList}>
                {(charBanks || []).map((item) => {
                  return (
                    <li
                      onClick={() => {
                        self.setNewCurrent(item)
                      }} key={item.code} className={newCurrent && item.code === newCurrent.code ? 'active' : ''}
                    >
                      <span>{item.name}</span>
                    </li>
                  )
                })}
              </ul>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default BankInput
