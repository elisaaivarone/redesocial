$(document).ready(function (response) {
  let database = firebase.database();
  let USER_ID = window.location.search.match(/\?id=(.*)/)[1];
  let storage = firebase.storage().ref("photos");

  database.ref("users/" + USER_ID).once('value')
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        let childData = childSnapshot.val();

        if (childData.photo === "imagem/perfil.png") {
          $("#perfil").attr("src", "imagem/perfil.png");
        }
        else {
          storage.child(USER_ID).getDownloadURL().then(url => {
            $("#perfil").attr("src", url)
          })
        }

        $("#name").text(childData.name);
        $("#city").text(childData.city);
        $("#years").text(childData.years);
        $("#state").text(childData.state);
        $("#status").text(childData.status);
        $("#kids").text(childData.kids);
        $("#about").text(childData.about);
        $("#email").text(childData.email);
      })

      $("#edit").prop("disabled", false)
      $("#back").prop("disabled", false)

    })
    .catch(function (error) {
      $("#back").prop("disabled", false)
      alert("Erro no carregamento das informações.")
    });

  $("#edit").click(function () {
    window.location = 'edit.html?id=' + USER_ID;
  });

  $("#back").click(function () {
    window.location = 'index.html?id=' + USER_ID;
  });

  $("#home").click(function () {
    window.location = 'index.html?id=' + USER_ID;
  });

});



