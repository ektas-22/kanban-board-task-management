import axios from "axios";

export const login = async (loginData) => {

    console.log("1. login() called", loginData);

    const response = await axios.post(
        "http://localhost:8080/auth/login",
        loginData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    console.log("2. POST response received", response);

    return response.data;
};