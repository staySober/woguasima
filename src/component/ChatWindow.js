import React, { Component } from "react";
import Chat from 'chat-react';
import socketIOClient  from 'socket.io-client';

class ChatWindow extends Component {

    
    socket = null

    constructor(props) {
        super(props)
        
        this.state = {
            ws:null,
            UID:"",
            endpoint:"http://localhost:3000/ws"
        }

        this.socket = socketIOClient(this.state.endpoint);
        this.socket.on('connect', () => {
            console.log(this.socket.connected); // true
          });
    }

    
    // webSocket
    componentDidMount() { 
         // uid
         this.setState({
            UID: this.uuid(),
            ws: this.ws
        })
    }

    setInputfoucs = () => {
        this.chat.refs.input.inputFocus();  //set input foucus
    }

    setScrollTop = () => {
        this.chat.refs.message.setScrollTop(1200);  //set scrollTop position
    }

    sendMessage = (v) => {
        const { value } = v;
        if (!value) return;
        const { messages = [] } = this.state;
        messages.push(v);
        this.setState({ messages, timestamp: new Date().getTime(), inputValue: '' });
        
        var msg = {
            timestamp: 1545925494422,
                userInfo: {
                    avatar: "http://img.binlive.cn/1.png",
                    name: this.props.nickName,
                    userId: this.state.UID
                },
                value: value
        }

        //将object转成json字符串发送给服务端
         var json = JSON.stringify(msg);
        // socket推送
        this.socket.emit('msg', json);
        console.log("send")
    }

    uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for
            (var
            i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }

    render() {
        const { inputValue, messages, timestamp } = this.state;
        const userInfo = {
            avatar: "http://img.binlive.cn/6.png",
            userId: this.state.UID,
            name: this.props.nickName
        };
        return (   
                <Chat
                ref={el => this.chat = el}
                className="my-chat-box"
                dataSource={messages}
                userInfo={userInfo}
                value={inputValue}
                sendMessage={this.sendMessage}
                timestamp={timestamp}
                placeholder="请输入"
                messageListStyle={{ width: '100%', height: window.outerHeight}}
            />

        );
    }

}

export default ChatWindow;