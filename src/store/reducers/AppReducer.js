const INITIAL_STOCK_STATE ={
    isloaded:false,
    isProcessing:false,
    stockList:[]
};

const INITIAL_SALES_STATE ={
    isloaded:false,
    isProcessing:false,
    salesList:[]
};

const INITIAL_PRODUCT_STATE ={
    isloaded:false,
    isProcessing:false,
    productList:[]
};

const INITIAL_STORE_STATE ={
    isloaded:false,
    isProcessing:false,
    storeList:[]
};



export var stockReducer = function (state= INITIAL_STOCK_STATE,action) {
    switch (action.type) {
        case "FETCH_STOCK":
            return Object.assign({}, state, { isloaded: true, stockList: action.payload });
        default:
            return state
    }
};

export var salesReducer = function (state= INITIAL_SALES_STATE,action) {
    switch (action.type) {
        case "FETCH_SALES":
            return Object.assign({}, state, { isloaded: true, salesList: action.payload });
        default:
            return state
    }
};

export var storeReducer = function (state= INITIAL_STORE_STATE,action) {
    switch (action.type) {
        case "FETCH_STORE":
            return Object.assign({}, state, { isloaded: true, storeList: action.payload });
        default:
            return state
    }
};


export var productReducer = function (state= INITIAL_PRODUCT_STATE,action) {
    switch (action.type) {
        case "FETCH_PRODUCT":
            return Object.assign({}, state, { isloaded: true, productList: action.payload });
        default:
            return state
    }
};

