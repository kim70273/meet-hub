import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Join from "../routes/Join";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import PasswordReset from "routes/PasswordReset";

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                    </>
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Route exact path="/Join">
                            <Join />
                        </Route>
                        <Route exact path="/PasswordReset">
                            <PasswordReset />
                        </Route>
                    </>

                )}
            </Switch>
        </Router>
    );
}

export default AppRouter;