import React, {Component} from 'react'; 
import {notification,Input} from 'antd';
import Header from "./Header"
import Silde from "./Silde"
import Chat from "./ChatWindow"
import '../css/Header.css'
import {Row, Col, Modal, Button} from 'react-bootstrap'

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: true,
      nickName: "匿名用户"
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() { 

  }

  handleClose() {
    this.setState({ show: false});
    notification.open({
      message: 'FBI WARNING!',
      description:
      '未满18周岁禁止访问, 此站竭力为吐槽狗男女, 倭瓜精的联盟盟友提供树洞服务, 如有侵权, 恕我眼瞎',
      duration: 5,
      style:{'color':'#ff0000'},
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

  setName =(event) => {
    this.setState({
      nickName: event.target.value
    })
  }

  render() {
    return(
        <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>倭瓜聊天室</Modal.Title>
            </Modal.Header>
            <Modal.Body>请输入您的昵称:
              <br/>
              <Input onChange={this.setName} defaultValue={this.state.nickName}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
                      </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Save Changes
                      </Button>
            </Modal.Footer>
          </Modal>

          <Row className='show-grid'>
            <Col xs={8} md={3} className='Col'>
            <Silde title= "唾瓜诗词一首" content="<p>脚皮便秘微博记,恶心大家没脾气,</p>
                  <p>百度瓜皮无处寻,忽闻搜狗有其行,</p>
                  <p>瓜中自有瓜中手,没皮没脸有没有,</p>
                  <p>阿帆阿帆你别怕,咱有逼瓜能活下</p>"></Silde>

            <Silde title= "《我唾弃你的瓜，下》" content="<p>新晋实力坑爹新丁，微博状态撼动漕泾,</p>
                                  <p>大号小号疯狂加星，谁知却是僵尸为营,</p>

                                  <p>知书达理巨大落差，字里行间无不傻叉,</p>
                                  <p>美妆服饰锦上添花，买粉博主屎上添瓜,</p>

                                  <p>遇上小耿会弹吉他，擦亮双眼赶紧跑吧,</p>
                                  <p>探探娇羞晒个烂瓜，天杀喜提接盘大侠,</p>

                                  <p>良人百态朝益暮习，智障加V却无压力,</p>（ZZW）
                                  <p>颜值身材即是正义，瓜皮躯壳即是垃圾</p>"></Silde>
                    </Col>
            
            <Col xs={4} md={3} className='Col'>
              <div className="center">
                <Header></Header>
              </div>
            </Col>
            <Col xs={12} md={6}>
                <Chat nickName= {this.state.nickName}></Chat>
            </Col>
          </Row>
        </div>
    );
  }
}

export default App;