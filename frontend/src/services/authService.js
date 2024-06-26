import axios from "axios";

const API_URL = "/api/auth/";

const register = (registration) => {
    const {username, name, email, password} = registration;
    return axios.post(API_URL + "signup", {
        username,
        name,
        email,
        password,
    },);
};

const login = (login) => {
    const {username, password} = login;

    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            console.log(response)
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            if (response.data.blocked) {
                throw new Error('account_blocked');
            }
            return response.data;
        });
};

const logout = () => {

    console.log("logout")
    localStorage.removeItem("user");

};

const authService = {
    register,
    login,
    logout,
};

export default authService;