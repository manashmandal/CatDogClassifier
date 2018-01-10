import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DatePicker, message } from 'antd';
import {Button} from 'antd';
import {Upload, Icon} from 'antd';

const Dragger = Upload.Dragger;

const props = {
  name: 'image',
  multiple: true,
  action: '//localhost:5000/upload',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class App2 extends Component {
  render(){
    return (
      <div> APp2 </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ''
    };
  }

  handleChange(date){
    message.info('Selected Date: ' + date.toString());
    this.setState({date});
  }

  render(){
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
          {/*<DatePicker onChange={value => this.handleChange(value)} /> */}

          <Dragger {...props}>
          <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
          </Dragger>

          <div style={{ marginTop: 20 }}>Date: {this.state.date.toString()}</div>
      </div>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('root'));
