const loginPageAuthCheck = (navigate) => {
    const isAuthenticated = JSON.parse(localStorage.getItem("loggedIn"));
    if (isAuthenticated == null) {
        localStorage.setItem("loggedIn", false);
    }
    if (isAuthenticated) {
        navigate("/home");
    }
};

const defaultAuthCheck = (navigate) => {
    const isAuthenticated = JSON.parse(localStorage.getItem("loggedIn"));
    if (isAuthenticated == null) {
        localStorage.setItem("loggedIn", false);
        navigate("/login");
    }
    if (isAuthenticated == false) {
        navigate("/login");
    }
};

const redirectAuthCheck = (navigate) => {
    const isAuthenticated = JSON.parse(localStorage.getItem("loggedIn"));
    if (isAuthenticated == null) {
        localStorage.setItem("loggedIn", false);
        navigate("/login");
    }
    if (isAuthenticated == false) {
        navigate("/login");
    }
    if (isAuthenticated == true) {
        navigate("/home");
    }
};

export { loginPageAuthCheck, defaultAuthCheck, redirectAuthCheck };
