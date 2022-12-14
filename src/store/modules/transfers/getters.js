export default{
    transfers(state){
        console.log("GETTERS" + JSON.stringify(state.transfers))
        return state.transfers;
    },
    hasTransfers(state){
        return state.transfers && state.transfers.length>0;
    }
}