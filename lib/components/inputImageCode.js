import { Component, PropTypes } from 'react';
import { Button, Input, Row, Col } from 'antd';
import fetch from 'dva/fetch';
import request from '../../request';
import { getRequestHost } from '../../utils'

class InputImageCode extends Component {
  state={
    image: '',
  }
  componentDidMount=() => {
    this.getImage();
  }
  getImage=() => {
    const self = this;
    request('/p/operate/api/common/verifycode')
      .then((re) => {
        self.setState({
          image: re.data,
        })
      }).catch((e) => {
        console.log(e)
      })
  }

  render() {
    const { image } = this.state;
    return (
      <Row>
        <Col span="16">
          <Input placeholder="请输入右边的图片验证码" {...this.props} />
        </Col>
        <Col span="5" offset={'1'}>
          <img onClick={this.getImage} style={{ height: 32, cursor: 'pointer' }} src={image} alt="验证码" />
        </Col>
      </Row>
    )
  }
}
export default InputImageCode
