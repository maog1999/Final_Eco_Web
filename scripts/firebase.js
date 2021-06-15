// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCpw9BBfldwFJiGnWffIDdB6yfMXTMhFrE",
    authDomain: "finalecosistemas-d8be5.firebaseapp.com",
    databaseURL: "https://finalecosistemas-d8be5-default-rtdb.firebaseio.com",
    projectId: "finalecosistemas-d8be5",
    storageBucket: "finalecosistemas-d8be5.appspot.com",
    messagingSenderId: "478101992521",
    appId: "1:478101992521:web:86a601261ce4f8136a3b98"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

let activeUser = null;

const setLoggedUser = (info) => {
    activeUser = info;
}

auth.onAuthStateChanged(

    (user) => {

        if (user) {

            db.ref('users/' + user.uid).once('value', (snapshot) => {
                let data = snapshot.val();

                
                setLoggedUser(data);
                renderUserInfo(data);
 

            }).catch((error) => {
                console.error(error);
            });

        }
        else {

            activeUser = null;
          
        }

    }
)

