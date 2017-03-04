/**
 * Created by Anonmous on 3/4/2017.
 */
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



class Stock extends Component {

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
                        {/*<TableHeaderColumn>Price</TableHeaderColumn>*/}
                    </TableRow>
                </TableHeader>
                <TableBody  displayRowCheckbox={false} showRowHover={true} stripedRows={true}>
                    {
                        this.props.stock.isloaded ? this.showUsersList(this.props.stock.stockList).map((stock,id) =>
                                <TableRow key={id}>
                                    <TableRowColumn>{stock.product}</TableRowColumn>
                                    <TableRowColumn>{stock.store}</TableRowColumn>
                                    <TableRowColumn>{stock.quantity}</TableRowColumn>
                                    {/*<TableRowColumn>{stock.price}</TableRowColumn>*/}
                                </TableRow>
                            ) : ''
                    }

                </TableBody>
            </Table>
        );
    }
}

const mapStateToProps = (state) => {
    return { stock: state.stockReducer };
};
//
// const mapDispatchToProps = (d) =>{
//     return {missingDetail:(detail)=>d(missingPersonDetailAction(detail))}
// }
export default connect(mapStateToProps)(Stock);

