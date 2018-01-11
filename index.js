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
    imageType: '',
    currentImage: 'https://kaggle2.blob.core.windows.net/competitions/kaggle/3362/media/woof_meow.jpg',
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
     this.setState({currentImage: 'https://loading.io/spinners/bricks/lg.block-rotate-loading-gif.gif'})
   } else if (file.status === "done") {
     this.setState({imageType: file.response})
     this.setState({currentImage: file.thumbUrl})
   } else {
     this.setState({imageType: "Error Occured"})
     this.setState({currentImage: 'http://www.pvhc.net/img142/akjotcylwoyoptqicgjr.png' })
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
      <div className="clearfix container">
      <div className="row">

      <div className="col-md-offset-4 col-xs-offset-4" id="imageCard">
            <Card
              hoverable
              style={{ width: 350 }}
              cover={<img alt="example" src={this.state.currentImage} />}
            >

          <Meta
            title={this.state.imageType}
            description="Cat Dog Classification Result"
          />

          </Card>
      </div>
      </div>

      <div className="row">

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

      </div>
    );
  }
}

ReactDOM.render(<PicturesWall />, document.getElementById('root'));