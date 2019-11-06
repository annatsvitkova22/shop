export default function (state = null, action) {
    switch (action.type) {
        case "ADD_AUTHOR":
            return action.payload;
            break;
        default:
            return state;
    }
}