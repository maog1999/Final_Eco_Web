const profileNameD = document.querySelector('.profileNameD');
const profileAgeD = document.querySelector('.profileAgeD');
const profileCollegeD = document.querySelector('.profileCollegeD');
const profileProD = document.querySelector('.profileProD');
const profileEmailD = document.querySelector('.profileEmailD');

const btnHire = document.querySelector(".btnHire");

let ids = JSON.parse(localStorage.getItem("ids"));

db.ref("users/"+ids.designerId).on("value", (data) => {
    let user = data.val();
    console.log(user);
    profileNameD.innerHTML = user.name;
    profileAgeD.innerHTML = user.age;
    profileCollegeD.innerHTML = user.institution;
    profileProD.innerHTML = user.profesion;
    profileEmailD.innerHTML = user.email;

});

btnHire.addEventListener("click", () => {

    db.ref("projects/"+ids.projectId).on("value", (data) => {

            let project = data.val();

            project.taken = true;

            db.ref("projects/"+project.id).set(project).then(() => {


                project.designerId = ids.designerId;

                db.ref("onGoing/"+project.id).set(project).then(() => {

                    location.href = 'homeuser.html';

                });

            });

     

    });
    alert("¡Ha contratado al diseñador con exito!")
});