import React, { Component, PropTypes } from 'react';
import Script from 'react-load-script'
import { Input, Row, Col, Select, Button, Modal } from 'antd';

const Option = Select.Option;
let baiduScriptHasLoad = false;
function handleScriptError() {
  throw new Error('导入百度地图失败');
}
/*eslint-disable */
class BaiduMap extends Component {
  state = {
    address: '',
    point: {},
  }

  componentDidMount() {
    if (baiduScriptHasLoad) {
      this.bindBaiduMapToElement()
    }
  }


  handleScriptLoad() {
    const self = this;
    window.initBaiduMap = function () {
      console.log('initBaiduMap')
      baiduScriptHasLoad = true;
      self.bindBaiduMapToElement.bind(self)()
    }
  }

  setFormFromMapClick = (point) => {
    const geoc = new BMap.Geocoder();
    const self = this;
    geoc.getLocation(point, (rs) => {
      self.setState({
        point: rs.point,
        address: rs.address
      })
    });
  }


  setForm(key, value) {
    this.setState({
      [key]: value.target ? value.target.value : value,
    })
  }

  bindBaiduMapToElement = () => {
    const self = this;
    const map = new BMap.Map('allmap');
    const point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);
    map.addEventListener('click', (e) => {
      self.setFormFromMapClick(e.point)
    });
    self.map = map;
  }

  onSearch = () => {
    const geoc = new BMap.Geocoder();
    const self = this;
    if (!this.map) {
      alert('等待地图加载');
    }
    const map = this.map;
    geoc.getPoint(this.state.address, (point) => {
      if (point) {
        self.setFormFromMapClick(point)
        map.centerAndZoom(point, 16);
        map.addOverlay(new BMap.Marker(point));
      } else {
        alert('您选择地址没有解析到结果!');
      }
    }, this.state.city);
  }

  render() {
    const {address, point} = this.state;
    const {lat, lng} = point;
    return (
      <div>
        <Row>
          <Col span="2" style={{textAlign: 'left', lineHeight: '25px'}}><label htmlFor="address">位置：</label></Col>
          <Col span="12">
            <Input.Search onSearch={this.onSearch} value={address} onChange={this.setForm.bind(this, 'address')}
                          id="address"
                          placeholder="请输入地理地址"/>
          </Col>
        </Row>
        <div>
          {lat ? <div><span>维度：{lat}</span>&nbsp;&nbsp;<span>经度：{lng}</span></div> : <span>请选择</span>}
        </div>
        <Script
          url="http://api.map.baidu.com/api?v=2.0&ak=qEGGsoZAjRjwwTyw3pjBiuk59NfMlPw7&callback=initBaiduMap"
          onLoad={this.handleScriptLoad.bind(this)} onError={handleScriptError}
        />
        <div id="allmap" style={{width: '100%', height: '500px', marginTop: '10px'}}/>
      </div>
    )
  }
}


export default class PointInput extends Component {
  state = {
    visible: false,
  }
  onOpenModal = () => {
    this.setState({
      visible: true
    })
  }
  onCloseModal = () => {
    this.setState({
      visible: false
    })
  }

  onSubmit = () => {
    let point = this.refs.map.state.point;
    const {onChange} = this.props;
    onChange(point);
    this.setState({
      visible: false
    })
  }

  render() {
    const {value} = this.props;
    const lng = value.lng || '';
    const lat = value.lat || '';
    return (
      <div>
        <Input value={lat ? lat + 'x' + lng : ''} disabled={true}/>
        <Button onClick={this.onOpenModal} style={{
          position: 'absolute',
          top: -1,
          right: -90,
        }}>地图查询</Button>
        <Modal visible={this.state.visible} title="地图查询" onCancel={this.onCloseModal} onOk={this.onSubmit}>
          <BaiduMap ref="map"/>
        </Modal>
      </div>
    )
  }
}
export const PointRequired = {
  validator(rule, value, callback) {
    if (!value.lng) {
      callback(new Error('请选择经纬度!'))
    } else {
      callback();
    }
  },
}
