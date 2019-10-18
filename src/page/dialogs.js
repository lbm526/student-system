import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import '../css/dialogs.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class dialogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            path: '/#/Activity'
        };
        this.singUp = this.singUp.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    componentDidMount() {
        document.title = '活动列表'
        this.props.onRef(this) //2-在子组件 componentDidMount 中把 this 传给父组件
    }
    // 打开模态框
    openDialog() {
        this.setState({
            open: true
        })
    }

    // 报名
    singUp() {
        this.props.singUp()
    }
    // 关闭模态框
    handleClose() {
        document.title = '活动列表'
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
                <AppBar>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <div className={'singUpContain'}>
                            <Button color="inherit" onClick={this.singUp}>
                                报名
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={'marginTop56'}>
                    {this.props.children}
                </div>
            </Dialog>
        )
    }
}

export default dialogs;