import { useState } from "react";
import { createAuthUserFromEmailAndPassword, createUserDocumentFromAuth, signInUserFromEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss'
import Button from "../button/button.component";
const defaultFormFields = {
    email:'',
    password:''
}


const SignIn = () => {
    const [formFields,setFormFields] = useState(defaultFormFields);

    const {email,password} = formFields;

    // console.log(formFields)
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        console.log(name,value)
        setFormFields({...formFields,[name]:value}) 
        
    }

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
       

        try{
            const {user} = await signInUserFromEmailAndPassword(email,password);
            resetFormFields();
           }catch(error){
            console.log('Sign-In Error',error)
           }
        
    }


    const logGoogleUser = async() => {
        const user = await signInWithGooglePopup();
       await createUserDocumentFromAuth(user)

       try{
        const {user} = await signInUserFromEmailAndPassword(email,password);
        console.log('user logged in',user);
       }catch(error){
        console.log('Sign-In Error',error)
       }

    }


    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign-Up with Email and Password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label='Email' type="email" required name="email" value={email} onChange={handleChange}/>

            <FormInput label='Password' type="password" required name="password" value={password} onChange={handleChange}/>
            <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button type='button' buttonType={'google'} onClick={logGoogleUser}>Google Sign-In</Button>
            </div>
        </form>
        </div>
    )

}

export default SignIn;