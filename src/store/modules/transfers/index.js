import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default{
    namespaced:true,
    state(){
        return{
            transfers:[
                {
                    "id": 1,
                    "reference": "P/1001",
                    "from": "Warehouse",
                    "details": [
                        {"product_id":1,"description":"iphone","demand":2,"done":0},
                        {"product_id":2,"description":"book","demand":5,"done":0}
                    ]
                },
                {
                    "id": 2,
                    "reference": "P/1002",
                    "from": "Customer",
                    "details": [
                        {"product_id":3,"description":"tablets","demand":10,"done":0}
                    ]
                }
            ]
        }
    },
    mutations,
    actions,
    getters
}