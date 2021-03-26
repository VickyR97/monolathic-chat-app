import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Chat from "../pages/chat/Chat";
import Join from "../pages/join/Join";
function Routes() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Join} />
                    <Route path="/chat" component={Chat} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes
