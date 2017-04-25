import { PropTypes } from 'react';
import { Button, Modal } from 'antd';
import { routerRedux } from 'dva/router'

function CallbackButton({ form, dispatch, urlObj }) {
  const onCallBack = () => {
    const { isFieldsTouched } = form;
    if (isFieldsTouched()) {
      Modal.confirm({
        content: '当前内容已经修改，是否离开',
        onOk: () => {
          dispatch(routerRedux.push(urlObj))
        },
      })
    } else {
      dispatch(routerRedux.push(urlObj))
    }
  }
  return (
    <Button onClick={onCallBack} style={{ marginLeft: '8px' }}>返回</Button>
  )
}
CallbackButton.propTypes = {
  form: PropTypes.object.isRequired,
  urlObj: PropTypes.object.isRequired,
}
export default CallbackButton
