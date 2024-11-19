// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";  // Chú ý import getDatabase trước

// Firebase config của em
const firebaseConfig = {
  apiKey: "AIzaSyCobkiIUpdyn775INtTibnNwzBAaDFaYOM",
  authDomain: "circle-a8229.firebaseapp.com",
  databaseURL: "https://circle-a8229-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "circle-a8229",
  storageBucket: "circle-a8229.firebasestorage.app",
  messagingSenderId: "239838512768",
  appId: "1:239838512768:web:2ef8fc16c26a9189d74865",
  measurementId: "G-V06QQX2VGX"
};

// Khởi tạo Firebase app và database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);  // Đảm bảo gọi getDatabase sau khi khởi tạo app

export { database };
