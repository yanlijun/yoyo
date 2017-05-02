import { Component, PropTypes } from 'react';
import { Form, Row, Col, Select, Input, Button, Table, Modal } from 'antd';
import { generateSelectOptionByName } from '../../utils'
import styles from './serviceListModal.less'

const Option = Select.Option;
const Column = Table.Column;
class ServiceListModal extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    visible: PropTypes.bool,
    onChoice: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired,
  }

  state = {
    form: {},
  }


  onChoice = (record) => {
    this.props.onChoice(record, this.props);
  }

  onSearch = () => {
    this.props.onSearch(this.state.form);
  }
  setForm(key, value) {
    const form = {
      ...this.state.form,
    }
    form[key] = value.target ? value.target.value : value
    this.setState({
      form,
    })
  }
  closeModal = () => {
    this.props.onCloseModal();
  }

  render() {
    const { base, data, visible, cityList, title } = this.props;
    const prov = base.province.value;
    const city = base.city.value;
    let districts = [];
    if (prov && city) {
      districts = cityList[prov].map[city].list;
    }

    return (
      <Modal
        visible={visible} title={title} onOk={this.closeModal} onCancel={this.closeModal}
        width="80%" style={{ minWidth: 600, maxWidth: 800 }}
      >
        <div className={styles.formSearch}>
          <Form>
            <Row>
              <Col span="3">
                <Select value={this.state.form.districts || ''} onChange={this.setForm.bind(this, 'districts')}>
                  <Option value={''}>请选择</Option>
                  {generateSelectOptionByName(districts)}
                </Select>
              </Col>
              <Col span="8" style={{ marginLeft: 10 }}>
                <Input value={this.state.form.query} onChange={this.setForm.bind(this, 'query')} />
              </Col>
              <Col span="8" style={{ marginLeft: 10 }}>
                <Button
                  type="primary" onClick={this.onSearch}
                >查询</Button>
              </Col>
            </Row>
          </Form>
        </div>

        <div className={styles.formTable}>
          <Table dataSource={data} rowKey="id">
            <Column width="15%" key="id" dataIndex="id" title="小区ID" />
            <Column width="15%" key="name" dataIndex="name" title="小区名称" />
            <Column width="60%" key="address" dataIndex="address" title="小区地址" />
            <Column
              width="10%"
              key="action" dataIndex="action" title="操作" render={(text, record) => {
                return (
                  <a
                    onClick={() => {
                      this.onChoice(record);
                    }}
                  >选择</a>
                )
              }}
            />
          </Table>
        </div>
      </Modal>
    )
  }
}

export default ServiceListModal;
