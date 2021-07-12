import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Join = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordChk, setPasswordChk] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const history = useHistory();

    const onChange = (event) => {
        const {
            target: {name, value}
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "passwordChk"){
            setPasswordChk(value);
        }
    }

    const onJoin = async (event) => {
        event.preventDefault();

        try {
            if(password === passwordChk){
            setPasswordError(false);
            await authService.createUserWithEmailAndPassword(email, password);
            history.push("/");
            }
            else{
                return setPasswordError(true);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <form onSubmit={onJoin}>
                <input name="email" type="email" placeholder="이메일" value={email} required onChange={onChange} />
                <input name="password" type="password" placeholder="비밀번호" value={password} required onChange={onChange} />
                <input name="passwordChk" type="password" placeholder="비밀번호확인" value={passwordChk} required onChange={onChange} />
                {passwordError && <span>비밀번호가 일치하지 않습니다.</span>}
                <input type="submit" value="회원가입" />
            </form>
        </>
    )
}

export default Join;