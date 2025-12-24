import {GoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import './App.css'

function Login(){
const navi=useNavigate();
const onSuccess=(credentials)=>{
const code=jwtDecode(credentials.credential);
navi('Home');
localStorage.setItem('enteryallowed',true);
localStorage.setItem('email',code.email);
}  

const onError=()=>{
    alert('Error Occured');
}

return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">AI Assistant</h1>
        <p className="login-subtitle">Sign in to continue with your PDF analysis</p>
        <GoogleLogin onSuccess={onSuccess} onError={onError}/>
      </div>
    </div>
)
}

export default Login