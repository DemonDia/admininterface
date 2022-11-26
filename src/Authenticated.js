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
    console.log("isAuthenticated",isAuthenticated)
    console.log("isAuthenticated == null",isAuthenticated == null)
    console.log("isAuthenticated == false",isAuthenticated == false)
    if (isAuthenticated == null) {
        localStorage.setItem("loggedIn", false);
        navigate("/login");
    }
    if (isAuthenticated == false) {
        navigate("/login");
    }
};

export  {loginPageAuthCheck,defaultAuthCheck }
