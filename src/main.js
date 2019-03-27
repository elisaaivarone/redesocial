$(document).ready(function() {
    $('#public').keydown(function(){
        if($('#public').val().length === 0){
            $('#btnpost').prop("disabled", true)
        }else{
            $('#btnpost').prop("disabled", false)
        }
    })
    
    
       

    $("#btnpost").click(function(event) {
        event.preventDefault();
        console.log($('#public').val().length)
        let post = $("#public").val();
        console.log(post, time())
        let postOne = $("#post-total").append('<li class="post-one">' + post + '</li>');
        let postTwo = $("#post-total").append('<li class="post-one">' + time() + '</li>');
        $('form')[0].reset()
    })
    $("#signup").click(function() {
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
    let strMin = min.toString();
    let strHour = hour.toString();
    if (strHour.length < 2)
        strHour = "0" + strHour;
    if (strMin.length < 2)
        strMin = "0" + strMin;
    let timeToday = strHour + ":" + strMin;
    return timeToday
}