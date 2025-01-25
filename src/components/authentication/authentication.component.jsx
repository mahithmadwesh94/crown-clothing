import { useEffect } from 'react';
import {auth, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import { getRedirectResult } from 'firebase/auth';
import SignUp from '../sign-up/sign-up.component';
import SignIn from '../sign-in/sign-in.component';
import './authentication.styles.scss';


const Authentication = () => {

    useEffect(() => {
        const firebaseFun =  async () => {
            const response = await getRedirectResult(auth);
           if(response){
            const userDocRef = await createUserDocumentFromAuth(response.user);
           }
            

        }
        firebaseFun();
       
    },[])



    
  


    return (
        <div className='authentication-container'>
           <SignIn/>
            <SignUp/>
            {/* <button onClick={singInWithGoogleRedirect}>Sign In With Google Redirect</button> */}
        </div>
    )
}

export default Authentication;