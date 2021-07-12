import { authService } from "fbase";
import React, { useState } from "react";

const Join = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordChk, setPasswordChk] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value }
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "passwordChk") {
            setPasswordChk(value);
        }
    }

    const onJoin = async (event) => {
        event.preventDefault();
        try {
            if (password === passwordChk) {
                setPasswordError(false);
                await authService.createUserWithEmailAndPassword(email, password);
            } else {
                return setPasswordError(true);
            }
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setErrorMsg("이미 사용중인 이메일입니다.");
            } else if (error.code === "auth/invalid-email") {
                setErrorMsg("이메일을 올바르게 입력해주세요.");
            } else if (error.code === "auth/weak-password") {
                setErrorMsg("비밀번호는 최소 6자리 이상이어야 합니다.");
            }
        }
    }

    return (
        <>
            <form onSubmit={onJoin}>
                <input name="email" type="email" placeholder="이메일" value={email} required onChange={onChange} />
                <input name="password" type="password" placeholder="비밀번호" value={password} required onChange={onChange} />
                <input name="passwordChk" type="password" placeholder="비밀번호확인" value={passwordChk} required onChange={onChange} />
                <input type="submit" value="회원가입" />
            </form>
            {passwordError && <span>비밀번호가 일치하지 않습니다.</span>}
            {!passwordError && <span>{errorMsg}</span>}
        </>
    )
}

export default Join;