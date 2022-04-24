import React, { useRef, useState, useEffect } from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import authenticate from '../services/login.js'
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie'

const Login=({handleChange})=>{

    const paperStyle={padding :20,height:'73vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
  
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const navigate = useNavigate()

    const signIn = async (event) => {
        // event.preventDefault();
        let params = { email: email, password: pwd}
        try {
          const response = await authenticate({ user: params })
          if(response.data.token) {
            window.localStorage.setItem('token', response.data.token)
            window.localStorage.setItem('user', JSON.stringify(response.data.user))
            Cookie.set('jwt', response.data.token) 
            navigate("/postLogin")             
          }
        } catch (e) {
    
        }
        
      }    
    return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Email' placeholder='Enter email' fullWidth required
                    id= "email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    aria-describedby="emailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)} />
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required
                      id="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)} />
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={signIn}>Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" onClick={()=>handleChange("event",1)} >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login