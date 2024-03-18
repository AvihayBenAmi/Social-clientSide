import React from "react";
import axios from "axios";

function Posts(props) {
    let postToSend
    let postsList =[]



    function setText(event) {
        postToSend = event.target.value
    }

    function sendPost() {
        axios.get("http://localhost:9030/post?username=" + props.username + "&post=" + postToSend)
            .then(response => {
                if (response.data.success) {
                    alert("Your post was published successfully")
                } else {
                    alert("that was fail to send your post. try again")
                }
            })
    }

    function showAllPosts() {
        axios.get("http://localhost:9030/get-all-posts?username=" + props.username)
            .then(response => {
                if (response.data.success) {
                    alert("success")
                    postsList = response.data.allPosts
                    console.log(postsList.length)
                } else {
                    console.log(response.data.errorCode)
                }
            })
    }


    return (
        <div>
            <h2>Create New Post:</h2>
            <input onChange={(event) => setText(event)} value={postToSend}/>
            <button onClick={()=> sendPost()}>post</button>
            <div>
                <h3>Your posts:</h3>
                <button onClick={() => showAllPosts()}> show</button>
                <label>{postsList.length}</label>
                <div>
                    {
                        postsList.map(post => {
                            return (
                                <p>
                                    {post.post}
                                </p>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Posts