import React, {Component} from 'react'; 
import {notification } from 'antd';
import Header from "./Header"
import Silde from "./Silde"
import '../css/Header.css'

class App extends Component {

  componentDidMount() { 
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

  render() {
    return(
      <div>
        
        <div>
          <Silde title= "唾瓜诗词一首" content="<p>脚皮便秘微博记,恶心大家没脾气,</p>
              <p>百度瓜皮无处寻,忽闻搜狗有其行,</p>
              <p>瓜中自有瓜中手,没皮没脸有没有,</p>
              <p>阿帆阿帆你别怕,咱有逼瓜能活下</p>"></Silde>
        </div>

        <div className="center">
          <Header></Header>
        </div>

        <div>
        <Silde title= "《我唾弃你的瓜，下》" content="<p>新晋实力坑爹新丁，微博状态撼动漕泾,</p>
                      <p>大号小号疯狂加星，谁知却是僵尸为营,</p>

                      <p>知书达理巨大落差，字里行间无不傻叉,</p>
                      <p>美妆服饰锦上添花，买粉博主屎上添瓜,</p>

                      <p>遇上小耿会弹吉他，擦亮双眼赶紧跑吧,</p>
                      <p>探探娇羞晒个烂瓜，天杀喜提接盘大侠,</p>

                      <p>良人百态朝益暮习，智障加V却无压力,</p>（ZZW）
                      <p>颜值身材即是正义，瓜皮躯壳即是垃圾</p>"></Silde>
        </div>

      </div>
    

    );
  }
}

export default App;