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


    $('#public').keydown(function() {
        if ($('#public').val().length === 0) {
            $('#btnpost').prop("disabled", true)
        } else {
            $('#btnpost').prop("disabled", false)
        }
    })

    $("#btnpost").click(function(event) {
        event.preventDefault();
        let post = $("#public").val() + time();
        let newPost = database.ref("tasks/" + USER_ID).push({
            text: post
        });
        creatPost(post, newPost.key)
        $('#btnpost').prop("disabled", true)
        $('form')[0].reset()
    })

    function creatPost(post, key) {
        $("#post-total").prepend(`
        <li class="post-one">
        <span data-text-id="${key}">${post}</span>
        <a href="#edit" data-edit-id="${key}">Edit</a>
        <a href="#delete" data-delete-id="${key}">Delete</button>
        </li>`);

        $(`a[data-delete-id=${key}]`).click(function(event) {
            event.preventDefault();
            let id = $(this).attr("href");
            let alturaTela = $(document).height();
            let larguraTela = $(window).width();

            //colocando o fundo preto
            $('#mascara').css({ 'width': larguraTela, 'height': alturaTela });
            $('#mascara').fadeIn(1000);
            $('#mascara').fadeTo("slow", 0.8);

            let left = ($(window).width() / 2) - ($(id).width() / 2);
            let top = ($(window).height() / 2) - ($(id).height() / 2);

            $(id).css({ 'top': top, 'left': left });
            $(id).show();

            $("#mascara").click(function() {
                $(this).hide();
                $(".window").hide();
            });

            $("#btn-delete").click(function(event) {
                event.preventDefault()
                $(`a[data-delete-id=${key}]`).parent().remove()
                database.ref("tasks/" + USER_ID + "/" + key).remove()
                $("#mascara").hide();
                $(".window").hide();
            })

            $('.fechar').click(function(event) {
                event.preventDefault();
                $("#mascara").hide();
                $(".window").hide();

            })

        })

        $(`a[data-edit-id=${key}]`).click(function(event) {
            event.preventDefault();
            let id = $(this).attr("href");
            let alturaTela = $(document).height();
            let larguraTela = $(window).width();

            //colocando o fundo preto
            $('#mascara').css({ 'width': larguraTela, 'height': alturaTela });
            $('#mascara').fadeIn(1000);
            $('#mascara').fadeTo("slow", 0.8);

            let left = ($(window).width() / 2) - ($(id).width() / 2);
            let top = ($(window).height() / 2) - ($(id).height() / 2);

            $(id).css({ 'top': top, 'left': left });
            $(id).show();
        });

        $("#mascara").click(function() {
            $(this).hide();
            $(".window").hide();
        });

        $("#btn-edit").click(function(event) {
            event.preventDefault();
            let newText = $("#text-edit").val()
            database.ref("tasks/" + USER_ID + "/" + key).update({
                text: newText
            })
            $(`span[data-text-id=${key}]`).text(newText)
            $("#mascara").hide();
            $(".window").hide();
        })

        $('.fechar').click(function(event) {
            event.preventDefault();
            $("#mascara").hide();
            $(".window").hide();

        })

    }

    $("#signup").click(function(event) {
        event.preventDefault();
        firebase.auth().signOut().then(function() {
            window.location = "autenticacao.html"
        }).catch(function(error) {
            // An error happened.
        });
    })
})


function time() {
    let today = new Date();
    let year = today.getFullYear();
    let day = today.getDate();
    let month = today.getMonth();
    let timeToday = " " + day + "/" + (month + 1) + "/" + year;
    return timeToday
}