import * as database from 'firebase';
const config = {
    apiKey: "AIzaSyCJYKM8YAGN63AI7jMK1SCsDuduU4e8GRA",
    authDomain: "compsci-732-project.firebaseapp.com",
    databaseURL: "https://compsci-732-project.firebaseio.com",
    projectId: "compsci-732-project",
    storageBucket: "compsci-732-project.appspot.com",
    messagingSenderId: "329451042596"
};

export const firebase = database.initializeApp(config);