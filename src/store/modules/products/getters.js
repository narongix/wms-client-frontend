export default{
    products(state){
        return state.products;
    },
    hasProducts(state){
        return state.products && state.products.length>0;
    },
    prodCategories(state){
        return state.prodCategories;
    } 
}