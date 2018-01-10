import { Upload, Icon, Modal } from 'antd';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './indexStyle.css'


class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
    imageType: '',
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

 // handleChange = ({ fileList, file }) => console.log({file}) //this.setState({ fileList })

 handleChange = ({fileList, file}) => {
   this.setState({fileList});

   if (file.status === "uploading"){
    //  console.log("UPLOADING");
     this.setState({imageType: "Uploading"})
   } else if (file.status === "done") {
     this.setState({imageType: file.response})
   }
 }

 // handleChange(input, fileList){
    // console.log(input);
    // console.log(input.fileList);
    // this.setState({})
    // this.setState({
    //   fileList: input.fileList
    // })
   // console.log(fileList);
 // }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          name="image"
          action="//localhost:5000/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <div>
            <h1>{this.state.imageType}</h1>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<PicturesWall />, document.getElementById('root'));