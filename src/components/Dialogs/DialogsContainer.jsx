import React from 'react';
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";


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

export default DialogsContainer;