import React, { Component } from "react"
import './Signin.scss'
import { Link } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';

class signin extends Component{

    constructor(){
        super()

        this.state={
            login: {
                email: '',
                password: ''
            },
            passLength: 0
        }
    }

    updateText(event){
        console.log('updateText: '+event.target.id+' == '+event.target.value)
        let updatedText = Object.assign({}, this.state.login)
        updatedText[event.target.id] = event.target.value
        
        let updatedLength
        event.target.id === 'password' ? updatedLength = event.target.value.length : updatedLength = 0
        
        this.setState({
            login: updatedText,
            passLength: updatedLength
        })
    }

    submitDetails(event){
        console.log('submit details'+JSON.stringify(this.state.login))
        //this function will handle the post request

        if(this.state.passLength < 6){
            alert('Password must contain 6 characters')
        }

        if(!this.state.login.email){
            alert('Please enter a valid Email and Password')
        }
    }

    render(){
        return(
            <div className="pageView">
                <div className="loginView">
                    <h2>Log In</h2>
                    <span>Email</span><br />
                    <TextField
                        id="email"
                        type="email"
                        placeholder="abc@hello.com"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        onChange={this.updateText.bind(this)}
                    /><br />
                    <span>Password</span><br />
                    <TextField
                        id="password"
                        type="password"
                        placeholder="Minimum 6 characters"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        onChange={this.updateText.bind(this)}
                    /><br />
                    <span>Forgot Password?</span><br />
                    <button className="button" type="submit" onClick={this.submitDetails.bind(this)}>Login</button>
                </div>

                <div className="signupView">
                    <Link to='/signup'><button className="signupbutton" type="submit">Sign Up</button></Link>
                </div>
            </div>
        )
    }
}

export default signin