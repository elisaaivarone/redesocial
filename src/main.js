    let database = firebase.database();
    let USER_ID = window.location.search.match(/\?id=(.*)/)[1]

    $(document).ready(function() {
        database.ref("tasks/" + USER_ID).once('value')
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    let childKey = childSnapshot.key;
                    //console.log(childKey)
                    let childData = childSnapshot.val();
                    //console.log(childData.text)
                    creatPost(childData.text, childKey)
                });
            })

        $('#public').keydown(disableBtn)

        $("#btnpost").click(newPost)

        $("#signup").click(signUp)

    })

    function creatPost(post, key) {
        $("#post-total").prepend(`
    <li>
    <p class="list-group-item" data-text-id=${key}>${post}<span class="badge" data-like-id=${key} value=0 >0<span/></p>
    <button type="button" class="btn btn-primary edit" data-edit-id=${key} data-toggle="modal" data-target="#myModal">Editar</button>
    <button type="button" class="btn btn-primary" data-delete-id=${key} data-toggle="modal" data-target="#myModal-delete">Deletar</button>
    <input type="button" class="btn btn-primary" data-like-id=${key} value="Curtir" />
    </li>`);

        let count = 0;
        $(`input[data-like-id=${key}]`).click(function(event) {
            event.preventDefault();
            count += 1;
            $(`span[data-like-id=${key}]`).text(count)
        })

        $(`button[data-delete-id=${key}]`).click(function(event) {
            event.preventDefault();

            $("#btn-delete").click(function(event) {
                event.preventDefault()
                $(`button[data-delete-id=${key}]`).parent().remove()
                database.ref("tasks/" + USER_ID + "/" + key).remove()
            })
        })

        $(`button[data-edit-id=${key}]`).click(function(event) {
            event.preventDefault();
            $("#btn-edit").click(function(event) {
                event.preventDefault();
                let newText = $("#text-edit").val()
                $(`p[data-text-id=${key}]`).text(newText)
                database.ref("tasks/" + USER_ID + "/" + key).update({
                        text: newText
                    })
                    //window.location.reload()
            });
        });
    }



    function disableBtn() {
        if ($('#public').val().length === 0) {
            $('#btnpost').prop("disabled", true)
        } else {
            $('#btnpost').prop("disabled", false)
        }
    }

    function newPost(event) {
        event.preventDefault();
        let post = $("#public").val();
        let newPost = database.ref("tasks/" + USER_ID).push({
            text: post
        });
        creatPost(post, newPost.key)
        $('#btnpost').prop("disabled", true)
        $('form')[0].reset()
    }

    function signUp(event) {
        event.preventDefault();
        firebase.auth().signOut().then(function() {
            window.location = "autenticacao.html"
        }).catch(function(error) {
            // An error happened.
        })
    }

    function time() {
        let today = new Date();
        let year = today.getFullYear();
        let day = today.getDate();
        let month = today.getMonth();
        let timeToday = " " + day + "/" + (month + 1) + "/" + year;
        return timeToday
    }