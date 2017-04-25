import { Component } from 'react'
import { connect } from 'dva'
import { Checkbox, TimePicker } from 'antd';

const CheckboxGroup = Checkbox.Group;

export default class GroupCheckboxes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedList: props.checkedList || [],
      indeterminate: true,
      checkAll: false,
    }
  }
  onChange = (checkedList) => {
    const { data } = this.props;
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < data.length),
      checkAll: checkedList.length === data.length,
    });
  }
  onCheckAllChange = (e) => {
    const { data } = this.props;
    this.setState({
      checkedList: e.target.checked ? data.map(item => item.value) : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }
  onSubmit = () => {
    return this.state.checkedList
  }

  render() {
    const { title, data } = this.props;
    return (
      <div style={{ marginLeft: '10px', marginBottom: '15px' }}>
        <h6><Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.onCheckAllChange}
          checked={this.state.checkAll}
        >
          {title}
        </Checkbox></h6>
        <div style={{ marginLeft: '20px' }}>
          <CheckboxGroup options={data} value={this.state.checkedList} onChange={this.onChange} />
        </div>
      </div>
    )
  }
}


export class GroupCheckboxesEnchance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedList: props.checkedList || [],
      indeterminate: true,
      checkAll: false,
    }
  }
  onChange = (e) => {
    const { data } = this.props;
    const { checkedList } = this.state;

    const list = checkedList.slice()
    if (e.target.checked) {
      list.push(e.target.value)
    } else {
      const index = list.indexOf(e.target.value);
      list.splice(index, 1);
    }

    this.setState({
      checkedList: list,
      indeterminate: !!list.length && (list.length < data.length),
      checkAll: list.length === data.length,
    });
  }
  onCheckAllChange = (e) => {
    const { data } = this.props;
    this.setState({
      checkedList: e.target.checked ? data.map(item => item.value) : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }
  onSubmit = () => {
    return this.state.checkedList
  }

  render() {
    const { title, data } = this.props;
    const { checkedList } = this.state;
    return (
      <div style={{ marginLeft: '10px', marginBottom: '15px' }}>
        <h6><Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.onCheckAllChange}
          checked={this.state.checkAll}
        >
          {title}
        </Checkbox></h6>
        <div style={{ marginLeft: '20px' }}>
          {data.map((item) => {
            const props = item.props || {};
            return (<Checkbox
              {...props}
              checked={checkedList.indexOf(item.value) > -1} value={item.value}
              key={item.value} onChange={this.onChange}
            >{item.label} {item.enhance || null}</Checkbox>)
          })}
        </div>
      </div>
    )
  }
}
