import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Theme from '../../config/theme'
import './App.css';

import Main from '../main/Main'

class App extends Component {


    render() {
        return (
            <div>
                <Main />
                <br/>
                {this.props.children}
            </div>

        );
    }
}

export default App;
