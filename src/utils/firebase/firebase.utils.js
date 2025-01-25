import {initializeApp} from 'firebase/app';
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut,onAuthStateChanged} from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCVk0FRYa034ax6K5YQnbum20hX0oZQUl4",
    authDomain: "crwn-db-3198d.firebaseapp.com",
    projectId: "crwn-db-3198d",
    storageBucket: "crwn-db-3198d.appspot.com",
    messagingSenderId: "971499228892",
    appId: "1:971499228892:web:2148822a8e6bfb2e89ae19",
    measurementId: "G-XTT36T9SB4"
  };


  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt:'select_account'
  })

  export const auth = getAuth()
  export const singInWithGooglePopUp = () => signInWithPopup(auth,provider);
  export const singInWithGoogleRedirect = () => signInWithRedirect(auth,provider);
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth,additionalInformation) =>{
    const userDocRef = doc(db,'Users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
      const {displayName,email} = userAuth;
      const createdAt = new Date();
      try {
        await setDoc(userDocRef,{
          displayName,email,createdAt,...additionalInformation
        })
        
      } catch (error) {
        console.log('error login',error.message)
      }
    }
// console.log(userDocRef)
    return userDocRef;
  }

  export const createAuthUserFromEmailAndPassword =async (email,password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);

  }

  export const signInUserFromEmailAndPassword =async (email,password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);

  }

  export const signOutUser = async() => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);