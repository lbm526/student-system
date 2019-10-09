import React, { Component } from 'react';
import Nav from './page/BottomNav'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                {this.props.children}
                <Nav />
            </div>

        );
    }
}

export default Home;