//constants
const baseUrl = 'https://schools-out-backend.herokuapp.com';


var firebaseConfig = {
    apiKey: "AIzaSyCbROIkxxtjp8yEa9PLntpbRSyP0Fd-ASU",
    authDomain: "schoolsout-861b3.firebaseapp.com",
    databaseURL: "https://schoolsout-861b3.firebaseio.com",
    projectId: "schoolsout-861b3",
    storageBucket: "schoolsout-861b3.appspot.com",
    messagingSenderId: "696048954998",
    appId: "1:696048954998:web:74c7edc9c481a2091f3957"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//funcs
var urlParam = function (name, w) {
    w = w || window;
    var rx = new RegExp('[\&|\?]' + name + '=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '' : val[1];
}

function checkAuthState() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $.get(
                "https://schools-out-backend.herokuapp.com/api/user/getById/" + user.uid, {},
                function (data) {
                    $('#user-avatar')[0].src = data.photoUrl;
                    $('#user-name')[0].text = data.nickname;
                }
            );
        } else {
            // No user is signed in.
        }
    });
}