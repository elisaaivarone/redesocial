
// // window.fbAsyncInit = function() {
// //     FB.init({
// //       appId      : '{your-app-id}',
// //       cookie     : true,
// //       xfbml      : true,
// //       version    : '{api-version}'
// //     });
      
// //     FB.AppEvents.logPageView();   
      
// //   };

// //   (function(d, s, id){
// //      var js, fjs = d.getElementsByTagName(s)[0];
// //      if (d.getElementById(id)) {return;}
// //      js = d.createElement(s); js.id = id;
// //      js.src = "https://connect.facebook.net/en_US/sdk.js";
// //      fjs.parentNode.insertBefore(js, fjs);
// //    }(document, 'script', 'facebook-jssdk'));

// authGmail.addEventListener('click', function(){
// var provider = new firebase.auth.GoogleAuthProvider();
// signIn(provider)
// });

// authFacebook.addEventListener('click', function(){
//     var provider = new firebase.auth.FacebookAuthProvider();
//     signIn(provider)
//     });
    

// function signIn(provider){
//     firebase.auth()
//     .signInWithPopup(provider)
//     .then(function(result){
//         var token = result.credential.acessToken;
//         alert('Bem vindo')
//     })
//     .catch(function(){
//         alert('Falha na autenticação')
//     })
// }   

//Login e-mail e senha
$(document).ready(function () {
    $("#authLogin").click(function (event) {
        event.preventDefault();
        
        var email = $("#email").val();
        var password = $("#password").val();
        console.log(email,password);

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                window.location = 'index.html';
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);

            });

    })


//Fazer cadastro
$(document).ready(function () {
    $("#createLogin").click(function (event) {
        event.preventDefault();
        var email = $("#email").val();
        var password = $("#password").val();
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function () {
                window.location = 'perfil.html';
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                   alert(errorMessage);

            });
      })
   })
})

//Fazer login com Gmail
       googleSignIn =() => {
        var provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
          console.log(result);
     })
     .catch(function(error) {
         console.log(error);
         
       });
        }
       
   