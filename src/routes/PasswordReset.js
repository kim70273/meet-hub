import { authService } from "fbase";
import React, { useState } from "react";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [notice, setNotice] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setEmail(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await authService.sendPasswordResetEmail(email);
            setNotice(true);
        } catch (error) {
            if (error.code === "auth/invalid-email" || error.code === "auth/user-not-found") {
                setErrorMsg("존재하지 않는 이메일입니다.");
            }
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="이메일을 입력하세요." required onChange={onChange} />
                <input type="submit" value="확인" />
            </form>
            {!notice && errorMsg}
            {notice && <span>입력하신 이메일로 메일이 전송되었습니다. 해당 메일을 통해 비밀번호 초기화를 진행해주세요.</span>}
        </>
    )
}

export default PasswordReset;