import { DatePicker } from 'antd';
import { PropTypes } from 'react';

const { RangePicker } = DatePicker;

function SearchRangePicker({ start, end, model, onChange }) {
  const value = [model[start], model[end]];
  return (
    <RangePicker
      value={value} onChange={(dates) => {
        onChange({
          [start]: dates[0],
          [end]: dates[1],
        })
      }}
    />
  )
}
SearchRangePicker.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
SearchRangePicker.defaultProps = {
  start: 'start_time',
  end: 'end_time',
}
export default SearchRangePicker;
