const INITIAL_STATE = { microInfo: {}, loading_info: false }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_MICRO_INFO_ATTEMPT':
            return { ...state, loading_info: true }

        case 'GET_MICRO_INFO_SUCCESS':
            return { ...INITIAL_STATE, loading_info: false, microInfo: action.microInfo }


        default:
            return state;
    }
}