const element = {
    password: document.querySelector("#password"),
    email: document.querySelector("#email"),
    submit: document.querySelector("#submitUserInfo"),
};

verifierConnexion = sessionStorage.getItem('isConnected')


let boutonLogin = element.submit.addEventListener("click", (a) => {
    a.preventDefault();

    fetch("http://localhost:5678/api/users/login",{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: element.email.value,
                password: element.password.value,
            }),
        })
        .then((response) => response.json())
        .then((data) => {         

         console.log(data); // test console
        sessionStorage.setItem("Token", data.token);
        console.log(sessionStorage.getItem("Token")); // test console
        if (data.message || data.error) {
            alert("Identifiant ou mot de passe incorrect");
        } else {
            sessionStorage.setItem("isConnected", JSON.stringify(true));
            console.log(sessionStorage.getItem("isConnected")); // test console

            if (sessionStorage.getItem("isConnected")) {
                window.location.replace("index.html");
            }
        }
    })
});

const verifierToken = sessionStorage.getItem("Token");
console.log(verifierToken); // test console

if (verifierToken) {
    console.log("Token is ok"); //test console
};
