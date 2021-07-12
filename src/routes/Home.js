import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
    const history = useHistory();

    const onLogout = () => {
        authService.signOut();
        history.push("/");
    }
    return (
        <>
            <span>Home</span>
            <button onClick={onLogout}>로그아웃</button>
        </>
    )
}

export default Home;