const modalContainer = document.querySelector('.modalContainer');
const userProjectsList = document.querySelector('.userProjectsList');
const btnPublish = document.querySelector('.btnPublish');
const projectDescription = document.querySelector('#projectDescription');
const diseño2d = document.querySelector(".diseño2D");
const diseño3d = document.querySelector(".modelado3D");
const video = document.querySelector(".video");
const logOut = document.getElementById('logOut');
let category = "";

diseño2d.addEventListener("click", () => {



    diseño2d.classList.add("diseño2DSelect");
    diseño3d.classList.remove("modelado3DSelect");
    video.classList.remove("videoSelect");
    category = "diseño2D"

});

diseño3d.addEventListener("click", () => {


    diseño2d.classList.remove("diseño2DSelect");
    diseño3d.classList.add("modelado3DSelect");
    video.classList.remove("videoSelect");
    category = "modelado3D"

});

video.addEventListener("click", () => {


    diseño2d.classList.remove("diseño2DSelect");
    diseño3d.classList.remove("modelado3DSelect");
    video.classList.add("videoSelect");
    category = "video"
});



btnPublish.addEventListener('click', () => {

    // verifica que el input tenga algo de texto
    if (projectDescription.value == "") {

        alert("no puede publicar un proyecto vacio")
    }

    else {

        if (category == "") {

            alert("seleccione una categoria");
        }

        else {


            //String id, String userId, String projectDescription, String category, int day, int month
            let reference = db.ref("projects").push()




            var d = new Date();

            let Project = {
                id: reference.key,
                userId: activeUser.id,
                taken: false,
                projectDescription: projectDescription.value,
                category: category,
                day: d.getDate(),
                month: d.getMonth()

            }


            reference.set(Project).then(() => {


                projectDescription.value = "";
            });

        }
    }

});

function renderProjects(list) {

    userProjectsList.innerHTML = "";
    list.forEach(e => {

        let div = document.createElement('div');
        div.classList.add('jobOffer');
        div.classList.add("job");
        div.classList.add("click");


        if (e.userId == auth.currentUser.uid) {


            div.innerHTML = `
                <div class="jobContent">
                    <p class="label ${e.category}Select">${e.category}</p>
                    <p class='jobMsg'>${e.projectDescription}</p>
            <div class="jobIcons">
                <div>
                    <img src="./data/images/calendar.svg" alt="">
                    <p>${dateManage(e.month, e.day)}</p>
                </div>
                <div>
                    <img src="./data/images/comment.svg" alt="">
                    <p></p>
                </div>
            </div>
            
            </div>
            <div class="jobOwner">
            <img src="./data/images/client.png" alt="">
        </div>
        `;

            userProjectsList.appendChild(div);

            div.addEventListener('click', () => {
                modalContainer.innerHTML = "";

                modalContainer.classList.replace('close', 'show');

                var modal = document.createElement('div');
                modal.classList.add('modal');
                modal.classList.add('modalDesigner');

                modal.innerHTML = `
            <div class="modalHeader">
                <div class="modalHeaderData">
                    <img src="./data/images/client.png" alt="">
                    <p>Cliente</p>
                </div>
                <img class="modalHeaderClose click" src="./data/images/close.svg" alt="">
            </div>
            <div class="jobContent modalContent">
                <p class='jobMsg'>${e.projectDescription}</p>
                <div class="jobIcons">
                    <div>
                        <img src="./data/images/calendar.svg" alt="">
                        <p> ${dateManage(e.month, e.day)}</p>
                    </div>
                    <div>
                        <img src="./data/images/comment.svg" alt="">
                        <p></p>
                    </div>
                </div>

            </div>

            <div class="modalComments">
            </div>
            `;

                modalContainer.appendChild(modal);

                const CommentsContainer = document.querySelector('.modalComments');
                const modalHeaderClose = document.querySelector(".modalHeaderClose");     
                          
                modalHeaderClose.addEventListener('click',()=>{
                    modalContainer.classList.replace('show','close');
                });

                db.ref("comments").orderByChild("projectId").equalTo(e.id).on("value", (snapshot) => {

                    let dataC = snapshot.val();

                    
                    var arrayC = [];

                    for (var i in dataC) {
                        arrayC.push(dataC[i]);
                    }

                    arrayC.forEach((comment) => {
                        let divC = document.createElement('div');
                        divC.classList.add('comment');

                        db.ref("users").orderByChild("id").equalTo(comment.designerId).on("value", (snap) => {
                            
                            let user;
                            snap.forEach((element)=>{

                                user = element.val();
                            })
                            
                            divC.innerHTML = `
                            <div class="commentHeader">
                                <div>
                                    <img src="./data/images/user.png" alt="">
                                    <p class="commentHeaderName">${user.name}</p>
                                </div>
    
                                <button class="btn btnC">Contratar</button>
                            </div>
    
                            <p class="commentText">
                                ${comment.comment}
                            </p>`


                        CommentsContainer.appendChild(divC);

                        const btnC = divC.querySelector('.btnC');

                        btnC.addEventListener('click',()=>{

                            let ids ={
                                projectId: e.id,
                                designerId:user.id
                            }

                            localStorage.setItem('ids', JSON.stringify(ids));
                            location.href = 'hire.html';
                        });

                        });

                    });

                });

            });

        }

    });
}

//Metodo para cerrar sesion
logOut.addEventListener('click', ()=>{
    auth.signOut().then(
        ()=>{
            window.location.href= 'index.html';
        }
    ).catch(
        (error)=>{
            alert(error.message); 
        }
    ); 
});


db.ref("projects").on("value", (snapshot) => {

    let data = snapshot.val();

    var array = [];

    for (var i in data) {
        array.push(data[i]);
    }

    renderProjects(array);

});