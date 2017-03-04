/**
 * Created by Anonmous on 3/3/2017.
 */

import React, { Component } from 'react';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import style from './signin.scss';
const buttonStyle = { width: '100%' };
const fieldStyle = { width: '80%' };
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import { connect } from 'react-redux'
import firebase,{ firebaseAuth, firebaseDb} from '../config/firebase';
import store from '../store'
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';




class addReport extends Component {


    // state = {
    //     store:'sdfsd',
    //     product:'sdfsdf'
    // }

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



        function currentDate() {
            return new Date()
        }
        const styles = {
            headline: {
                fontSize: 24,
                paddingTop: 16,
                marginBottom: 12,
                fontWeight: 400,
            },
        };

        function handleActive(tab) {
            alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
        }

        const handleStoreSubmit = (e) => {
            e.preventDefault();
            if(this.props.auth.user == undefined){
                alert('make sure you are login');
                return
            }
            if(this.props.auth.user.role !== 'admin'){
                alert('you are not able to access this feature');
                return
            }
            this.state.uid = this.props.auth.user.uid;
            var data = this.state;
            firebase.database().ref().child('store/').push(
                data
            ).then(function () {
                store.dispatch({
                    type:"FETCHING_DATA"
                });
                alert('store added successfully')
            })
        };
        const handleProductSubmit = (e) => {
            e.preventDefault();
            if(this.props.auth.user == undefined){
                alert('make sure you are login')
                return
            }
            if(this.props.auth.user.role !== 'admin'){
                alert('you are not able to access this feature')
                return
            }

            this.state.uid = this.props.auth.user.uid;
            var data = this.state;
            firebase.database().ref().child('product/').push(
                data
            ).then(function (){
            store.dispatch({
                type:"FETCHING_DATA"
            });
                alert('product added successfully')
            })

        };
        const handlePurchaseSubmit = (e) => {
            console.log(this.state);
            e.preventDefault();
            if(this.props.auth.user == undefined){
                alert('make sure you are login');
                return
            }

            if(this.props.auth.user.role !== 'admin'){
                alert('you are not able to access this feature');
                return
            }

            this.state.uid = this.props.auth.user.uid;
            var data = this.state;
            firebase.database().ref().child('stock/').push(
                data
            ).then(function () {
                store.dispatch({
                    type:"FETCHING_DATA"
                });
                alert('Purchase details added successfully')
            })

        };

        const handleSaleSubmit = (e) => {
            console.log(this.state);
            e.preventDefault();
            if(this.props.auth.user == undefined){
                alert('make sure you are login');
                return
            }

            if(this.props.auth.user.role !== 'admin'){
                alert('you are not able to access this feature');
                return
            }

            this.state.uid = this.props.auth.user.uid;
            var data = this.state;
            firebase.database().ref().child('sales/').push(
                data
            ).then(function () {
                store.dispatch({
                    type:"FETCHING_DATA"
                });
                alert('sales details added successfully')
            })

        };

        let allStoreData = this.props.store.storeList ? Object.keys(this.props.store.storeList).map((key) => { return this.props.store.storeList[key] }) : {};
        if (allStoreData.length > 0) {
            var createMenusForDropDownStore = allStoreData.map((d, i) => {
                return <MenuItem key={i} value={d.name} primaryText={d.name} />
            })
        }

        let allProductData = this.props.product.productList ? Object.keys(this.props.product.productList).map((key) => { return this.props.product.productList[key] }) : {};
        if (allProductData.length > 0) {


            var createMenusForDropDownProduct = allProductData.map((d, i) => {
                return <MenuItem key={i} value={d.name} primaryText={d.name} />
            })
        }


