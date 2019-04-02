$(document).ready(function (response) {
  let database = firebase.database();
  let idUser = window.location.search.match(/\?id=(.*)/)[1];

  database.ref("users/" + idUser).once('value')
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        let childData = childSnapshot.val();

        $("#dados").prepend(
          `
          <img src=${childData.photo}>
        <table>
          <tr>
            <th><label>Nome:</label></th>
            <td>${childData.name}</td>
          </tr>
          <tr>
            <th><label>Idade:</label></th>
            <td>${childData.years}</td>
          </tr>
          <tr>
            <th><label>Estado:</label></th>
            <td><i class="fas fa-map-marker-alt">${childData.state}</i></td>
          </tr>
          <tr>
            <th><label>Status Civil:</label></th>
            <td>${childData.status}</td>
          </tr>
          <tr>
            <th><label>Filho(s):</label></th>
            <td>${childData.kids}</td>
          </tr>
          <tr>
            <th><label>Sobre mim:</label></th>
            <td>${childData.about}</td>
          </tr>
        </table>
        `
        )
      })

    })
    .catch(function (error) {
      alert("Erro na página!")
    })

    $("#edit").click(function (event) {
      event.preventDefault();
      window.location = 'edit.html?id=' +idUser;
    })

});



