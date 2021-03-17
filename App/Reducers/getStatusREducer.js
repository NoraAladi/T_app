const INITIAL_STATE = { healthStatus: false }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_STATUS_ATTEMPT':
            return { ...state }

        case 'GET_STATUS_SUCCESS':
            return { ...INITIAL_STATE, healthStatus: action.healthStatus }


        default:
            return state;
    }
}