const ADD_FRIEND = "ADD-FRIEND"
const CANCEL_INVENTATION = "CANCEL-INVENTATION"
const UNFRIEND = "UNFRIEND"

export const addFriendActionCreator = (userId) => ({ type: ADD_FRIEND, userId })
export const cancelInventationActionCreator = (userId) => ({ type: ADD_FRIEND, userId })
export const unfriendActionCreator = (userId) => ({ type: ADD_FRIEND, userId })


let initialState = {
    usersList: [
        {
            id: 1,
            fullname: "Alex Menco",
            age: 29,
            city: "Los Angeles",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://d3b4yo2b5lbfy.cloudfront.net/wp-content/uploads/2019/06/d6a1f2019-CP-Forum-Avatars-TealfulEyes-Kodan.png"
        },
        {
            id: 2,
            fullname: "Boris Gulyaev",
            age: 31,
            city: "Moscow",
            isFriend: true,
            friendInventation: true,
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQecV_20snjsbgZSClHCml7tnMWvSYCD7ojqQ&usqp=CAU"

        },
        {
            id: 3,
            fullname: "Genadiy Bukin",
            age: 42,
            city: "Ekaterinburg",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://i2.wp.com/avatarfiles.alphacoders.com/161/161678.jpg"

        },
        {
            id: 4,
            fullname: "Yuriy Proskyrok",
            age: 54,
            city: "Ekaterinburg",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"

        },

    ]
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_FRIEND:
            return {
                ...state,
                usersList: state.usersList.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendInventation: true}
                    }
                    return u;
                })
            }
        case CANCEL_INVENTATION:
            return {
                ...state,
                usersList: state.usersList.map(u => {
                    if(u.id === action.userId) {
                        return {...u, friendInventation: false}
                    }
                    return u;
                })
            }
        case UNFRIEND:
            return {
                ...state,
                usersList: state.usersList.map(u => {
                    if(u.id === action.userId) {
                        return {...u, isFriend: false, friendInventation: false}
                    }
                    return u;
                })
            }
        default: return state;
    }
}

export default usersReducer;