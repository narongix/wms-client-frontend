export default {
  setProducts(state, payload) {
    state.products = payload.products;
  },
  setProdCategories(state, payload) {
    state.prodCategories = payload.prodCategories;
  },

  deleteProduct(state, payload) {

    state.products = state.products.filter(val => val.id !== payload.id);

    // console.log(`after mod: ${state.products===modifiedProducts}`)
    // console.log(JSON.stringify(modifiedProducts));
  },

  updateProduct(state, payload) {
    let product_name = payload.name;
    let sku = payload.sku;
    let upc = payload.upc;
    const data = {
      id: payload.id,
    }
    if (product_name) { data.product_name = product_name; }
    if (sku) { data.sku = sku; }
    if (upc) { data.upc = upc; }

    /* /////////////////////////////////////////////////////////
    // the field v-model binds to for the vendor's code/sku
    // is sku, but the field used to send or field retrieved
    // from the backend is default_code (straight from Odoo)
    // this is why it's necessary to transform the names 
    /////////////////////////////////////////////////////////*/

    const index = state.products.findIndex(product => product.id == data.id);
    
    if (state.products[index]) {
      state.products[index] = Object.assign(state.products[index], data);
    }
    
    // console.log("AFTER MUTATION"+JSON.stringify(state.products[index]));


  },


  updateProductCategory(state, payload) {
    let category_name = payload.name;
    const data = {
      id: payload.id,
    }
    if (category_name) { data.category_name = category_name; }

    const index = state.prodCategories.findIndex(category => category.id == data.id);

    if (state.prodCategories[index]) {
      state.prodCategories[index] = Object.assign(state.prodCategories[index], data);
    }
  },


  deleteProductCategory(state, payload) {
    // console.log("REEEEEEEEEEEEEE: "+JSON.stringify(state.prodCategories))
    // console.log("payload id: "+ JSON.stringify(payload))
    const index = state.prodCategories.findIndex( e => e.id == payload.id)
    state.prodCategories.splice(index, 1)

  },


}