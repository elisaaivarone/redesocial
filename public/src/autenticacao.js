//Login e-mail e senha
$(document).ready(function() {
    $("#authLogin").click(function(event) {
        event.preventDefault();
        const email = $("#email").val();
        const password = $("#password").val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(response) {
                window.location = 'timeline.html?id=' + response.user.uid;
            })
            .catch(function(error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
        })

// Login com Gmail    
$("#authGmail").click(function (event) {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        const userId = result.user;
        database.ref("users/" + userId.uid).on("value", function (snapshot) {
          if (snapshot.val() === null) {
            database.ref("users/" + userId.uid).push({
              name: userId.displayName,
              photo: "image/profile.png",
              years: "",
              city: "",
              state: "",
              status: "",
              kids: "",
              about: "",
              email: userId.email
            });
            window.location = "timeline.html?id=" + userId.uid;
          } else {
            window.location = "timeline.html?id=" + userId.uid;
          }
        });
      })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        alert(errorMessage);
      });
  });

//Criar nova conta
$("#newAccount").click(function(event) {
    event.preventDefault();
    window.location = "cadastro.html";
    });
});