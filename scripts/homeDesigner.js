//codigo local

//calls
const modalContainer = document.querySelector('.modalContainer');
const offerJobs = document.querySelector('.offerJobs');
const myJobs = document.querySelector('.myJobs');

const offerJobsTitle = '<h3>Proyectos para ti</h3>';
const myJobsTitle = '<h3>Tus Proyectos</h3>';

function renderJobs(list) {
    offerJobs.innerHTML = offerJobsTitle;
    myJobs.innerHTML = myJobsTitle;

    list.forEach(e => {
        let div = document.createElement('div');
        div.classList.add('job');

        if (e.taken && e.designerId == auth.currentUser.uid) {
            div.classList.add('jobAcepted');

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
                        <img src="./data/images/phone.svg" alt="">
                        <p>Contactar al cliente</p>
                    </div>
                    </div>
                </div>
            </div>
            <div class="jobOwner">
                <img src="./data/images/client.png" alt="">
            </div>
            `;

            myJobs.appendChild(div);

        }

        else if(!e.taken) {

            div.classList.add('jobOffer');
            div.classList.add('click');

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

            div.addEventListener('click',()=>{
                modalContainer.innerHTML = "";
                modalContainer.classList.replace('close','show');

                var modal = document.createElement('div');
                modal.classList.add('modal');
                modal.classList.add('modalDesigner');

                modal.innerHTML=`
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

                <div class="modalComment">
                    <img src="./data/images/user.png" alt="">
                    <form class="modalForm">
                        <textarea class="modalFormArea" name="comment" cols="100%" rows="10"></textarea>

                        <button class="btn btnComment">Comentar</button>
                    </form>
                </div>
                `
                modalContainer.appendChild(modal);

                var modalHeaderClose = document.querySelector('.modalHeaderClose');
                var modalForm = document.querySelector('.modalForm');

                modalForm.addEventListener('submit', (event) =>{
                    event.preventDefault();
                    var msg = modalForm.comment.value;

                    var comment ={  
                        comment: msg,
                        designerId: activeUser.id,
                        projectId: e.id,
                    }

                    let reference = db.ref("comments").push();

                    comment.id = reference.key;

                    reference.set(comment).then(()=>{

                        
                        modalForm.comment.value="";
                        modalContainer.classList.replace('show','close');
                    });

                });

                modalHeaderClose.addEventListener('click',()=>{
                    modalContainer.classList.replace('show','close');
                });

            });

            offerJobs.appendChild(div);

        }

    });

};

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

//renderOfferJobs();

db.ref('projects').on('value', (snapshot) => {

    let data = snapshot.val();

    var array = [];

    for (var i in data) {
        array.push(data[i]);
    }

    renderJobs(array);

});