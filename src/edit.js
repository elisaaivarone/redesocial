$(document).ready(function () {
  let database = firebase.database();
  let idUser = window.location.search.match(/\?id=(.*)/)[1];

  database.ref("users/" + idUser).once('value')
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        let childData = childSnapshot.val();

        $("#infos").append(
          `
          <img src=${childData.photo}>
          <input type="file">
          <table>
            <tr>
              <th><label>Nome:</label></th>
              <td><input type=text id=newName value=${childData.name}></td>
            </tr>
            <tr>
              <th><label>Idade:</label></th>
              <td><input type=number id=newYears value=${childData.years}> anos</td>
            </tr>
            <tr>
              <th><label>Estado:</label></th>
              <td><input type=text id=newState value=${childData.state}></td>
            </tr>
            <tr>
              <th><label>Status Civil:</label></th>
              <td><input type=text id=newStatus value=${childData.status}></td>
            </tr>
            <tr>
              <th><label>Filho(s):</label></th>
              <td><input type=text id=newKids value=${childData.kids}></td>
            </tr>
            <tr>
              <th><label>Sobre mim:</label></th>
              <td><textarea id=newAbout>${childData.about}</textarea></td>
            </tr>
          </table>
        `
        )
      })
    })
    .catch(function (error) {
      alert("Erro na página!")
    });

  $("#save").click(function () {

    // var postData = {
    //   name: $("#newName").val(),
    //   photo: "imagem/perfil.png",
    //   years: $("#newYears").val(),
    //   state: $("#newState").val(),
    //   status: $("#newStatus").val(),
    //   kids: $("#newKids").val(),
    //   about: $("#newAbout").val()
    // };

    // var newDadosKey = database.ref('users' + idUser).child;

    // console.log(newDadosKey)

    // var updates = {};
    // updates['/users/' + newDadosKey] = postData;

    // database.ref().update(updates);


    // database.ref('users/' + idUser).set({
    // name: $("#newName").val(),
    // photo: "imagem/perfil.png",
    // years: $("#newYears").val(),
    // state: $("#newState").val(),
    // status: $("#newStatus").val(),
    // kids: $("#newKids").val(),
    // about: $("#newAbout").val()
    //     })
    // window.location = 'index.html?id=' + idUser;
  })
});