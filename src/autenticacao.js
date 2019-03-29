//Login e-mail e senha
$(document).ready(function() {
    $("#authLogin").click(function(event) {
        event.preventDefault();

        let email = $("#email").val();
        let password = $("#password").val();
        console.log(email, password);

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(response) {
                console.log(response.user.uid)
                window.location = 'index.html?id=' + response.user.uid;;
            })
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(errorMessage);
            });
    })

    //Fazer cadastro
    $("#createLogin").click(function(event) {
        event.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(response) {
                window.location = 'index.html?id=' + response.user.uid;
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
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function(result) {
                let token = result.credential.acessToken;
                let user = result.user;
                window.location = 'index.html?id=' + response.user.uid;
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
    $("#authFacebook").click(function(event) {
        event.preventDefault();
        let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function(result) {
                let token = result.credential.acessToken;
                let user = result.user;
                window.location = 'index.html?id=' + response.user.uid;
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