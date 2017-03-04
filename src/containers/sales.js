/**
 * Created by Anonmous on 3/4/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { authActions,signOut,missingPersonDetailAction } from '../store/actions/app-action';
import * as MUI from 'material-ui';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Person from 'material-ui/svg-icons/social/person';
import { browserHistory } from 'react-router';
const buttonStyle = { width: '100%' , float:'right'};
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';



class Sales extends Component {

    handleDrawerToggle = (u) => {
    this.props.missingDetail(u);
    browserHistory.push('/missing/'+u.uid);
};

showUsersList(users) {
    if(!users) {
        return [];
    }
    console.log(users);
    return Object.keys(users).reduce(
            (list, uid) => {
            return [
                ...list,
    {
        uid,
    ...users[uid]
    }
];
}, []);

}

render() {

    const mainMenu = (
        <div className='Navbar-Main-Menu'>
        <FlatButton
    label='submited'
    style={buttonStyle}
    onClick={() => browserHistory.push('/crime')}
/>
</div>)

    return (
        <Table>
            <TableHeader displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>Product</TableHeaderColumn>
                    <TableHeaderColumn>Store</TableHeaderColumn>
                    <TableHeaderColumn>Quantity</TableHeaderColumn>
                    <TableHeaderColumn>Price</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody  displayRowCheckbox={false} stripedRows={true}>
                {
                    this.props.sales.isloaded ? this.showUsersList(this.props.sales.salesList).map((sales,id) =>
                                <TableRow key={id}>
                                    <TableRowColumn>{sales.product}</TableRowColumn>
                                    <TableRowColumn>{sales.store}</TableRowColumn>
                                    <TableRowColumn>{sales.quantity}</TableRowColumn>
                                    <TableRowColumn>{sales.price}</TableRowColumn>
                                </TableRow>
                        ) : ''
                }

            </TableBody>
        </Table>
);
}
}

const mapStateToProps = (state) => {
    return { sales: state.salesReducer };
};
//
// const mapDispatchToProps = (d) =>{
//     return {missingDetail:(detail)=>d(missingPersonDetailAction(detail))}
// }
export default connect(mapStateToProps)(Sales);

const styles = {
    donerListContainer: {
        marginLeft: 150,
        marginRight: 150,
        border: 'solid 1px #d9d9d9',
    },
    clear: {
        clear: 'both'
    },

    container: {
        border: 'solid 1px #d9d9d9',

        overflow: 'hidden'
    },

    bottomTear: {
        display: 'block',
        position: 'relative',
        marginTop: -10,
        width: 360
    },
    subHeader :{
        fontWeight:"Bold"
    }
};