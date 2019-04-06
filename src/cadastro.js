//Login e-mail e senha
$(document).ready(function() {
    let database = firebase.database();

    $("#createLogin").click(function(event) {
        event.preventDefault();

        let email = $("#inputemaill").val();
        let password = $("#inputpwd").val();
        let name = $("#inputnam").val();
        let kids = $("#inputKids").val();
        let city = $("#inputCity").val();
        let state = $("#inputState").val();

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(response) {
                window.location = 'index.html?id=' + response.user.uid;
                database.ref("users/" + response.user.uid).push({
                    name: name,
                    photo: "",
                    years: "",
                    city: city,
                    state: state,
                    status: "",
                    kids: kids,
                    about: ""
                });
            })
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(errorMessage);
            });
    })

    //Login com Gmail    
    $("#authGmail").click(function(event) {
        event.preventDefault();

        let email = $("#inputemaill").val();
        let password = $("#inputpwd").val();
        let name = $("#inputnam").val();
        let kids = $("#inputKids").val();
        let city = $("#inputCity").val();
        let state = $("#inputState").val();

        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function(result) {
                let token = result.credential.acessToken;
                let user = result.user;
                window.location = 'index.html?id=' + result.user.uid;
                database.ref("users/" + result.user.uid).push({
                    name: name,
                    photo: "",
                    years: "",
                    city: city,
                    state: state,
                    status: "",
                    kids: kids,
                    about: ""
                });
            })
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                let email = error.email;
                let credential = error.credential;
                alert('Falha na autenticação')
            })
    })

    //Login com Facebook
    $("#authFace").click(function(event) {
        event.preventDefault();

        let email = $("#inputemaill").val();
        let password = $("#inputpwd").val();
        let name = $("#inputnam").val();
        let kids = $("#inputKids").val();
        let city = $("#inputCity").val();
        let state = $("#inputState").val();

        let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function(result) {
                let token = result.credential.acessToken;
                let user = result.user;
                window.location = 'index.html?id=' + result.user.uid;
                database.ref("users/" + result.user.uid).push({
                    name: name,
                    photo: "",
                    years: "",
                    city: city,
                    state: state,
                    status: "",
                    kids: kids,
                    about: ""
                });
            })
            .catch(function(error) {
                console.log(error);
                let errorCode = error.code;
                let errorMessage = error.message;
                let email = error.email;
                let credential = error.credential;
                alert('Falha na autenticação')
            })
    })
})