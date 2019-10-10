import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import '../css/appBar.css'

export default class appBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }
    handleOpen() {
        this.setState({
            open: true
        })
    }
    handleClose() {
        this.setState({
            open: false
        })
    }
    render() {
        return (
            <div id="appBar">
                <div className={'appBar'}>
                    <AddIcon onClick={this.handleOpen} />
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
                            <div className={'paper'}>
                                <h2 id="transition-modal-title">Transition modal</h2>
                                <p id="transition-modal-description">react-transiton-group animates me.</p>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </div>
        )
    }
}
