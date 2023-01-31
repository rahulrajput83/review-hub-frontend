export default function reducer(state = {
    accessToken: ''
}, action) {
    switch (action.type) {
        case "Login":
            return {
                ...state,
                accessToken: action.payload
            };
        case "Logout":
            return {
                ...state,
                accessToken: ''
            };
        default:
            return state;
    }
}