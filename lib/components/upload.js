import { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { getRequestHost } from '../../utils'
import  './upload.less'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class IconUpload extends Component {
  render() {
    const { value, onChange } = this.props;
    const obj = {
      className: 'avatar-uploader',
      name: 'pic',
      showUploadList: false,
      action: `${getRequestHost()}/p/img/weiphoto/upload_pic`,
      // beforeUpload,
      onChange({ file }) {
        if (file.response) {
          onChange(file.response.picid);
        }
      },
    }
    return (
      <div className="shihui-upload">
        <Upload {...obj} >
          {
            value ?
              <img src={value.indexOf('http') > -1 ? value : `http://img.hiwemeet.com/pic/${value}/0`} alt=""
                   className="avatar"/> :
              <Icon type="plus" className="avatar-uploader-trigger"/>
          }
        </Upload>
      </div>
    );
  }
}

export default IconUpload;
