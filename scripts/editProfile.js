const profileForm = document.querySelector('.profileForm');

const profileImg = document.querySelector('.profileImg');


profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var age = profileForm.age.value;
    var college =profileForm.college.value;
    var pro = profileForm.pro.value;

    activeUser.age = age;
    activeUser.profesion = pro;
    activeUser.institution = college;

    db.ref('users/' + auth.currentUser.uid ).set(activeUser);

    if (activeUser.rol == 'designer') {
        window.location.href = "homedesigner.html";
    }

    if (activeUser.rol == "client") {
        window.location.href = "homeuser.html";
    }
});

setTimeout(()=>{
    if(activeUser.rol == 'designer'){
        profileImg.src = "./data/images/user.png";
    }else{
        profileImg.src = "./data/images/client.png";
    }
    console.log(activeUser.rol);
},3000);