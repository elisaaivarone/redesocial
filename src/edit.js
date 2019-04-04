$(document).ready(function () {
  let database = firebase.database();
  let USER_ID = window.location.search.match(/\?id=(.*)/)[1];
  let storage = firebase.storage().ref("photos");

  database.ref("users/" + USER_ID).once('value')
  .then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let childData = childSnapshot.val();

      if (childData.photo === "") {
        $("#perfil").attr("src", "imagem/perfil.png");
      }
      else {
        storage.child(USER_ID).getDownloadURL().then(url => {
          $("#perfil").attr("src", url)
        })
      }

      $("#name").val(childData.name);
      $("#years").val(childData.years);
      $("#city").val(childData.city);
      $("#state").val(childData.state);
      $("#status").val(childData.status);
      $("#kids").val(childData.kids);
      $("#about").val(childData.about);

    })

    $("#photo").change(function (event) {
      var arquivo = event.target.files[0];
      storage.child(USER_ID).put(arquivo).then(snapshot => {
        console.log("snapshot", snapshot);
      })

    })

    $("#save").prop("disabled", false);
    $("#back").prop("disabled", false);

  })
  .catch(function (error) {
    $("#back").prop("disabled", false)
    alert("Erro no carregamento das informações.")
  });

$("#save").click(function () {
  let users = database.ref("users/" + USER_ID);

  users.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        let key = childSnapshot.key;
        database.ref("users/" + USER_ID + "/" + key).update({
          about: $("#about").val(),
          city: $("#city").val(),
          kids: $("#kids").val(),
          name: $("#name").val(),
          photo: $("#photo").val(),
          state: $("#state").val(),
          status: $("#status").val(),
          years: $("#years").val()
        })

      })
    })
  alert("Dados salvos com sucesso!")
  window.location = 'perfil.html?id=' + USER_ID;
});


$("#back").click(function () {
  window.location = 'perfil.html?id=' + USER_ID;
});

});