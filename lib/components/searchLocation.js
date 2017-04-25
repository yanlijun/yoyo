import { Row, Col, Select } from 'antd';
import { PropTypes } from 'react';

const Option = Select.Option;
function generateSelectOptionArea(items) {
  return (items || []).map((item) => {
    return <Option value={item.id} key={item.id}>{item.name}</Option>
  })
}
function SearchLocation({ list, map, province, city, district, onChange }) {
  function setForm(key, e) {
    const obj = {
      [key]: e.target ? e.target.value : e,
    }
    if (key === 'province') {
      obj.city = '';
      obj.district = ''
    } else if (key === 'city') {
      obj.district = '';
    }
    onChange(obj)
  }

  const cities = province ? map[province] && map[province].list : [];
  const districts = city ? map[province].map[city]
  && map[province].map[city].list : [];
  return (
    <Row>
      <Col span="8">
        <Select
          value={province || ''} onChange={(val) => {
            setForm('province', val)
          }}
        >
          <Option value={''}>请选择</Option>
          {generateSelectOptionArea(list)}
        </Select>
      </Col>
      <Col span="8">
        <Select
          value={city || ''} onChange={(val) => {
            setForm('city', val)
          }}
        >
          <Option value={''}>请选择</Option>
          {generateSelectOptionArea(cities)}
        </Select>
      </Col>
      <Col span="8">
        <Select
          value={district || ''} onChange={(val) => {
            setForm('district', val)
          }}
        >
          <Option value={''}>请选择</Option>
          {generateSelectOptionArea(districts)}
        </Select>
      </Col>
    </Row>
  )
}
SearchLocation.prototype.propTypes = {
  list: PropTypes.array,
  map: PropTypes.object,
  province: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  district: PropTypes.string.isRequired,
  onChange: PropTypes.isRequired,

}
export default SearchLocation;
