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
        postToSend: "",
        postsList: [],
        feed: []
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
                    alert("sign in is ok, you are redirecting to your dashboard!")
                    this.setState({isSignIn: true})
                    this.getAllFollowing()
                    this.showAllPosts()
                    this.showFeed()
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
    getAllFollowing = () => {
        const name = this.state.signInName
        axios.get("http://localhost:9030/all-following?username=" + name)
            .then(response => {
                this.setState({
                    followingList: response.data.allFollowing
                })
            }, () => {
                console.log(this.state.followingList)
            })
    }

    follow = (name) => {
        axios.get("http://localhost:9030/follow?username=" + this.state.signInName + "&name=" + name)
            .then(response => {
                console.log(response.data.success)
                this.getAllFollowing();
                this.showFeed()
            })
    }

    isFollowExist = (name) => {
        return this.state.followingList.some(item => item.username === name);
    }

    sendPost = () => {
        axios.get("http://localhost:9030/post?username=" + this.state.signInName + "&post=" + this.state.postToSend)
            .then(response => {
                if (response.data.success) {
                    alert("Your post was published successfully")
                    this.showAllPosts()
                } else {
                    console.log(response.data.errorCode)
                    alert("that was fail to send your post. try again")
                }
            })
        this.setState({postToSend: ""})

    }

    showAllPosts = () => {
        axios.get("http://localhost:9030/get-all-posts?username=" + this.state.signInName)
            .then(response => {
                if (response.data.success) {
                    this.setState({postsList: response.data.allPosts})
                    console.log(this.state.postsList.length)
                } else {
                    console.log(response.data.errorCode)
                }
            })
    }

    showFeed = () => {
        axios.get("http://localhost:9030/show-feed?username=" + this.state.signInName)
            .then(response => {
                if (response.data.success) {
                    this.setState({feed: response.data.feed})
                    console.log(this.state.feed.length)
                } else {
                    console.log(response.data.errorCode)
                }
            })
    }

    render() {
        return (
            <div className="App">
                {
                    !this.state.isSignIn ?
                        <div>
                            <h1> ברוכים הבאים לרשת החברתית - מחוברים</h1>

                            <h2>:להרשמה</h2>
                            <label>Enter user name: </label>
                            <input type={"text"} onChange={(event) => this.enterText(event, "signUpName")}
                                   value={this.state.signUpName}/><br/>
                            <label>Enter Password: </label>
                            <input type={"password"} onChange={(event) => this.enterText(event, "signUpPassword")}
                                   value={this.state.signUpPassword}/><br/><br/>
                            <button
                                disabled={this.state.signUpName.length === 0 || this.state.signUpPassword.length === 0}
                                onClick={this.signUp}>Sign up
                            </button>

                            <h2>:להתחברות</h2>
                            <label>Enter user name: </label>
                            <input type={"text"} onChange={(event) => this.enterText(event, "signInName")}
                                   value={this.state.signInName}/><br/>
                            <label>Enter Password: </label>
                            <input type={"password"} onChange={(event) => this.enterText(event, "signInPassword")}
                                   value={this.state.signInPassword}/><br/><br/>
                            <button
                                disabled={this.state.signInName.length === 0 || this.state.signInPassword.length === 0}
                                onClick={() => this.signIn()}>Sign in
                            </button>
                            <br/><br/>
                            <h6>דוד אבן חיים, עומר חיון, אביחי נבון, עידן זקהיים ואביחי בן עמי</h6>

                        </div> :
                        <div>
                            <div>
                                <h1>Hello {this.state.signInName}!</h1>
                                <h2>Welcome to Your Dashboard:</h2>
                                <div>
                                    <ImageInput/>
                                </div>
                                <div>
                                    <div>
                                        <h2 className={"headline"}>Search for friends to follow: </h2>
                                        <lable>type name or part of name:</lable>
                                        <input onChange={(event) => this.filterSearch(event)}/>
                                        <div>
                                            <lable>total result: {this.state.searchResult.length}</lable>
                                            {
                                                this.state.searchResult.map(item => {
                                                    return (
                                                        <div>
                                                            <span>{item.username}   </span>

                                                            <button disabled={this.isFollowExist(item.username)||this.state.signInName===item.username}
                                                                    onClick={() => this.follow(item.username)}
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
                                    <h2 className={"headline"}>Your Followings: ({this.state.followingList.length})</h2>
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
                                {/*<Posts postToSend={this.state.postToSend} enterText={()=>this.enterText()} sendPost={()=>this.sendPost()} postList={this.state.postsList}/>*/}
                                <div>
                                    <h2 className={"headline"}>Create New Post: </h2>
                                    <input placeholder={"write your post"}
                                           onChange={(event) => this.enterText(event, "postToSend")}
                                           value={this.state.postToSend}/>
                                    <button disabled={this.state.postToSend.length === 0}
                                            onClick={() => this.sendPost()}>post
                                    </button>
                                    <div>
                                        <h3 className={"headline"}>Your posts: ({this.state.postsList.length})</h3>
                                        <div>
                                            {
                                                this.state.postsList.map(post => {
                                                    return (
                                                        <div>
                                                            <h2>
                                                                {post.post}
                                                            </h2>
                                                            <h6>by me, at {post.time}</h6>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <Feed feed={this.state.feed} showFeed={()=>this.showFeed()}/>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default App;
