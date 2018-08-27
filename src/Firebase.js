import firebase from 'firebase';

//in a real app i wouln't do this :D but this is 4 fun..so i don't care :D
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBMKr_8LJS2PJ77XCq7u5YjwGhmg2kI-t0",
  authDomain: "pixelcollab-996f3.firebaseapp.com",
  databaseURL: "https://pixelcollab-996f3.firebaseio.com",
  projectId: "pixelcollab-996f3",
  storageBucket: "pixelcollab-996f3.appspot.com",
  messagingSenderId: "1007498472289"
});

const database = firebaseApp.database();

const pixelsdb = database.ref('pixels');

const getPixels = () => {
  return database
    .ref('pixels')
    .once('value')
    .then((snapshot) => {
      const pixels = [];
      snapshot.forEach((childSnapshot) => {
        pixels.push({
          ...childSnapshot.val(),
          id: childSnapshot.key
        });
      });
      return pixels;
    })
};

const setPixel = (pixel) => {
  return database
    .ref('pixels')
    .push(pixel);
}

export { 
  firebaseApp,
  getPixels,
  setPixel,
  pixelsdb,
  database as default
};