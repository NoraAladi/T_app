const INITIAL_STATE = { MyOrder: [], loading: true, totalPages:1 }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_MyOrder_ATTEMPT':
            return { ...state, loading: true }

        case 'GET_MyOrder_SUCCESS':
            return {
                ...INITIAL_STATE,
                MyOrder: action.MyOrder,
                loading: false,
                totalPages: action.totalPages
            }


        default:
            return state;
    }
}