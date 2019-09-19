import React, { Component } from "react"
import './Signin.scss'
import { Link } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class signup extends Component{

    constructor(){
        super()

        this.state={
            signup: {
                name: '',
                email: '',
                password: '',
                termsNconditions: ''
            },
            passLength: 0,
            snackbaropen: false,
            snackbarmsg: '',
            terms: false
        }
    }

    //handles the snackbar warning message
    snackbarClose = (event) => {
        this.setState({
            snackbaropen: false
        })
    }

    //handle updating the state with the values of the input fields
    updateText(event){
        let updatedText = Object.assign({}, this.state.signup)
        updatedText[event.target.id] = event.target.value
        
        let updatedLength
        event.target.id === 'password' ? updatedLength = event.target.value.length : updatedLength = 0
        
            this.setState({
                signup: updatedText,
                passLength: updatedLength
            })
    }

    //handles form submittal
    handleSubmit(event){
        event.preventDefault()
        if(this.state.passLength < 6){
            this.setState({
                snackbaropen: true,
                snackbarmsg: 'Password must contain atleast 6 characters'
            })
        }
        if(!this.state.signup.email){
            this.setState({
                snackbaropen: true,
                snackbarmsg: 'Please enter a valid Email'
            })
        }
        if(!this.state.signup.name){
            this.setState({
                snackbaropen: true,
                snackbarmsg: 'Please enter a name'
            })
        }
        if(!this.state.terms){
            this.setState({
                snackbaropen: true,
                snackbarmsg: 'Please agree to the terms and conditions by selecting the checkbox'
            })
        }
        //Post request and response to be handled here once backend is setup
    }

    handleCheck = (event) => {
        let updatedConditions = event.target.value
        let updatedTerms = this.state.terms
        !updatedTerms ? updatedTerms = true : updatedTerms = false

        this.setState(prevState => ({ 
            terms: updatedTerms,
            signup: {
                ...prevState.signup,
                termsNconditions: updatedConditions
            }
         }));
    };

    render(){
        return(
            <div className="pageView">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="loginView">
                        <h2>Create an account</h2>
                        <span>Name</span><br />
                        <TextField
                            id="name"
                            type="name"
                            onChange={this.updateText.bind(this)}
                            margin="normal"
                            variant="outlined"
                        /><br />
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
                        <FormControlLabel
                                control={<Checkbox checked={this.state.terms} onChange={this.handleCheck} value="Agree" color="primary" />}
                                label="By signing up I agree with terms and conditions"
                        />
                        <button className="button" type="submit">Create</button>
                        <Snackbar
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                            }}
                            open={this.state.snackbaropen}
                            autoHideDuration={6000}
                            onClose={this.snackbarClose}
                            ContentProps={{
                            'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{this.state.snackbarmsg}</span>}
                            action={[
                            <IconButton
                                key="close"
                                aria-label="close"
                                color="inherit"
                                onClick={this.snackbarClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                            ]}
                        />
                    </div>
                </form>

                <div className="signupView">
                    <Link to='/signin'><button className="signupbutton" type="submit">Sign In</button></Link>
                </div>
            </div>
        )
    }
}

export default signup