import { Component, PropTypes } from 'react';
import { Select, Input, Row, Col } from 'antd'
import _ from 'lodash'

const Option = Select.Option;
function generateSelectOption(items) {
  return (items || []).map((item) => {
    return <Option value={item.id} key={item.id}>{item.name}</Option>
  })
}

class Location extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  }
  static defaultProps = {
    province: 'province',
    city: 'city',
    area: 'area',
    street: 'street',
  }

  onChange(key, val) {
    const { map } = this.props;
    const { setFields, getFieldValue } = this.props.form;
    const { province, city, area } = this.props;
    if (key === 'province') {
      setFields({ [city]: {
        value: map[val].list[0].id,
      } })
      setFields({ [area]: {
        value: map[val].map[map[val].list[0].id].list[0].id,
      } })
    } else if (key === 'city') {
      // 广东(5)，佛山(26)对应的map无26的key
      const districts = map[getFieldValue(province)].map[val];
      setFields({ [area]: {
        value: districts ? districts.list[0].id : '',
      } })
    }
  }

  render() {
    const { list, map, disabled, required } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsError } = this.props.form;
    if (!list) {
      return null;
    }
    const { province, city, area, street } = this.props;
    let cities = [];
    let listArea = [];
    const provinceValue = getFieldValue(province)
    if (provinceValue) {
      cities = map[provinceValue].list;
      //上面onchange的事件 setField 可能是异步的。所以这里的city可能是null
      if (map[provinceValue].map[getFieldValue(city)]) {
        listArea = map[provinceValue].map[getFieldValue(city)].list;
      }
    }
    const values = _.filter(getFieldsError([province, city, area, street]), (val) => {
      return val;
    })
    const error = values.join('\t');
    return (
      <div className={error ? 'has-error' : ''}>
        <Row>
          <Col span="5" style={{ marginRight: '2px' }}>
            {
              getFieldDecorator(province, {
                rules: required ? [{ required: true, message: '请选择!' }] : [],
                onChange: (val) => {
                  this.onChange('province', val)
                },
              })(
                <Select disabled={disabled} placeholder={'请选择'}>
                  {generateSelectOption(list)}
                </Select>,
              )
            }
          </Col>
          <Col span="5" style={{ marginRight: '2px' }}>
            {
              getFieldDecorator(city, {
                onChange: (val) => {
                  this.onChange('city', val)
                },
              })(
                <Select disabled={disabled} placeholder={'请选择'}>
                  {generateSelectOption(cities)}
                </Select>,
              )
            }
          </Col>
          <Col span="5" style={{ marginRight: '2px' }}>
            {
              getFieldDecorator(area)(
                <Select disabled={disabled} placeholder={'请选择'}>
                  {generateSelectOption(listArea)}
                </Select>,
              )
            }

          </Col>
          <Col span="7">
            {
              getFieldDecorator(street, {
                rules: required ? [{ required: true, message: '请选择!' }] : [],
              })(
                <Input placeholder="详细地址" disabled={disabled} />,
              )
            }
          </Col>
        </Row>
        {error ? <div className="ant-form-explain">{error}</div> : null}
      </div>
    )
  }
}


class LocationForSetValue extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  }
  static defaultProps = {
    province: 'province',
    city: 'city',
    area: 'area',
    street: 'street',
  }

  onChange(key, val) {
    const { map } = this.props;
    const { setFields, getFieldValue } = this.props.form;
    const { province, city, area } = this.props;
    if (key === 'province') {
      setFields({ [city]: {
        value: map[val].list[0].id,
      } })
      setFields({ [area]: {
        value: map[val].map[map[val].list[0].id].list[0].id,
      } })
    } else if (key === 'city') {
      setFields({ [area]: {
        value: map[getFieldValue(province)].map[val].list[0].id,
      } })
    }
  }

  render() {
    const { list, map, disabled, required, initialValue } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsError } = this.props.form;
    if (!list) {
      return null;
    }
    const { province, city, area, street } = this.props;
    let cities = [];
    let listArea = [];
    const provinceValue = getFieldValue(province)
    if (provinceValue) {
      cities = map[provinceValue].list;
      //上面onchange的事件 setField 可能是异步的。所以这里的city可能是null
      if (map[provinceValue].map[getFieldValue(city)]) {
        listArea = map[provinceValue].map[getFieldValue(city)].list;
      }
    }
    const values = _.filter(getFieldsError([province, city, area, street]), (val) => {
      return val;
    })
    const error = values.join('\t');
    return (
      <div className={error ? 'has-error' : ''}>
        <Row>
          <Col span="5" style={{ marginRight: '2px' }}>
            {
              getFieldDecorator(province, {
                initialValue: initialValue.province || undefined,
                rules: required ? [{ required: true, message: '请选择!' }] : [],
                onChange: (val) => {
                  this.onChange('province', val)
                },
              })(
                <Select disabled={disabled} placeholder={'请选择'}>
                  {generateSelectOption(list)}
                </Select>,
              )
            }
          </Col>
          <Col span="5" style={{ marginRight: '2px' }}>
            {
              getFieldDecorator(city, {
                initialValue: initialValue.city || undefined,
                onChange: (val) => {
                  this.onChange('city', val)
                },
              })(
                <Select disabled={disabled} placeholder={'请选择'}>
                  {generateSelectOption(cities)}
                </Select>,
              )
            }
          </Col>
          <Col span="5" style={{ marginRight: '2px' }}>
            {
              getFieldDecorator(area, {
                initialValue: initialValue.area || undefined,
              })(
                <Select disabled={disabled} placeholder={'请选择'}>
                  {generateSelectOption(listArea)}
                </Select>,
              )
            }

          </Col>
          <Col span="7">
            {
              getFieldDecorator(street, {
                initialValue: initialValue.address || undefined,
                rules: required ? [{ required: true, message: '请选择!' }] : [],
              })(
                <Input placeholder="详细地址" disabled={disabled} />,
              )
            }
          </Col>
        </Row>
        {error ? <div className="ant-form-explain">{error}</div> : null}
      </div>
    )
  }
}

export const LocationForSomeValue = LocationForSetValue;
export default Location
