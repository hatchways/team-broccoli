import React, { Component } from "react"
import './Signin.scss'

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
    }

    render(){
        return(
            <div className="boxView">
                <h2>Log In</h2>
                <span>Email</span><br />
                <TextField
                    id="email"
                    type="email"
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
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    onChange={this.updateText.bind(this)}
                /><br />
                <span>Forgot Password?</span><br />
                <button className="button" type="submit" onClick={this.submitDetails.bind(this)}>Login</button>
            </div>
        )
    }
}

export default signin