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
                {id: 1, name: 'Yuriy'},
                {id: 2, name: 'Egor'},
                {id: 3, name: 'Genadiy'},
                {id: 4, name: 'Zoryana'},
                {id: 5, name: 'Vitya'}
            ],
            messagesData: [
                {id: 1, message: "Hello, how are you?"},
                {id: 2, message: "Why you still ignoring me?"},
                {id: 3, message: "fuck"}
            ]
        },
        dispatch(action) {
            if(action.type === "GET-STATE") {
                return this._state;
            }
            else if(action.type === "RERENDER-ENTIRE-TREE") {
                console.log("State changed");
            }
            else if(action.type === "UPDATE-POST-TEXT") {
                this._state.profilePage.newPostText = action.newText;
                this._rerenderEntireTree(this._state);
            }
            else if(action.type === "ADD-POST") {
                let newPost = {
                    id: 5,
                    message: this._state.profilePage.newPostText,
                    likesCount: 21
                };
                this._state.profilePage.postsData.push(newPost);
                this._state.profilePage.newPostText = '';
                this._rerenderEntireTree(this._state);
            }
            else if(action.type === "SUBSCRIBE") {
                this._rerenderEntireTree = action.observer;
            }
        }
    },
}


window.store = store;

export default store;