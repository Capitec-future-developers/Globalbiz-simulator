<script type="module">
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyCxc_74JBwewrkjZoL5Twk_2mRiZHooOnI",
    authDomain: "capitec-business-app.firebaseapp.com",
    projectId: "capitec-business-app",
    storageBucket: "capitec-business-app.firebasestorage.app",
    messagingSenderId: "680703025467",
    appId: "1:680703025467:web:1dca3f681a93965571971e",
    measurementId: "G-FFM404PS17"
};

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
</script>