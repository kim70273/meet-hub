import { authService } from "fbase";
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

    return (
        <>
            <form onSubmit={onLogin} >
                <input type="email" placeholder="이메일" name="email" required onChange={onChange} />
                <input type="password" placeholder="비밀번호" name="password" required onChange={onChange} />
                <input type="submit" value="login" />
            </form>
            <Link to="/Join">회원가입</Link>
        </>
    )
}

export default Auth;