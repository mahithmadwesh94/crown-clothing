import { useState } from "react";
import { createAuthUserFromEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
    displayName :'',
    email:'',
    password:'',
    confirmPassword:''
}


const SignUp = () => {
    const [formFields,setFormFields] = useState(defaultFormFields);

    const {displayName,email,password,confirmPassword} = formFields;


    // console.log(formFields)
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        // console.log(name,value)
        setFormFields({...formFields,[name]:value},()=>{
           
        }) 
        
    }

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            alert('Passwords do not match');
            return;
        }

        try{
            const {user} = await createAuthUserFromEmailAndPassword(email,password);
           await createUserDocumentFromAuth(user,{displayName});
           
           resetFormFields()
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already in use')
            }
            console.log('user creation error',error);
        }
        
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign-Up with Email and Password</span>
        <form onSubmit={handleSubmit}>
            
            <FormInput label="Name" type="text" name="displayName" value={displayName}  onChange={handleChange}/>

            <FormInput label='Email' type="email" required name="email" value={email} onChange={handleChange}/>

            <FormInput label='Password' type="password" required name="password" value={password} onChange={handleChange}/>
           
            <FormInput label='Confirm Password' type="text" required name="confirmPassword" value={confirmPassword} onChange={handleChange}/>

            <Button type="submit">Sign Up</Button>
        </form>
        </div>
    )

}

export default SignUp;