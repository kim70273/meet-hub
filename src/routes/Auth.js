import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

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
            if (error.code === "auth/invalid-email" || error.code === "auth/user-not-found") {
                setErrorMsg("존재하지 않는 이메일입니다.");
            } else if (error.code === "auth/user-disabled") {
                setErrorMsg("사용이 중지된 계정입니다.");
            } else if (error.code === "auth/wrong-password") {
                setErrorMsg("비밀번호가 틀렸습니다.");
            }
        }
    }

    const onSocialClick = async (event) => {
        const { target: { name } } = event;
        const provider = new firebaseInstance.auth.GoogleAuthProvider();
        await authService.signInWithPopup(provider);
    }

    return (
        <>
            <form onSubmit={onLogin} >
                <input name="email" type="email" placeholder="이메일을 입력하세요." required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="비밀번호를 입력하세요." required value={password} onChange={onChange} />
                <input type="submit" value="로그인" />
            </form>
            <span>{errorMsg}</span>
            <div>
                <Link to="/Join">회원가입</Link>
                <Link to="/PasswordReset">비밀번호 찾기</Link>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
            </div>

        </>
    )
}

export default Auth;