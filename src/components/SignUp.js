import React from 'react'

const SignUp = (props) => {
    return(
        <div>
            What's your name: <input onChange={e => props.signUp(e.target.value)} /><button onClick={props.submitSignUp}>Sign Up</button>
        </div>
    )
}

export default SignUp;