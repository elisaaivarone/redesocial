    let database = firebase.database();
    let USER_ID = window.location.search.match(/\?id=(.*)/)[1]
    let storage = firebase.storage().ref("photos")
    $(document).ready(function() {
        database.ref("tasks/" + USER_ID).once('value')
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    let childKey = childSnapshot.key;
                    let childData = childSnapshot.val();
                    creatPost(childData.text, childData.likes, childData.filter, childData.date, childKey)
                });
            })

        database.ref("users/" + USER_ID).once('value')
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    let childKey = childSnapshot.key;
                    let childData = childSnapshot.val();

                    if (childData.photo === "") {
                        $("#photo").attr("src", "imagem/perfil.png");
                    } else {
                        storage.child(USER_ID).getDownloadURL().then(url => {
                            $("#photo").attr("src", url)
                        })
                    }
                    namePost(childData.name, childData.photo)
                });
            })


        $('#public').keyup(disableBtn)

        $("#btnpost").click(newPost)

        $("#signup").click(signUp)

        $("#perfil").click(function(event) {
            event.preventDefault();
            window.location = 'perfil.html?id=' + USER_ID;
        })

    })


    function namePost(name, photo) {
        $("#post").prepend(`
        <div class="row align-items-center">
  <div class="col-xs-3">
        <img src=${photo} class="img-responsive img-circle" id="photo" alt=${name}></img>
        </div>
        <div class="col-xs-9 align-items-end">
        <p class="text text-left name">${name}</p>
        </div>
        </div>
`)
    }
    console.log(namePost)

    function creatPost(post, likes, filterPost, datePost, key) {
        $("#post-total").prepend(`
    <li>
    <div id="post" data-total-id=${key} class="list-group-item well">
    <div class="row align-items-end">
    <div class="col-xs-3">
    <p id="post" class="text-muted text-min text-center" data-date-id=${key}>${datePost}</p>
    </div>
    </div>
    <p class="text-center text" data-text-id=${key}>${post}</p>
    <p class="text-min" data-filter-id=${key}>Post ${filterPost}</p>
    
    </div>
    <button type="button" class="btn btn-primary edit" data-edit-id=${key} data-toggle="modal" data-target="#myModal"><i class="far fa-edit"></i></button>
    <button type="button" class="btn btn-primary " data-delete-id=${key} data-toggle="modal" data-target="#myModal-delete"><i class="far fa-trash-alt"></i></button>
    
    <button type="button" class="btn btn-primary" data-like-id=${key}><i class="far fa-thumbs-up"></i> <span data-like-id=${key} id="likes">${likes}</span> </button>
    </li>
    `);

        let count = 0;
        $(`button[data-like-id=${key}]`).click(function(event) {
            event.preventDefault();
            count += 1;
            let newLike = parseInt($(`span[data-like-id=${key}]`).text()) + 1
            $(`span[data-like-id=${key}]`).text(newLike)
            database.ref("tasks/" + USER_ID + "/" + key).update({
                likes: newLike
            })
        })

        // $(`button[data-comment-id=${key}]`).click(function(event) {
        //     event.preventDefault();
        //     let comments = $("#text-comment").val()
        //     $("#myModal-comment").html(`
        //     <div class="modal-dialog">
        //     <div class="modal-content">

        //         <div class="modal-header">
        //             <h4 class="modal-title">Faça seu comentário</h4>
        //             <button type="button" class="close" data-dismiss="modal">×</button>
        //         </div>

        //         <div class="modal-body">
        //             <div class="form-group" >
        //             <ul id="comment-new">
        //             </ul>
        //             <input class="form-control" id="text-comment" />
        //             </div>
        //         </div>

        //         <div class="modal-footer">
        //             <button type="button" id="btn-comment" class="btn btn-primary" data-dismiss="modal">OK</button>
        //         </div>

        //     </div>
        // </div>
        //     `)
        //     $("#comment-new").prepend(`
        //             <li>${comments}</li>
        //             `)
        // });


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
                    <textarea class="form-control" id="text-edit">${oldText}</textarea>
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
        if ($('#public').val().length <= 0) {
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
        })
        creatPost(post, postLikes, selectPost, datePost, newPost.key)
        $('#btnpost').prop("disabled", true)
        $('form')[0].reset()
    }



    function signUp(event) {
        event.preventDefault();
        firebase.auth().signOut()
            .then(function() {
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