import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Join = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const onChange = (event) => {
        const {
            target: {name, value}
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const onJoin = async (event) => {
        event.preventDefault();
        try {
            await authService.createUserWithEmailAndPassword(email, password);
            history.push("/");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <form onSubmit={onJoin}>
                <input type="email" placeholder="이메일" name="email" required onChange={onChange} />
                <input type="password" placeholder="비밀번호" name="password" required onChange={onChange} />
                <input type="submit" value="회원가입" />
            </form>
        </>
    )
}

export default Join;