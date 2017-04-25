import { PropTypes, Component } from 'react';
import { Row, Col, Select } from 'antd';
import qs from 'qs';
import request from '../utils/request';

function fetchAgency(params) {
  return new Promise((resolve, reject) => {
    request(`/p/hmp/api/constant/agencys?${qs.stringify(params)}`)
            .then((re) => {
              resolve(re)
            }).catch(reject)
  })
}

const Option = Select.Option;
function generateSelectOptionArea(items) {
  return (items || []).map((item) => {
    return <Option value={item.id} key={item.id}>{item.name}</Option>
  })
}
function generateSelectOptionAgency(items) {
  return (items || []).map((item) => {
    return <Option value={item.mid} key={item.mid}>{item.name}</Option>
  })
}
class SearchServiceAgency extends Component {
  static propTypes = {
    list: PropTypes.array,
    map: PropTypes.object,
    province: PropTypes.string,
    city: PropTypes.string,
    mid: PropTypes.string,
    onChange: PropTypes.func,

  }
  static defaultProps = {
    list: [],
    map: {},
    province: '',
    city: '',
    mid: '',
  }
  state = {
    agencys: [],
  }

  componentWillMount() {
    if (typeof (this.props.city) !== 'undefined' && this.props.city !== '') {
      fetchAgency({ city: this.props.city }).then((re) => {
        this.setState({ agencys: re })
      })
    }
  }

  handleChange = (key, value) => {
    const obj = {
      [key]: value,
    }
    if (key === 'province') {
      obj.city = '';
      obj.mid = ''
    } else if (key === 'city') {
      obj.mid = '';
    }
    if (typeof (obj.city) !== 'undefined' && obj.city !== '' && obj.city !== this.props.city) {
      fetchAgency(obj).then((re) => {
        this.setState({ agencys: re })
      })
    }
    this.props.onChange(obj)
  }

  render() {
    const cities = this.props.province ?
      this.props.map[this.props.province] &&
      this.props.map[this.props.province].list : [];
    return (
      <Row gutter={16}>
        <Col span="8">
          <Select
            showSearch allowClear placeholder={'请选择'} optionFilterProp="children"
            value={this.props.province || undefined} onChange={(val) => {
              this.handleChange('province', val)
            }}
          >
            {generateSelectOptionArea(this.props.list)}
          </Select>
        </Col>
        <Col span="8">
          <Select
            showSearch allowClear placeholder={'请选择'} optionFilterProp="children"
            value={this.props.city || undefined} onChange={(val) => {
              this.handleChange('city', val)
            }}
          >
            {generateSelectOptionArea(cities)}
          </Select>
        </Col>
        <Col span="8">
          <Select
            showSearch allowClear placeholder={'请选择'} optionFilterProp="children"
            value={this.props.mid || undefined} onChange={(val) => {
              this.handleChange('mid', val)
            }}
          >
            {generateSelectOptionAgency(this.state.agencys)}
          </Select>
        </Col>
      </Row>
    )
  }

}

export default SearchServiceAgency;
