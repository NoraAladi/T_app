const INITIAL_STATE = { onBoard: [], loading: true }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_BOARD_ATTEMPT':
            return { ...state, loading: true }

        case 'GET_BOARD_SUCCESS':
            return { ...INITIAL_STATE, onBoard: action.onBoard, loading: false }


        default:
            return state;
    }
}