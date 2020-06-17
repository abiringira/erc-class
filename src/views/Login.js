/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React,{ useEffect,useState } from 'react';
import "../shards-dashboard/styles/index.css";
import Dashboard from "./Dashboard";



const loginPage = ()  => {

	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
 
	

	 usernameHandleChange = (event) => {
		setUsername({ username: event.target.value });
	
	  }

	  passwordHandleChange = (event) => {
		  setPassword ({password: event.target.value })
	  }

	  handleSubmit = (event) => {
		  event.preventDefault();
		  this.postLogin()
	  }



	  postLogin = () => {
	
		useEffect(() => {
	    
	   fetch('https://www.smart-investment.club/ercapi/api/auth/signin' ,{ 
			method: 'POST',
			headers: {  
			  'API-VERSION' : 1.0,
			  'Application-key' : 'a6cb5c9ce88b59ee360587f0459bcb37fe8895c9'
		
		  },body: {
			  'username' : username,
			  'password' :password 

		  }}).then((response) => {

			console.log('Success:', response.status);
			if (response.status === 200)
			console.log('Success:', response.status);
			else if (response.status !== 200)
			console.log('Success:', response.status);
		  }
		  )
		 
  
	})

}

   return (

    <React.Fragment>
     

    
       <div className="body1">

       <div className="App-login1" >
       
     
 <div class="container1" id="container1">

	<div class="form-container1 sign-in-container1">
 		<form onSubmit={this.handleSubmit} className="form1">
			
			<div class="social-container1">
				{/* <a href="/" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="/" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="/" class="social"><i class="fab fa-linkedin-in"></i></a> */}
<img
                id="main-logo"

                style={{ maxWidth: "210px" }}
                src={require("../images/avatars/logoerc.png")}
                alt="logo"
              />
			</div>
			<h1>Sign in</h1>

		<input className="input1" type="email" value={setUsername} onChange={this.usernameHandleChange} placeholder="Email" />
			<input class="input1" type="password"value={setPassword} onChange={this.passwordHandleChange}  placeholder="Password" />
 			{/* <a href="hhtp/social">Forgot your password?</a> */}
 			<button class="button1" ><a className="a1" href="/dashboard">Sign In </a></button> 
 		</form>
 	</div>

 	<div class="overlay-container1">

 		<div class="overlay">
			
		 <div class="overlay-panel overlay-right"> 
		
			
			
			<h1 className="login-header1">Create Account</h1>

			<form action="#" className="form1">
			<h1>Sign Up</h1>

		<input className="input1" type="email" placeholder="Email" />
			<input class="input1" type="number" placeholder="Phone" />
			<input className="input1" type="text" placeholder="username" />
			<input class="input1" type="password" placeholder="Password" />
 			<button class="button1" ><a className="a1" href="/dashboard">Sign up </a></button> 
 		</form>
 	</div>

 			</div>

		</div>
		</div>

 	</div>

 </div>
        
    
	   

	   {/* <MainFooter/> */}

     </React.Fragment>
   );
}

export default loginPage