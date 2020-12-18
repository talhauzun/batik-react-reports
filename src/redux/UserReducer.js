
const UserReducer =(state, action) => {
    const a=action.payload
    switch (action.type) {
        case "set_user":
            return a
        case "Logout":
            return null
        default:
            return state
    }
}
export { UserReducer }