        return (
            <Tabs>
               var _self  = this;
                <Tab label="Add Store" >
                    <div>
                        <div className='Login' style={{ marginLeft: '340px', marginTop: '67px', width: '50%' }}>
                            <Paper className='Login-Panel'>
                                <form style={{ padding: '16px', margin: '0px' }} className='LoginForm' onSubmit={handleStoreSubmit.bind(this)}>
                                    <TextField
                                        floatingLabelText='Name'
                                        name="name"
                                        onChange={({target}) => {
                                            this.setState({ name: target.value })
                                        }}
                                        style={fieldStyle}
                                    />
                                    <TextField
                                        floatingLabelText='location'
                                        name='location'
                                        type='location'
                                        onChange={({target}) => {
                                            this.setState({ location: target.value })
                                        }}
                                        style={fieldStyle}
                                    />
                                    <div className='LoginForm-Submit'>
                                        <RaisedButton
                                            label='SAVE'
                                            primary
                                            type='submit'
                                            style={buttonStyle}
                                        />
                                    </div>
                                </form>
                            </Paper>

                        </div>
                    </div>
                </Tab>
                <Tab label="Add Product" >
                    <div>
                        <div className='Login' style={{ marginLeft: '340px', marginTop: '67px', width: '50%' }}>
                            <Paper className='Login-Panel'>
                                <form style={{ padding: '16px', margin: '0px' }} className='LoginForm' onSubmit={handleProductSubmit}>
                                    <TextField
                                        floatingLabelText='Name'
                                        name="name"
                                        onChange={({target}) => {
                                            this.setState({ name: target.value })
                                        }}
                                        style={fieldStyle}
                                    />
                                    <TextField
                                        floatingLabelText='Manufacture'
                                        name='Manufacture'
                                        type='Manufacture'
                                        onChange={({target}) => {
                                            this.setState({ manufact: target.value })
                                        }}
                                        style={fieldStyle}
                                    />
                                    <TextField
                                        floatingLabelText='Description'
                                        name='Description'
                                        type='Description'
                                        onChange={({target}) => {
                                            this.setState({ des: target.value })
                                        }}
                                        style={fieldStyle}
                                    />

                                    <div className='LoginForm-Submit'>
                                        <RaisedButton
                                            label='SAVE'
                                            primary
                                            type='submit'
                                            style={buttonStyle}
                                        />
                                    </div>
                                </form>
                            </Paper>

                        </div>
                    </div>
                </Tab>
                <Tab label="Add Purchase Detail" >
                    <div>
                        <div className='Login' style={{ marginLeft: '340px', marginTop: '67px', width: '50%' }}>
                            <Paper className='Login-Panel'>
                                <form style={{ padding: '16px', margin: '0px' }} className='LoginForm' onSubmit={handlePurchaseSubmit}>
                                    {   <SelectField
                                        value={this.state ? this.state.store :'store'}
                                     onChange={({target}) => {
                                         this.setState({ store: target.innerHTML })
                                     }}
                                     floatingLabelText="Store"
                                     floatingLabelFixed={true}
                                     hintText="Store"
                                     >
                                     {createMenusForDropDownStore}
                                     </SelectField>}
                                    <SelectField
                                        value={this.state ? this.state.product:'product'}
                                        onChange={({target}) => {
                                            this.setState({ product: target.innerHTML })
                                        }}
                                        floatingLabelText="Product"
                                        floatingLabelFixed={true}
                                        hintText="Product"
                                    >
                                        {createMenusForDropDownProduct}
                                    </SelectField>
                                    <TextField
                                        floatingLabelText='Quantity'
                                        name='Quantity'
                                        type='Quantity'
                                        onChange={({target}) => {
                                            this.setState({ quantity: target.value })
                                        }}
                                        style={fieldStyle}
                                    />
                                    <TextField
                                        floatingLabelText='Price'
                                        name='price'
                                        type='price'
                                        onChange={({target}) => {
                                            this.setState({ price: target.value })
                                        }}
                                        style={fieldStyle}
                                    />
                                    <DatePicker
                                        hintText="Date"
                                        value={this.state ? this.state.date:"Date"}
                                        onChange={(event, date) => {
                                            this.setState({
                                                date: date,
                                            });
                                            }}
                                    />


                                    <div className='LoginForm-Submit'>
                                        <RaisedButton
                                            label='SAVE'
                                            primary
                                            type='submit'
                                            style={buttonStyle}
                                        />
                                    </div>
                                </form>
                            </Paper>

                        </div>
                    </div>
                </Tab>
                <Tab label="Add Sales Detail" >
                    <div>
                        <div className='Login' style={{ marginLeft: '340px', marginTop: '67px', width: '50%' }}>
                            <Paper className='Login-Panel'>
                                <form style={{ padding: '16px', margin: '0px' }} className='LoginForm' onSubmit={handleSaleSubmit}>
                                    {   <SelectField
                                        value={this.state ? this.state.store :'store'}
                                        onChange={({target}) => {
                                            this.setState({ store: target.innerHTML })
                                        }}
                                        floatingLabelText="Store"
                                        floatingLabelFixed={true}
                                        hintText="Store"
                                    >
                                        {createMenusForDropDownStore}
                                    </SelectField>}
                                    <SelectField
                                        value={this.state ? this.state.product:'product'}
                                        onChange={({target}) => {
                                            this.setState({ product: target.innerHTML })
                                        }}
                                        floatingLabelText="Product"
                                        floatingLabelFixed={true}
                                        hintText="Product"
                                    >
                                        {createMenusForDropDownProduct}
                                    </SelectField>
                                    <TextField
                                        floatingLabelText='Quantity'
                                        name='Quantity'
                                        type='Quantity'
                                        onChange={({target}) => {
                                            this.setState({ quantity: target.value })
                                        }}
                                        style={fieldStyle}
                                    />
                                    <TextField
                                        floatingLabelText='Price'
                                        name='price'
                                        type='price'
                                        onChange={({target}) => {
                                            this.setState({ price: target.value })
                                        }}
                                        style={fieldStyle}
                                    />
                                    <DatePicker
                                        hintText="Date"
                                        value={this.state ? this.state.date:"Date"}
                                        onChange={(event, date) => {
                                            this.setState({
                                                date: date,
                                            });
                                        }}
                                    />


                                    <div className='LoginForm-Submit'>
                                        <RaisedButton
                                            label='SAVE'
                                            primary
                                            type='submit'
                                            style={buttonStyle}
                                        />
                                    </div>
                                </form>
                            </Paper>

                        </div>
                    </div>
                </Tab>
            </Tabs>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        store: state.storeReducer,
        product: state.productReducer
    };
}



export default connect(mapStateToProps)(addReport);