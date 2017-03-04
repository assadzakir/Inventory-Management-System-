import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../navbar/navbar'


export default class Main extends Component {

    render() {
        return (
            <div>
                <Navbar />
            </div>
        );
    }
}

