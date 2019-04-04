    let database = firebase.database();
    let USER_ID = window.location.search.match(/\?id=(.*)/)[1]

    $(document).ready(function() {
        database.ref("tasks/" + USER_ID).once('value')
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    let childKey = childSnapshot.key;
                    //console.log(childKey)
                    let childData = childSnapshot.val();
                    //console.log(childData)
                    creatPost(childData.text, childData.likes, childData.filter, childData.date, childKey)
                });
            })

        $('#public').keydown(disableBtn)

        $("#btnpost").click(newPost)

        $("#signup").click(signUp)

        $("#perfil").click(function(event) {
            event.preventDefault();
            window.location = 'perfil.html?id=' + USER_ID;
        })

    })

    function creatPost(post, likes, filterPost, datePost, key) {
        $("#post-total").prepend(`
    <li>
    <p class="list-group-item filter" data-text-id=${key}>${post}</p>
    <p class="list-group-item filter" data-date-id=${key}>${datePost}</p>
    <p class="list-group-item filter" data-filter-id=${key}>Post ${filterPost}</p>
    <button type="button" class="btn btn-primary edit" data-edit-id=${key} data-toggle="modal" data-target="#myModal">Editar</button>
    <button type="button" class="btn btn-primary" data-delete-id=${key} data-toggle="modal" data-target="#myModal-delete">Deletar</button>
    <input type="button" class="btn btn-primary" data-like-id=${key} value="Curtir" /><span class="btn" data-like-id=${key} id="likes" >${likes}</span>
    </li>`);

        let count = 0;
        $(`input[data-like-id=${key}]`).click(function(event) {
            event.preventDefault();
            count += 1;
            let newLike = parseInt($(`span[data-like-id=${key}]`).text()) + 1
            $(`span[data-like-id=${key}]`).text(newLike)
                //console.log(newLike)
            database.ref("tasks/" + USER_ID + "/" + key).update({
                likes: newLike
            })
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
            let oldText = $(`p[data-text-id=${key}]`).text()
            $("#myModal").html(`
            <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Edite seu post</h4>
                    <button type="button" class="close" data-dismiss="modal">×</button>
                </div>

                <div class="modal-body">
                    <div class="form-group">
                    <input class="form-control" rows="5" id="text-edit" value=${oldText} />
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" id="btn-edit" class="btn btn-primary" data-dismiss="modal">OK</button>
                </div>

            </div>
        </div>
            `)
            $("#btn-edit").click(function(event) {
                event.preventDefault();
                let newText = $("#text-edit").val()
                let newDate = time()
                $(`p[data-text-id=${key}]`).text(newText)
                $(`p[data-date-id=${key}]`).text(newDate)
                database.ref("tasks/" + USER_ID + "/" + key).update({
                    text: newText,
                    date: newDate
                })
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
        let post = $("#public").val()
        let postLikes = 0
        let datePost = time()
        let selectPost = $("#select-post option:selected").text()
        let newPost = database.ref("tasks/" + USER_ID).push({
            text: post,
            likes: 0,
            filter: selectPost,
            date: time()
        });
        creatPost(post, postLikes, selectPost, datePost, newPost.key)
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