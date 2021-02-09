import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: "Hello, how are you???", likesCount: 150},
                {id: 2, message: "Please recall me!!!", likesCount: 3}
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogsData: [
                {id: 1, name: 'Yuriy', profile_picture: "https://avatarfiles.alphacoders.com/792/thumb-79295.jpg"},
                {id: 2, name: 'Egor', profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd3VMIBAKb6kU0Kc656fipMCDwqp-rao8P0g&usqp=CAU"},
                {id: 3, name: 'Genadiy', profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJLl_GAyvK-aBXXFHHcWVZM7ipNgevaMAO4g&usqp=CAU"},
                {id: 4, name: 'Zoryana', profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE7wDpuOow8T7EVb02FRMnRktJMdepHJt7qw&usqp=CAU"},
                {id: 5, name: 'Vitya', profile_picture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-j8SPwUHaiopBhd2EgrzDyIUW0hMguVN2RA&usqp=CAU"}
            ],
            messagesData: [
                {id: 1, message: "Hello, how are you?"},
                {id: 2, message: "Why you still ignoring me?"},
                {id: 3, message: "fuck"}
            ],
            newMessageBody: ""
        }
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer;
    },
    _rerenderEntireTree() {
        console.log("State changed");
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._rerenderEntireTree(this._state);
        }
}

export default store;