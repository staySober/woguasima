import React, {Component} from 'react'; 
import { Card, Icon, Avatar } from 'antd';
const { Meta } = Card;



class Header extends Component {
    render() {
        return(
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src={require('../assets/wogua.jpg')}
              />
            }
            actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title="倭瓜画像"
              description="the sb-icon for wogua"
            />
          </Card>
        );
    }
}

export default Header;