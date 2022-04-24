import React, {  useState } from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core';
import authenticate from '../services/sendEmail.js'
import Cookie from 'js-cookie'
import sendEmail from '../services/sendEmail.js'

const PostLogin =() => {

    const paperStyle={padding :20,height:'73vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
  
    const [email, setEmail] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);

    const dispatchEmail = async (event) => {
        // event.preventDefault();
        let params = { email: email }
        try {
          const response = await sendEmail({ user: params })
        //   if(response.token) {
        //     window.localStorage.setItem('token', response.token)
        //     window.localStorage.setItem('user', JSON.stringify(response.data.user))
        //     Cookie.set('jwt', response.token)              
        //   }
        } catch (e) {
    
        }
        
      }    
    return(
        <Grid>
            <Paper  style={paperStyle}>
                <TextField label='Email' placeholder='Enter email' fullWidth required
                    id= "email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    aria-describedby="emailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)} />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={dispatchEmail}>Send Email</Button>
            </Paper>
        </Grid>
    )
}

export default PostLogin;