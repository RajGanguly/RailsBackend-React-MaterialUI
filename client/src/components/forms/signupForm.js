import React, { useRef, useState, useEffect } from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import signup from '../../services/auth.js'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
const headerStyle = { margin: 0 }
const avatarStyle = { backgroundColor: '#1bbd7e' }
const marginTop = { marginTop: 5 }
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignupForm =() => {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [email, setEmail] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  console.log("Checking phone :", phone)

  useEffect(() => {
    if(userRef.current) userRef.current.focus();
  }, [])

  useEffect(() => {
      setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
      setErrMsg('');
  }, [user, pwd, matchPwd])

  const register = async (event) => {
    // event.preventDefault();
    let params = { email: email, name: name, phone: phone, password: pwd}
    try {
      const response = await signup({ user: params })
    } catch (e) {

    }
    
  }

    return (
      <Grid>
        <Paper style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}>
                    <AddCircleOutlineOutlinedIcon />
                </Avatar>
                <h2 style={headerStyle}>Sign Up</h2>
                <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
            </Grid>

          <TextField fullWidth label='Name' placeholder="Enter your name"                           
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                      aria-describedby="name"
                      onFocus={() => setNameFocus(true)}
                      onBlur={() => setNameFocus(false)} />
          <TextField fullWidth label='Email' placeholder="Enter your email"                            
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                      aria-invalid={validEmail ? "false" : "true"}
                      aria-describedby="emailnote"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)} />                           
          <TextField fullWidth label='Phone Number' placeholder="Enter your phone number"
                      id="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      required
                      aria-describedby="phone"
                      onFocus={() => setPhoneFocus(true)}
                      onBlur={() => setPhoneFocus(false)} />
          <TextField fullWidth label='Password' placeholder="Enter your password"                             
                      id="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}/>
          <TextField fullWidth label='Confirm Password' placeholder="Confirm your password" type="password"
                      id="confirm_pwd"
                      onChange={(e) => setMatchPwd(e.target.value)}
                      value={matchPwd}
                      required
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby="confirmnote"
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}/>
          <FormControlLabel
              control={<Checkbox name="checkedA" />}
              label="I accept the terms and conditions."
          />
          <Button type='submit' variant='contained' color='primary' onClick={register}>Sign up</Button>
        </Paper>
      </Grid>
    )
}

export default SignupForm;