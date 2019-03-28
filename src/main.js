var database = firebase.database();

$(document).ready(function() {
    database.ref("/tasks").once('value')
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
        let newPost = database.ref("tasks").push({
            text: post
        });
        creatPost(post, newPost.key)
        $('#btnpost').prop("disabled", true)
        $('form')[0].reset()
    })

    function creatPost(post, key) {
        $("#post-total").prepend(`<li class="post-one"><span>${post}</span><button id="btn-delete" data-id="${key}">Delete</button></li><li class="post-one">${time()}</li>`);
        $(`button[data-id=${key}]`).click(function() {
            $(this).parent().remove()
            database.ref("tasks/" + key).remove()
            console.log($(this).parent())
        })
    }


    $("#signup").click(function(event) {
        event.preventDefault();
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    })
})


function time() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let year = today.getFullYear();
    let day = today.getDate();
    let month = today.getMonth();
    let strMin = min.toString();
    let strHour = hour.toString();
    if (strHour.length < 2)
        strHour = "0" + strHour;
    if (strMin.length < 2)
        strMin = "0" + strMin;
    let timeToday = day + "/" + (month + 1) + "/" + year + " " + strHour + ":" + strMin;
    return timeToday
}