import { Upload, Icon, Modal, Card } from 'antd';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './indexStyle.css'

const { Meta } = Card;



class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    // fileList: [{
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // }],
    imageType: '',
    currentImage: '',
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }


 handleChange = ({fileList, file}) => {
   console.log(file);
   this.setState({fileList});

   if (file.status === "uploading"){
     this.setState({imageType: "Uploading"})
   } else if (file.status === "done") {
     this.setState({imageType: file.response})
     this.setState({currentImage: file.thumbUrl})
   }
 }



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
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={this.state.currentImage} />}
        >

      <Meta
        title={this.state.imageType}
        description="Cat Dog Classification Result"
      />

        </Card>

        <Upload
          name="image"
          action="//localhost:5000/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          multiple={false}
        >
          {uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<PicturesWall />, document.getElementById('root'));