import React, { Component } from "react";
import Chat from 'chat-react';
import { Modal } from 'react-bootstrap';
import { Statistic,message } from 'antd'

class ChatWindow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ws: null,
            UID: '',
            showUserInfo: false,
            messages: [{
                timestamp: 1545925534218,
                userInfo: {
                    avatar: require('../assets/soberhead.png'),
                    name: "系统提示",
                    userId: "123456"
                },
                value: "😀欢迎来到倭瓜司马聊天室, 请大家尽情吐槽~ 可匿名也可实名哦~",
                error: true //设置消息状态为失败，显示错误状态图标
            }],
            showUserName: '',
            avtivePerson: 1,
            init:false,
            showNewLogin:false
        }
    }

    newPersonFlag = true
    // webSocket
    componentDidMount() {
        // 消息推送
        this.websocket = new WebSocket('ws://localhost:8080/msg');
        this.websocket.onopen = function (evt) {
            console.log('open')
        };
        this.websocket.onclose = function (evt) {
            console.log('close')
        };
        var _this = this;
        //todo impl
        this.websocket.onmessage = function (evt) {
            console.log(evt)
            var msg = JSON.parse(evt.data)

            // 信息
            if (msg.isMsg) {
                const { messages = [] } = _this.state;
                if (msg.userInfo.userId === _this.state.UID) {
                    return
                }
                messages.push(msg);
                _this.setState({ messages, timestamp: new Date().getTime(), inputValue: '' });
            }
            //人数
            if (msg.isCount) {
                var count = msg.count
                _this.setState({
                    activePerson: count
                });
            }

            if(!msg.isCount && !msg.isMsg && _this.state.init) {
              //this.props.getWs.getWs.bind(this, this.websocket)
              message.success(msg.name + " 刚刚加入了群聊~ ",5);  
              _this.setState({
                showNewLogin:true
              }) 
            }

            if(_this.state.init && _this.newPersonFlag) {
                console.log(123)
                //将object转成json字符串发送给服务端
                var msg = {
                    name: _this.props.nickName,
                    isCount: false,
                    isMsg: false
                }
                var json = JSON.stringify(msg);
                _this.websocket.send(json)
                _this.newPersonFlag = false;
            }
        };
        this.websocket.onerror = function (evt) {
            //onError(evt) 
            console.log(evt)
        };

        // uid
        this.setState({
            UID: this.uuid(),
            socket: this.websocket,
            init:true
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
        // icon reset true path

        if (v.userInfo.avatar === 'anno1') {
            v.userInfo.avatar = require('../assets/anno1.jpeg')
        }
        if (v.userInfo.avatar === 'anno2') {
            v.userInfo.avatar = require('../assets/anno2.jpeg')
        }
        if (v.userInfo.avatar === 'anno3') {
            v.userInfo.avatar = require('../assets/anno3.jpeg')
        }
        if (v.userInfo.avatar === 'anno4') {
            v.userInfo.avatar = require('../assets/anno4.jpeg')
        }
        messages.push(v);
        this.setState({ messages, timestamp: new Date().getTime(), inputValue: '' });

        // socket
        var msg = {
            timestamp: new Date().getTime(),
            userInfo: {
                avatar: this.props.iconPath === 'anno1' ? require('../assets/anno1.jpeg')
                    : (this.props.iconPath === 'anno2' ? require('../assets/anno2.jpeg') :
                        (this.props.iconPath === 'anno3' ? require('../assets/anno3.jpeg') : require('../assets/anno4.jpeg'))),
                name: this.props.nickName,
                userId: this.state.UID
            },
            value: value,
            isMsg: true,
            isCount: false
        }

        //将object转成json字符串发送给服务端
        var json = JSON.stringify(msg);
        this.websocket.send(json)
    }

    showUserInfo = (e) => {
        //console.log(this.returnCitySN["cip"]+','+this.returnCitySN["cname"])  
        this.setState({
            showUserInfo: true,
            showUserName: e.name,
        })
        var _this = this;
        setTimeout(function () {
            _this.setState({
                showUserInfo: false,
                showUserName: ""
            })
        }, 2000)
    }

    handleClose = (e) => {
        this.setState({ showUserInfo: false });
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
            avatar: this.props.iconPath,
            userId: this.state.UID,
            name: this.props.nickName
        };

        return (

            <div>
                <div className="static-modal">
                    <Modal show={this.state.showUserInfo} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>用户信息</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>用户名: {this.state.showUserName}
                            {this.state.IP}
                        </Modal.Body>
                    </Modal>
                </div>
                <Statistic title="当前在线人数: " value={this.state.activePerson} />
                <Chat
                    ref={el => this.chat = el}
                    className="my-chat-box"
                    dataSource={messages}
                    userInfo={userInfo}
                    value={inputValue}
                    sendMessage={this.sendMessage}
                    timestamp={timestamp}
                    placeholder="请输入"
                    avatarClick={this.showUserInfo}
                    messageListStyle={{ width: '100%', height: window.outerHeight }}
                />
            </div>

        );
    }

}

export default ChatWindow;