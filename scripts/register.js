const registerFormBtns = document.querySelector('.registerFormBtns');
const btnsFormType = document.querySelectorAll('.btnFormType');

btnsFormType.forEach((element) => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        btnsFormType.forEach(e => {
            e.classList.remove('btnFormTypeSelected');
        });
        element.classList.add('btnFormTypeSelected');
    });
});

const registerForm = document.querySelector('.registerForm');
const btnForm = document.querySelector('.btnForm');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var name = registerForm.name.value;
    var email = registerForm.email.value;
    var password = registerForm.password.value;
    var phone = registerForm.phone.value;
    var rol = registerForm.querySelector('.btnFormTypeSelected').value;

    var user = {
        age: "",
        email: email,
        institution: "",
        name: name,
        phoneNumber: phone,
        profesion: "",
        rol: rol
    };

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

            var userData = userCredential.user;
 
            user.id = userData.uid;
            db.ref("users").child(userData.uid).set(user).then(()=>{

                    
                if (user.rol == 'designer') {
                    window.location.href = "homedesigner.html";
                }
        
                if (user.rol == "client") {
                    
                    window.location.href = "homeuser.html";
                }

            });
            
        })
        .catch((error) => {

        });

});