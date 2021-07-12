import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value }
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const onLogin = async (event) => {
        event.preventDefault();
        try {
            await authService.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error.message);
        }
    }

    const onSocialClick = async (event) => {
        const {target:{name}} = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        await authService.signInWithPopup(provider);
    }

    return (
        <>
            <form onSubmit={onLogin} >
                <input name="email" type="email" placeholder="이메일" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="비밀번호" required value={password} onChange={onChange} />
                <input type="submit" value="Log in" />
            </form>
            <div>
            <Link to="/Join">회원가입</Link>
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
            </div>

        </>
    )
}

export default Auth;