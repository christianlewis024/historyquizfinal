

// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');


const setupUI = (user) => {
    if (user) {



        //////////////////BIG FAT TEST ///////////////

        //////////////////BIG FAT TEST ///////////////

        // account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
          <div>Logged in as ${user.email}</div>
          <div>${doc.data().username}</div>
          <div>${doc.data().bio}</div>
        `;
            accountDetails.innerHTML = html;
        });
        // toggle user UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // hide acc info
        accountDetails.innerHTML = '';
        // toggle user elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
};


// accountDetails
// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});
// const getUsername = (user) => {
//     const html = `
// ${user.email}
// `
// }
// var user = firebase.auth().currentUser;
// var name, email;

// if (user != null) {

//     name = user.username;
//     email = user.email;
//     function submitScore() {
//         db.collection("scores").doc().set({
//             score: score,
//             name: name || email

//         })
//     }

// }

// function submitScore() {
//     db.collection("scores").doc().set({
//         score: score,
//         name: name || email

//     })
// }
