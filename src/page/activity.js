import React, { Component } from 'react';
import AppBar from './appBar'
import ajax from '../ajax'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import '../css/activity.css'
import Dialog from './dialogs'
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class activity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            title: '添加活动',
            fTitle: '活动标题',
            fText: '活动内容',
            parenfId: '',
            activeInit: [],
            detailText: {},
            student: [],
            singUpName: '',
            singUpNameOpen: false,
            dense: false,
            path: '/#/Activity'
        }
        this.comfirmAjax = this.comfirmAjax.bind(this);
        this.getActiveList = this.getActiveList.bind(this);
        this.deleteContent = this.deleteContent.bind(this);
        this.openDetail = this.openDetail.bind(this);
        this.getStudentList = this.getStudentList.bind(this);
        this.changSingUpName = this.changSingUpName.bind(this);
        this.singUpNameOpens = this.singUpNameOpens.bind(this);
        this.singUpNameClose = this.singUpNameClose.bind(this);
        this.commitSingUp = this.commitSingUp.bind(this);
        this.deleteSingUp = this.deleteSingUp.bind(this);
    }
    componentDidMount() {
        let lparams = this.props.match.params;
        if(lparams.hasOwnProperty('fId')){
            this.openDetail(lparams.fId)
        }
        this.getActiveList()
    }
    componentDidUpdate(prevProps, prevState) {
        // 如果数据发生变化，则更新图表
        if (prevState.detailText !== this.state.detailText) {
            this.setState({
                student: []
            })
            this.getStudentList(this.state.detailText)
        }
    }
    // 获取活动数据
    getActiveList() {
        let that = this;
        ajax({
            type: "get",
            url: "http://47.102.114.82:19902/bd_activites/getlist",
            dataType: "json",
            data: {
            },
            beforeSend: function () {
                //some js code 
            },
            success: function (msg) {
                console.log('活动列表', msg)
                let data = msg.rows;
                that.setState({
                    activeInit: data
                })
            },
            error: function () {
                console.log("error")
            }
        })
    }

    // 根据fid查询内容
    getDetailList(fId) {
        var that = this;
        ajax({
            type: "get",
            url: "http://47.102.114.82:19902/bd_activites/selectByPrimaryKey?fId=" + fId,
            dataType: "json",
            beforeSend: function () {
                //some js code 
            },
            success: function (msg) {
                console.log('详情', msg)
                document.title = msg.data.fTitle; //改变页面标题
                that.setState({
                    detailText: msg.data,
                })
            },
            error: function () {
                console.log("error")
            }
        })
    }

    // 增加活动
    comfirmAjax(option) {
        let that = this;
        if (option.fTitle == '' && option.fText == '') {
            return false
        }
        ajax({
            type: "post",
            url: "http://47.102.114.82:19902/bd_activites/create",
            dataType: "json",
            data: {
                data: JSON.stringify(option)
            },
            beforeSend: function () {
                //some js code 
            },
            success: function (msg) {
                that.getActiveList()
                that.setState({
                    open: false
                })
            },
            error: function () {
                console.log("error")
            }
        })
    }
    // 删除内容
    deleteContent(e, fId) {
        let that = this;
        if (!fId) {
            return false
        }
        ajax({
            type: "get",
            url: "http://47.102.114.82:19902/bd_activites/delete?fId=" + fId,
            dataType: "json",
            beforeSend: function () {
                //some js code 
            },
            success: function (msg) {
                that.getActiveList()
            },
            error: function () {
                console.log("error")
            }
        })
        e.stopPropagation()
    }

    // 打开详情页
    // setState是异步的
    // 每次更改不一定刷新，所以获取是之前的值
    // 使用回调函数解决
    openDetail(fId) {
        let path = this.state.path;
        let parmas = path.substring(path.lastIndexOf('/') + 1);
        if (fId !== parmas) {
            this.props.history.push({
                pathname: path + '/' + fId
            })
        }
        this.getDetailList(fId);
        this.child.openDialog();
    }

    // 调用dialogs子组件的方法
    onRef = (ref) => {
        this.child = ref
    }

    // 获取已报名名单
    getStudentList(fActiviteID) {
        let that = this;
        ajax({
            type: "get",
            url: "http://47.102.114.82:19902/bd_activites_apply/getlist?fActiviteID=" + fActiviteID.fId,
            dataType: "json",
            data: {
            },
            beforeSend: function () {
                //some js code 
            },
            success: function (msg) {
                console.log('已报名名单', msg);
                that.setState({
                    student: msg.rows
                })
            },
            error: function () {
                console.log("error")
            }
        })
    }

    // 更新报名文本
    changSingUpName(e) {
        this.setState({
            singUpName: e.target.value
        })
    }

    // 打开报名框
    singUpNameOpens() {
        this.setState({
            singUpNameOpen: true
        })
    }
    // 关闭报名框
    singUpNameClose() {
        this.setState({
            singUpNameOpen: false
        })
    }

    // 提交报名
    commitSingUp() {
        let fApplyTitle = this.state.singUpName;
        let fActiviteID = this.state.detailText.fId;
        let that = this;
        let option = {
            fApplyTitle,
            fActiviteID
        }
        ajax({
            type: "post",
            url: "http://47.102.114.82:19902/bd_activites_apply/create",
            dataType: "json",
            data: {
                data: JSON.stringify(option)
            },
            beforeSend: function () {
                //some js code 
            },
            success: function (msg) {
                that.getStudentList(that.state.detailText);
                that.setState({
                    singUpNameOpen: false,
                    singUpName: ''
                })
            },
            error: function () {
                console.log("error")
            }
        })
    }

    // 删除报名
    deleteSingUp(fId) {
        let that = this;
        ajax({
            type: "get",
            url: "http://47.102.114.82:19902/bd_activites_apply/delete?fId=" + fId,
            dataType: "json",
            beforeSend: function () {
                //some js code 
            },
            success: function (msg) {
                that.getStudentList(that.state.detailText);
            },
            error: function () {
                console.log("error")
            }
        })
    }
    AppBar = (ref) => {
        this.AppBarchild = ref
    }
    // 修改活动
    upDateContent(e, fId) {
        e.stopPropagation()
        this.setState({
            parenfId: fId,
            title: '修改活动'
        }, () => this.AppBarchild.handleOpen())

    }

    render() {
        return (
            <div>
                <AppBar comfirmAjax={this.comfirmAjax}
                    parentTitle={this.state.title}
                    parentfTitle={this.state.fTitle}
                    parentfText={this.state.fText}
                    parenOpen={this.state.open}
                    parenfId={this.state.parenfId}
                    onRef={this.AppBar}
                    upDateActiveList={this.getActiveList}
                />
                <div className={'listPaper'}>
                    {this.state.activeInit.map((number, i) => {
                        return (
                            <Paper key={i} className={'listItem'} onClick={() => this.openDetail(number.info.fId)}>
                                <Typography variant="h5" component="h3" className={'textCenter'}>
                                    {number.info.fTitle}
                                </Typography>
                                <div className={'marginTop10'}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography component="p" className={'activeConten'}>
                                                活动内容：{number.info.fText}
                                            </Typography>
                                            <Typography component="p">
                                                发布时间：{number.info.fUpDateTime}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} container alignItems='center' justify="center" style={{ display: 'flex' }} >
                                            <Button variant="outlined" color="secondary"
                                                onClick={(e) => this.deleteContent(e, number.info.fId)}
                                                className={'margin4'}>
                                                删除
                                            </Button>
                                            <Button variant="outlined" color="primary"
                                                onClick={(e) => this.upDateContent(e, number.info.fId)}
                                                className={'margin4'}
                                            >
                                                修改
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Paper>
                        )
                    }
                    )}
                </div>
                {/* 全屏模态框 */}
                <Dialog onRef={this.onRef} singUp={this.singUpNameOpens} {...this.props}>
                    <Card className={'card'}>
                        <CardContent>
                            <Typography style={{ textAlign: 'center' }} variant="h5" component="h2">
                                {this.state.detailText.fTitle}
                            </Typography>
                            <Typography className={'marginTop10'} color="textSecondary" gutterBottom>
                                {this.state.detailText.fText}
                            </Typography>
                        </CardContent>
                    </Card>
                    <div className={'marginTop10'}>
                        <List dense={this.state.dense}>
                            {
                                this.state.student.map((child, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <ListItem>
                                                <ListItemText
                                                    primary={(index + 1) + '.' + child.info.fApplyTitle}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton color="secondary" edge="end" aria-label="delete" onClick={() => this.deleteSingUp(child.info.fId)}>
                                                        <DeleteForeverOutlinedIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider />
                                        </React.Fragment>
                                    )
                                })
                            }
                        </List>
                    </div>
                </Dialog>

                {/* 报名弹框 */}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={'modalClass'}
                    open={this.state.singUpNameOpen}
                    onClose={this.singUpNameClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.singUpNameOpen}>
                        <div className={'paper textCenter'}>
                            <h4 id="transition-modal-title">{this.props.parentTitle}</h4>
                            <TextField
                                id="filled-multiline-flexible"
                                label='报名信息'
                                multiline
                                rowsMax="4"
                                fullWidth={true}
                                value={this.state.singUpName}
                                onChange={this.changSingUpName}
                                margin="normal"
                            />
                            <div className={'commitButton'}>
                                <Button variant="contained" className={'margin4'} onClick={this.singUpNameClose}>
                                    取消
                                    </Button>
                                <Button variant="contained"
                                    onClick={this.commitSingUp}
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


export default activity