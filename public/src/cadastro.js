// Login e-mail e senha
const database = firebase.database();
$(document).ready(function () {
  $("#createLogin").click(function (event) {
    event.preventDefault();
    const email = $("#inputemaill").val();
    const password = $("#inputpwd").val();
    const name = $("#inputnam").val();
    const kids = $("#inputKids").val();
    const state = $("#inputState").val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        window.location = "timeline.html?id=" + response.user.uid;
        database.ref("users/" + response.user.uid).push({
          name: name,
          photo: "image/profile.png",
          years: "",
          city: "",
          state: state,
          status: "",
          kids: kids,
          about: "",
          email: email
        });
      })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  });

  $("#back").click(function (event) {
    event.preventDefault();
    window.location = "index.html";
  });
});