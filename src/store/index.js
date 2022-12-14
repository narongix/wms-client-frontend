import {createStore} from 'vuex';
import createPersistedState from 'vuex-plugin-persistedstate';
import transfersModule from './modules/transfers/index.js';
import productsModule from './modules/products/index.js';
import authModule from './modules/auth/index.js';
const store = createStore({
    plugins:[createPersistedState()],
    modules:{
        transfers:transfersModule,
        products:productsModule,
        auth:authModule
    }
});
export default store;