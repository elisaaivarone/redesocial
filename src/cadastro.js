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
                    photo: "imagem/perfil.png",
                    years: "",
                    city: city,
                    state: state,
                    status: "",
                    kids: kids,
                    about: "",
                    email: email
                });
            })
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(errorMessage);
            });
    })

    $("#back").click(function(event) {
        event.preventDefault();
        window.location = "autenticacao.html";
    });
})