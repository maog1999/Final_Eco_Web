const loginForm = document.querySelector('.loginForm');

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    let user = loginForm.user.value;
    let password = loginForm.password.value;

   

    auth.signInWithEmailAndPassword(user,password).then(
        ()=>{
            setLoggedUser(auth.currentUser);

            db.ref('users/' + auth.currentUser.uid).once('value', (snapshot) => {

                let data = snapshot.val();
        
                if (data.rol == 'designer') {
                    window.location.href = "homedesigner.html";
                }
        
                if (data.rol == "client") {
                    
                    window.location.href = "homeuser.html";
                }
          
        
            }).catch((error) => {
                console.error(error);
                alert(error);
            });


            
        }
    ).catch((error)=>{

        console.log(error.message);
        alert(error);
    })
    
});

