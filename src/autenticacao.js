//Login e-mail e senha
$(document).ready(function () {
    $("#authLogin").click(function (event) {
        event.preventDefault();

        var email = $("#email").val();
        var password = $("#password").val();
        console.log(email, password);

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                window.location = 'index.html';
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
    })

    //Fazer cadastro
    $(document).ready(function () {
        $("#createLogin").click(function (event) {
            event.preventDefault();
            var email = $("#email").val();
            var password = $("#password").val();

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function () {
                    window.location = 'perfil.html';
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                });
        })
    })
})

//Login com Gmail    
$(document).ready(function () {
    $("#authGmail").click(function (event) {
        event.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                var token = result.credential.acessToken;
                var user = result.user;
                window.location = 'perfil.html';
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                alert('Falha na autenticação')
            })
    })
})

//Login com Facebook
$(document).ready(function () {
    $("#authFacebook").click(function (event) {
        event.preventDefault();
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                var token = result.credential.acessToken;
                var user = result.user;
                window.location = 'perfil.html';
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                alert('Falha na autenticação')
            })
    })
})