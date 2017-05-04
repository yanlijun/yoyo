import { Button } from 'antd'
import { Component, PropTypes } from 'react'
import { Link } from 'dva/router'
import './accountInfo.less'
import * as utils from '../../utils'
import * as constants from '../../constants'

/**
 * 用户信息，这个是另外是包含数据的
 * @returns {{}}
 * @constructor
 */
function AccountInfo({ model }) {
  if (!model) {
    return null;
  }
  return (
    <div className={'accountInfoContainer'}>
      <div className={'account-balance'}>
        <div className={'account-header'}>
          <div>
            现金账户&nbsp;:&nbsp;
            <span className="text-success">{constants.ACCOUNTSTATUS[model.status]}</span>
          </div>
          <div>
            <span className={'account-balanceMoney'}>
              {utils.moneyFormat(model.bankrollAccount.balance)}
            </span>
            <Button
              className={'pull-right'}
              type="danger" size="small" disabled={model.status !== 1}
            >
              <a href="/statements/charge" target="_blank">充值</a>
            </Button>
          </div>
        </div>
        <div className={'account-content'}>
          <div>可用金额: <span>{utils.moneyFormat(model.bankrollAccount.usable)}</span>元</div>
          <div>
            冻结金额: <span>{utils.moneyFormat(model.bankrollAccount.freeze)}</span>元
            {/*<Link className="pull-right">查看</Link>*/}
          </div>
          <div>
            可提金额: <span>{utils.moneyFormat(model.bankrollAccount.draw)}</span>元
            <Link className="pull-right" to="/statements/withdrawals">提现</Link>
          </div>
        </div>
      </div>
      <div className={'account-card'}>
        <div className={'account-header'}>
          <div>
            提现金额账户&nbsp;:&nbsp;
            <span className="text-success">已绑定</span>
          </div>
          <div >
            收款银行账户：
            <span>{utils.cardFormat(model.bank_card)}</span>
          </div>
        </div>
        <div className={'account-content'}>
          <div>收款银行：<span>{model.bank_name}</span></div>
          <div>开 户 行： <span>{model.bank_branch}</span></div>
          <div>收款银行账户： <span>上海帷米商务信息科技有限公司</span></div>
        </div>
      </div>
      <div className={'account-secure'}>
        <div className={'account-header'}>
          <div>
            账户安全&nbsp;:&nbsp;
            <span className={constants.ACCOUNTSECURITYLEVEL[model.security_level].className}>
              {constants.ACCOUNTSECURITYLEVEL[model.security_level].text}
            </span>
          </div>
          <div >
            <div>
              支付密码 <span>已设置</span>
              <div className="pull-right">
                <Link to="/reset/paypassword">修改密码</Link>&nbsp;&nbsp;&nbsp;
                <Link to="/forget/paypassword">找回密码</Link>
              </div>
            </div>
          </div>
        </div>
        <div className={'account-content'}>
          <div>
            绑定手机号码：<span>{model.phone}</span>
            <Link className="pull-right" to="/reset/phone">修改手机号码</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
AccountInfo.prototype.propTypes = {
  model: PropTypes.object.isRequired,
}
export default AccountInfo
