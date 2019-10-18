import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ajax from '../ajax'
import '../css/appBar.css'

export default class appBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            fTitle: '',
            fText: ''
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.changFTitle = this.changFTitle.bind(this);
        this.changFText = this.changFText.bind(this);
        this.commitContent = this.commitContent.bind(this);
        this.upDateActive = this.upDateActive.bind(this);
        this.getDetailList = this.getDetailList.bind(this);
    }
    componentDidMount() {
        this.props.onRef(this) //2-在子组件 componentDidMount 中把 this 传给父组件
    }
    // 打开模态框
    handleOpen() {
        if (this.props.parenfId) {
            this.getDetailList();
        }
        this.setState({
            open: true,
        })
    }
    // 关闭模态框
    handleClose() {
        this.setState({
            open: false
        })
    }
    // 监听标题
    changFTitle(e) {
        this.setState({
            fTitle: e.target.value
        })
    }
    // 监听内容
    changFText(e) {
        this.setState({
            fText: e.target.value
        })
    }
    // 根据fid查询内容
    getDetailList() {
        var that = this;
        ajax({
            type: "get",
            url: "http://47.102.114.82:19902/bd_activites/selectByPrimaryKey?fId=" + this.props.parenfId,
            dataType: "json",
            beforeSend: function () {
                //some js code 
            },
            success: function (msg) {
                console.log('详情', msg)
                that.setState({
                    fTitle: msg.data.fTitle,
                    fText: msg.data.fText
                })
            },
            error: function () {
                console.log("error")
            }
        })
    }
    // 修改活动信息
    upDateActive() {
        let that = this;
        let option = {
            fTitle: this.state.fTitle,
            fText: this.state.fText,
            fClassID: '',
            fId: this.props.parenfId
        }
        ajax({
            type: "post",
            url: "http://47.102.114.82:19902/bd_activites/update",
            dataType: "json",
            data: {
                data: JSON.stringify(option)
            },
            beforeSend: function () {
                //some js code 
            },
            success: function (msg) {
                console.log(msg)
                that.props.upDateActiveList()
            },
            error: function () {
                console.log("error")
            }
        })
    }
    // 提交
    commitContent() {
        if (this.props.parenfId) {
            this.upDateActive()
        } else {
            let option = { fTitle: this.state.fTitle, fText: this.state.fText, fClassID: '' }
            this.props.comfirmAjax(option);
            this.setState({
                fTitle: '',
                fText: ''
            })
        }
        this.handleClose()
    }
    render() {
        return (
            <div id="appBar">
                <div className={'appBar'}>
                    <AddIcon onClick={this.handleOpen} className={'addIcon'} />
                    <span>活动列表</span>
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={'modalClass'}
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                        <div className={'activePaper textCenter'}>
                            <h4 id="transition-modal-title">{this.props.parentTitle}</h4>
                            {/* {this.props.title === '添加活动' ? <div>aaa</div> : <div>bbb</div>} */}
                            <TextField
                                id="filled-multiline-flexible"
                                label={this.props.parentfTitle}
                                multiline
                                rowsMax="2"
                                fullWidth={true}
                                value={this.state.fTitle}
                                onChange={this.changFTitle}
                                margin="normal"
                            />
                            <TextField
                                id="filled-multiline-flexible"
                                label={this.props.parentfText}
                                multiline
                                rows="6"
                                rowsMax="8"
                                fullWidth={true}
                                value={this.state.fText}
                                onChange={this.changFText}
                                margin="normal"
                            />
                            <div className={'commitButton'}>
                                <Button variant="contained" className={'margin4'} onClick={this.handleClose}>
                                    取消
                                    </Button>
                                <Button variant="contained"
                                    onClick={this.commitContent}
                                    className={'margin4'} color="primary">
                                    提交
                                    </Button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        )
    }
}
