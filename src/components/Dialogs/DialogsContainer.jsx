import React from 'react';
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";
import connect from "react-redux/lib/connect/connect";


const DialogsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            { store => {
                let state = store.getState().dialogsPage.dialogsData
                return (
                    <Dialogs store={store} dialogsData={state}/>
                )
        }
    }
    </StoreContext.Consumer>
    )
}

let f1 = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData
    }
}

let f2 = (state) => {
    return {

    }
}


const SuperDialogsContainer = connect(f1, f2)(Dialogs);

export default DialogsContainer;