var authEmail = document.getElementById ('authEmail');
var authFacebook = document.getElementById ('authFacebook');
var authGmail = document.getElementById ('authGmail');
var createLogin = document.getElementById ('createLogin');

//Input
var email = document.getElementById ('email');
var pwd = document.getElementById ('pwd');

//Usuario

createLogin.addEventListener('click', function() {
    firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, pwd.value)
    .then(function(){
        alert('Bem Vindo ' + email.value);
    })
    .catch(function(){
        alert('Falha ao cadastrar')
    })

})

// Autenticar email e senha

authEmail.addEventListener('click', function() {
    firebase
    .auth()
    .signInWithEmailAndPassword(email.value, pwd.value)
    .then(function (){
        alert('Autenticado' + email.value);
})
    .catch(function(){
        alert('Falha ao autenticar')
    })
})

// window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,
//       xfbml      : true,
//       version    : '{api-version}'
//     });
      
//     FB.AppEvents.logPageView();   
      
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));

authGmail.addEventListener('click', function(){
var provider = new firebase.auth.GoogleAuthProvider();
signIn(provider)
});

authFacebook.addEventListener('click', function(){
    var provider = new firebase.auth.FacebookAuthProvider();
    signIn(provider)
    });
    

function signIn(provider){
    firebase.auth()
    .signInWithPopup(provider)
    .then(function(result){
        var token = result.credential.acessToken;
        alert('Bem vindo')
    })
    .catch(function(){
        alert('Falha na autenticação')
    })
}