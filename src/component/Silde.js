import React, {Component} from 'react'; 
import {notification, Card } from 'antd';
class Silde extends Component {

  render() {
    return(
        <div style={{ background: 'black', padding: '30px' }}>
        <Card title={this.props.title} bordered={false} style={{ width: 300 }}>
            <div dangerouslySetInnerHTML={{__html:this.props.content}}></div>
        </Card>
      </div>
    );
  }
}

export default Silde;