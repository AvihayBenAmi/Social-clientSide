import './App.css';
import React from "react";
import axios from "axios";
import ImageInput from './ImageInput';
import Dashboard from "./Dashboard";
import SearchUsers from "./SearchUsers";
import ShowFollowing from "./ShowFollowing";
import Posts from "./Posts";
import Feed from "./Feed";

class App extends React.Component {
    state = {
        isSignIn: false,
        signUpName: "",
        signUpPassword: "",
        signInName: "",
        signInPassword: "",
        searchInput: "",
        searchResult: [],
        followingList: [],
        postsList: [],
    }

    componentDidMount() {
        return this.getAllFollowers
    }

    enterText = (event, type) => {
        this.setState({[type]: event.target.value})
    }

    signUp = () => {
        axios.get("http://localhost:9030/sign-up?username=" + this.state.signUpName + "&password=" + this.state.signUpPassword)
            .then(response => {
                if (response.data.success) {
                    alert("sign up successful! you can sign in now")
                } else {
                    alert("the username is already occupied, try another. ")
                }
                this.setState({signUpName: "", signUpPassword: ""})

            })
    }

    signIn = () => {
        axios.get("http://localhost:9030/sign-in?username=" + this.state.signInName + "&password=" + this.state.signInPassword)
            .then(response => {
                if (response.data.success) {
                    alert("sign in is ok, youre redirecting to your dashboard!")
                    this.setState({isSignIn: true})
                } else {
                    alert("wrong user name or password, try again.")
                    this.setState({signInName: "", signInPassword: ""})
                }
            })
    }

    filterSearch = (event) => {
        this.setState({searchInput: event.target.value}, () => {
            axios.get("http://localhost:9030/get-user-search-result?search=" + this.state.searchInput)
                .then(response => {
                    this.setState({
                        searchResult: response.data.found
                    })
                })
        })

    }

    getAllFollowers = () => {
        const name=this.state.signInName
        axios.get("http://localhost:9030/all-following?username=" + name)
            .then(response => {
                this.setState({
                followingList: response.data.allFollowing
                })
            })
        console.log(this.state.followingList)
    }

    follow=(name)=> { //נשאר להכניס בדיקה אם המשתמש עוקב כבר אחרי משתמש מסוים ולא לתת לו לעקוב אחריו שוב
        axios.get("http://localhost:9030/follow?username=" + this.state.signInName + "&name=" + name)
            .then(response => {
                console.log(response.data)
            })
    }

    render() {
        return (
            <div className="App">
                {
                    !this.state.isSignIn ?
                        <div>
                            <h1>!ברוכים הבאים לרשת החברתית</h1>

                            <h2>Sign-up:</h2>
                            <label>Enter user name:</label>
                            <input type={"text"} onChange={(event) => this.enterText(event, "signUpName")}
                                   value={this.state.signUpName}/><br/>
                            <label>Enter Password:</label>
                            <input type={"password"} onChange={(event) => this.enterText(event, "signUpPassword")}
                                   value={this.state.signUpPassword}/><br/><br/>
                            <button
                                disabled={this.state.signUpName.length === 0 || this.state.signUpPassword.length === 0}
                                onClick={this.signUp}>Sign up
                            </button>

                            <h2>Sign-in:</h2>
                            <label>Enter user name:</label>
                            <input type={"text"} onChange={(event) => this.enterText(event, "signInName")}
                                   value={this.state.signInName}/><br/>
                            <label>Enter Password:</label>
                            <input type={"password"} onChange={(event) => this.enterText(event, "signInPassword")}
                                   value={this.state.signInPassword}/><br/><br/>
                            <button
                                disabled={this.state.signInName.length === 0 || this.state.signInPassword.length === 0}
                                onClick={() => this.signIn()}>Sign in
                            </button>
                            <br/><br/>

                        </div> :
                        <div>
                            <div>
                                <h1>Hello {this.state.signInName}! Welcome to Your Dashboard:</h1>
                                <div>
                                    <ImageInput/>
                                </div>
                                <div>
                                    <div>
                                        <h2>Search for friends to follow:</h2>
                                        <lable>type name or part of name:</lable>
                                        <input onChange={(event) => this.filterSearch(event)}/>
                                        <div>
                                            <lable>total result:{this.state.searchResult.length}</lable>
                                            {
                                                this.state.searchResult.map(item => {
                                                    return (
                                                        <div>
                                                            {item.username}
                                                            <button onClick={() => this.follow(item.username)}
                                                                    value={item.username}>Follow
                                                            </button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2>Your Followings:</h2>
                                    <lable>total following:{this.state.followingList.length}</lable>
                                    {
                                        this.state.followingList.map(item => {
                                            return (
                                                <div>
                                                    {item.username}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                <Posts/>
                                </div>
                                <div>
                                    <Feed/>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default App;
