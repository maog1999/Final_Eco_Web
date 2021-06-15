const profileName = document.querySelector('.profileName');
const profileAge = document.querySelector('.profileAge');
const profileCollege = document.querySelector('.profileCollege');
const profilePro = document.querySelector('.profilePro');
const profileEmail = document.querySelector('.profileEmail');

function renderUserInfo(user) {
    
    if (location.pathname == '/homeuser.html'|| location.pathname == '/homeUser.html' || location.pathname == '/homedesigner.html' || location.pathname == '/profileEdit.html') {
        profileName.innerHTML = user.name;
        profileAge.innerHTML = user.age;
        profileCollege.innerHTML = user.institution;
        profilePro.innerHTML = user.profesion;
        profileEmail.innerHTML = user.email;
    }


}

const profileEdit = document.querySelector('.profileEdit');
if(profileEdit){
    profileEdit.addEventListener('click', () =>{
        location.href = 'profileEdit.html';
    });
    
}




