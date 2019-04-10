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

                    // let commentsRef = database.ref("tasks/" + USER_ID + "/" + childKey + "/" + "comments/")
                    // commentsRef.once('value', function(snapshot) {
                    //     snapshot.forEach(function(childSnapshot) {
                    //         let childKeyComment = childSnapshot.key;
                    //         let childDataComment = childSnapshot.val();
                    // console.log(childDataComment.comment, childKey)
                    // modalComment(childKey, childDataComment.comment)
                    // commentDelete(childKey, childKeyComment)
                    //     });
                    // });
                });
            })

        database.ref("users/" + USER_ID).on('child_added', snapshot => {
            if (snapshot.val().photo === "") {
                $("#photo").attr("src", "imagem/perfil.png");
            } else {
                storage.child(USER_ID).getDownloadURL().then(url => {
                    $("#photo").attr("src", url)
                        // namePost(snapshot.val().name, url)
                        // namePostFilter(snapshot.val().name, url)
                        //console.log(snapshot.val().name, snapshot.val().photo)
                })
            }
        })

        $("#filter-public").click(filterPublic)

        $("#filter-private").click(filterPrivate)

        $("#filter-friends").click(filterFriends)

        $("#filter-total").click(filterTotal)

        $('#public').keyup(disableBtn)

        $("#btnpost").click(newPost)

        $("#signout").click(signOut)

        $("#home").click(returnHome)

        $("#profile").click(returnPerfil)

        // $("#filter-total").click(returnHome)

    })

    function filterPublic(e) {
        e.preventDefault()
        $("#post-total-filter").empty()
        database.ref("tasks/" + USER_ID).on('child_added', snapshot => {
            if (snapshot.val().filter === "Público") {
                filterPosts(snapshot.val().text, snapshot.val().likes, snapshot.val().filter, snapshot.val().date, snapshot.key)
            }
        })
    }

    function filterFriends(e) {
        e.preventDefault()
        $("#post-total-filter").empty()
        database.ref("tasks/" + USER_ID).on('child_added', snapshot => {
            if (snapshot.val().filter === "Amigos") {
                filterPosts(snapshot.val().text, snapshot.val().likes, snapshot.val().filter, snapshot.val().date, snapshot.key)
            }
        })
    }

    function filterPrivate(e) {
        e.preventDefault()
        $("#post-total-filter").empty()
        database.ref("tasks/" + USER_ID).on('child_added', snapshot => {
            if (snapshot.val().filter === "Privado") {
                filterPosts(snapshot.val().text, snapshot.val().likes, snapshot.val().filter, snapshot.val().date, snapshot.key)
            }
        })
    }

    function filterTotal(e) {
        e.preventDefault()
        $("#post-total-filter").empty()
        database.ref("tasks/" + USER_ID).on('child_added', snapshot => {
            if (snapshot.val().filter === "Privado" || "Amigos" || "Público") {
                filterPosts(snapshot.val().text, snapshot.val().likes, snapshot.val().filter, snapshot.val().date, snapshot.key)
            }
        })
    }

    // function namePostFilter(name, photo) {
    //     $(`div[data-total-filter-id=${USER_ID}]`).prepend(`
    //         <div class="row align-items-center">
    //         <div class="col-xs-4">
    //         <img src=${photo} class="img-responsive img-circle" id="photo" alt=${name}></img>
    //         </div>
    //         <div class="col-xs-8 align-items-end">
    //         <p class="text text-left name" id="name-user">${name}</p>
    //         </div>
    //         </div>
    // `)
    // }

    function filterPosts(post, likes, filterPost, datePost, key) {
        $("#post-total, #container-post").empty()
        $("#post-total-filter").prepend(`
        <article>
        <div id="post" data-total-filter-id=${USER_ID} class="list-group-item well">
        <p class="text-justify text" id="text-post" data-text-id=${key}>${post}</p>
        <div class="row align-items-end">
        <div class="col-xs-6">
        <p class="text-muted text-min" data-date-id=${key}>${datePost}</p>
        <p class="text-muted text-min" data-filter-id=${key}>Post ${filterPost}</p>
        </div>
        </div>
        </div>
        <button type="button" class="btn btn-primary edit" data-edit-id=${key} data-toggle="modal" data-target="#myModal"><i class="far fa-edit"></i></button>
        <button type="button" class="btn btn-primary " data-delete-id=${key} data-toggle="modal" data-target="#myModal-delete"><i class="far fa-trash-alt"></i></button>
        <button type="button" class="btn btn-primary" data-like-id=${key}><i class="far fa-thumbs-up"></i> <span data-like-id=${key} id="likes">${likes}</span> </button>
        </article>
    `);
        let oldText = $("#text-post").text()
        likePost(key)
        editPost(key, oldText)
        postDelete(key)
    }

    // function namePost(name, photo) {
    //     $(`div[data-total-id=${USER_ID}]`).prepend(`
    //         <div class="row align-items-center">
    //         <div class="col-xs-4">
    //         <img src=${photo} class="img-responsive img-circle" id="photo" alt=${name}></img>
    //         </div>
    //         <div class="col-xs-8 align-items-end">
    //         <p class="text text-left name" id="name-user">${name}</p>
    //         </div>
    //         </div>
    // `)
    //     console.log(name, photo)
    // }

    function creatPost(post, likes, filterPost, datePost, key) {
        $("#post-total").prepend(`
    <article>
    <div id="post" data-total-id=${USER_ID} class="list-group-item well">
    <p class="text-justify text" data-text-id=${key}>${post}</p>
    <div class="row align-items-end">
    <div class="col-xs-6">
    <p class="text-muted text-min" data-date-id=${key}>${datePost}</p>
    <p class="text-muted text-min" data-filter-id=${key}>Post ${filterPost}</p>
    </div>
    </div>
    </div>
    <button type="button" class="btn btn-primary edit" data-edit-id=${key} data-toggle="modal" data-target="#myModal"><i class="far fa-edit"></i></button>
    <button type="button" class="btn btn-primary " data-delete-id=${key} data-toggle="modal" data-target="#myModal-delete"><i class="far fa-trash-alt"></i></button>
    <button type="button" class="btn btn-primary" data-like-id=${key}><i class="far fa-thumbs-up"></i> <span data-like-id=${key} id="likes">${likes}</span> </button>
    <article data-comment-id=${key} style="display:none"></article>
    </article>
    `);
        let oldText = $(`p[data-text-id=${key}]`).text()
        likePost(key)
        editPost(key, oldText)
        postDelete(key)
            // commentPost(key)
    }

    // function commentPost(key) {
    //     $(`button[data-comment-text-id=${key}]`).click(function(event) {
    //         console.log(key)
    //         event.preventDefault();
    //         let comments = $(`textarea[data-comment-id=${key}]`).val()
    //         console.log(comments)
    //         $('form')[1].reset()
    //         let commentPost = database.ref("tasks/" + USER_ID + "/" + key + "/" + "comments").push({
    //                 comment: comments
    //             })
    //             // commentDelete(key, commentPost.key)
    //         modalComment(key, comments)
    //     })
    // }

    //     function modalComment(key, comments) {
    //         $(`article[data-comment-id=${key}]`).prepend(`
    //         <div class="list-group-item well">
    //         <div class="row align-items-end">
    //         <div class="col-xs-12">
    //         <p class="text">${comments}</p>

    //         </div>
    //         </div>
    //         </div>     
    // `)
    //         toggleButton(key)
    //     }

    //     function toggleButton(key) {
    //         console.log(key)
    //         $(`button[data-comment-id=${key}]`).click(function() {
    //             $(`article[data-comment-id=${key}]`).toggle()
    //         })
    //     }

    // function commentDelete(key, keyComment) {
    //     $(`button[data-delete-comment-id=${key}]`).click(function(event) {
    //         console.log(keyComment)
    //         event.preventDefault();
    //         $("#btn-delete-comment").click(function(event) {
    //             event.preventDefault()
    //             $(`button[data-delete-comment-id=${key}]`).parent().remove()
    //             database.ref("tasks/" + USER_ID + "/" + key + "/" + "comments/" + keyComment).remove()
    //         })
    //     })
    // }

    function likePost(key) {
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
    }

    function editPost(key, oldText) {
        $(`button[data-edit-id=${key}]`).click(function(event) {
            event.preventDefault();
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

    function postDelete(key) {
        $(`button[data-delete-id=${key}]`).click(function(event) {
            event.preventDefault();
            $("#btn-delete").click(function(event) {
                event.preventDefault()
                $(`button[data-delete-id=${key}]`).parent().remove()
                database.ref("tasks/" + USER_ID + "/" + key).remove()
            })
        })
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
                comments: "",
                text: post,
                likes: 0,
                filter: selectPost,
                date: time()
            })
            // namePost(namePost, photo)
        creatPost(post, postLikes, selectPost, datePost, newPost.key)
        $('#btnpost').prop("disabled", true)
        $('form')[0].reset()
    }

    function signOut(event) {
        event.preventDefault();
        firebase.auth().signOut()
            .then(function() {
                window.location = "index.html"
            }).catch(function(error) {
                // An error happened.
            })
    }

    function returnHome(event) {
        event.preventDefault();
        window.location = 'timeline.html?id=' + USER_ID;
    }

    function returnPerfil(event) {
        event.preventDefault();
        window.location = 'perfil.html?id=' + USER_ID;
    }

    function time() {
        let today = new Date();
        let year = today.getFullYear();
        let day = today.getDate();
        let month = today.getMonth();
        let timeToday = " " + day + "/" + (month + 1) + "/" + year;
        return timeToday
    }