const INITIAL_STATE = { newRegister: [], loading: false }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'NEW_REGISTER_ATTEMPT':
            return { ...state, loading: true }

        case 'NEW_REGISTER_SUCCESS':
            return { ...INITIAL_STATE, newRegister: action.newRegister, loading: false }


        default:
            return state;
    }
}