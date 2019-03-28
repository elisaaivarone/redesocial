var database = firebase.database();

$(document).ready(function() {
    database.ref("/tasks").once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                let childKey = childSnapshot.key;
                let childData = childSnapshot.val();
                console.log(childData.text)

                $("#post-total").prepend(`<button class="post-one" id="btn-delete">Delete</button>`)
                $("#post-total").prepend(`<li class="post-one">${time()}</li>`);
                $("#post-total").prepend(`<li class="post-one">${childData.text}</li>`);
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
        let post = $("#public").val();
        database.ref("tasks").push({
            text: post
        });


        let btnDelete = $("#post-total").prepend(`<button class="post-one" id="btn-delete">Delete</button>`)
        let postTwo = $("#post-total").prepend(`<li class="post-one">${time()}</li>`);
        let postOne = $("#post-total").prepend(`<li class="post-one">${post}</li>`);
        $("#btn-delete").click(function() {
            $(".post-one").remove()
        })
        $('#btnpost').prop("disabled", true)
        $('form')[0].reset()
    })



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