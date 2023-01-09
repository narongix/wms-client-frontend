
import axios from "axios";
import router from '../../../router.js';
var hosturl = "http://206.189.150.19:3000";
export default {
    async getProducts(context, params) {

        console.log(params);
        //get local products instead of directly from odoo because of speed

        await axios.get(hosturl+'/product/list',
            {
                headers: {
                    'Authorization': localStorage.accessToken
                }
            }
        ).then(response => {

            context.commit('setProducts', {
                products: response.data
            });
            // router.push('/products');
        })
            .catch(e => {
                const error = new Error(e || 'Cannot retrieve products!');
                throw error;
            })
    },
    async getProdCategories(context, params) {

        console.log(`getProd ${params}`);
    
        await axios.get(hosturl+'/category',
            {
                headers: {
                    'Authorization': localStorage.accessToken
                }
            }
        ).then(response => {
            console.log(`getProd response ${JSON.stringify(response.data)}`);
            // console.log(response.data)
            context.commit('setProdCategories', {
                prodCategories: response.data
            });
    
        })
            .catch(e => {
                const error = new Error(e || 'Cannot retrieve categories!');
                throw error;
            })
    },

    async addProduct(context, payload) {

        const data = {
            'product_name': payload.name,
            'sku': payload.sku,
        }
        const config = {
            headers: { Authorization: `${localStorage.accessToken}` }
        };

        console.log(data)
        console.log(config)
        await axios.post(hosturl+'/product/add', data, config)
            .then(response => {
                console.log(response);
                router.replace('/products')
            })
            .catch(e => {
                const error = new Error(e || 'Cannot add products!');
                throw error;
            })

    },
    async updateProduct(context, payload) {
        console.log(`Payload11111111 ${JSON.stringify(payload)}`)
        const url = hosturl+'/product/' + payload.id
        //transform the fields to match the api fields

        const data = {
        }

        if (payload.name) { data['product_name'] = payload.name; }
        if (payload.sku) { data['sku'] = payload.sku; }


        const config = {
            headers: { Authorization: `Bearer ${localStorage.accessToken}` }
        };

        console.log('url '+url)
        console.log("data: " + JSON.stringify(data))

        // if (Object.keys(payload).length > 0) {
        //     console.log("There is update: " + JSON.stringify(data));
        // }
        //payload only stores the fields that are being updated
        //data storoes the id which is used to find a Product Object

        await axios
            .patch(url, data, config)
            .then(response => {
                console.log(response);
                context.commit('updateProduct', payload);//
            })
            .catch(e => {
                const error = new Error(e || 'Cannot update products!');
                throw error;
            })

    },
    async deleteProduct(context, payload) {
        const url = hosturl+'/product'
        const data = {
            productIds: []
        }

        const headers = {
            Authorization: `Bearer ${localStorage.accessToken}`
        }
        for (var key in payload) {
            var id = payload[key];
            data.productIds.push(id);
            // ...
        }
        console.log(`DELETE BODY: ${JSON.stringify(data)}`);
        await axios
            .delete(url,{data:data,headers})
            .then(response => {
                console.log(response);

            })
            .catch(e => {
                const error = new Error(e || 'Cannot delete products!');
                throw error;
            })

        context.commit('deleteProduct', payload);
    },
    async addProductCategory(context, payload){
        // const data = {
        //     'category_name': payload.name
        // }
        const config = {
            headers: { Authorization: `${localStorage.accessToken}` }
        };
        console.log(payload)
        console.log(config)
        await axios
            .post(hosturl+'/category/add', payload, config)
            .then(response => {
                console.log(response);
                // router.replace('/product-categories');
            })
            .catch(e => {   
                const error = new Error(e || 'Cannot add category!');
                throw error;
            })
    },

    async updateProductCategory({ commit }, { payload }) {
        const url = hosturl+'/category/' + payload.id

        const config = {
            headers: { Authorization: `${localStorage.accessToken}` },
        };

        console.log(url)

        const data={
            "category_name": payload.category_name
        }
        console.log("data: " + JSON.stringify(data))
        console.log("payload: " + JSON.stringify(payload))

        console.log(data)
        await axios 
            .patch(url, data, config)
            .then(response => {
                commit('updateProductCategory', payload);
                console.log(response)
            })
            .catch(e => {
                const error = new Error(e || 'Cannot update category!');
                throw error;
            })
    },

    async deleteProductCategory(context, { payload }) {
        const url = hosturl+'/category'
        const data = {
            productCategoryIds: []
        }
        // console.log("DELETE " + payload)

        const headers = {
            Authorization: `${localStorage.accessToken}`
        }
        for (var key in payload) {
            var id = payload[key];
            data.productCategoryIds.push(id);

        }
        console.log(`DELETE BODY: ${JSON.stringify(data)}`);
        await axios
            .delete(url,{data:data,headers})
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                const error = new Error(e || 'Cannot delete products!');
                throw error;
            })

        context.commit('deleteProductCategory', payload);
    }
}