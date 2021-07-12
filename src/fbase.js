import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDcspIydtYIjrFNDPdrlEGbmPfIIvVS3zw",
    authDomain: "meet-hub-88b67.firebaseapp.com",
    projectId: "meet-hub-88b67",
    storageBucket: "meet-hub-88b67.appspot.com",
    messagingSenderId: "685741882825",
    appId: "1:685741882825:web:148ce212cd143a8b837c18"
  };
//하드코딩 된 키 코드는 나중에 보완 예정.

  //위의 설정대로 초기화 시켜준다.
export default firebase.initializeApp(firebaseConfig);