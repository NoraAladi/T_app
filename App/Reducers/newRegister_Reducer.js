const INITIAL_STATE = { newRegister: [], newRegisterStatus: 0, loading: false }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'NEW_REGISTER_ATTEMPT':
            return { ...state, loading: true }

        case 'NEW_REGISTER_SUCCESS':
            return {
                ...INITIAL_STATE, newRegister: action.newRegister,
                loading: false, newRegisterStatus: action.newRegisterStatus
            }


        default:
            return state;
    }
}