import React from "react";
import axios from "axios";

function Posts(props) {
    let post
    const username = props.username
    let postsList = props.postsList


    function setText(event) {
        post = event.target.value
    }

    function sendPost() {
        axios.get("http://localhost:9030/post?username=" + username + "&post=" + post)
            .then(response => {
                if (response.data.success) {
                    alert("Your post was published successfully")
                    post = ""
                } else {
                    alert("that was fail to send your post. try again")
                }
            })

    }

    function showAllPosts() {
        axios.get("http://localhost:9030/get-all-post?username=" + username)
            .then(response => {
                postsList = response.data.allPosts
            })
    }


    return (
        <div>
            <h2>Create New Post:</h2>
            <input onChange={(event) => setText(event)} value={post} placeholder={"what do you think now?"}/>
            <button onClick={() => sendPost()}>post</button>
            <div>
                <h3>Your posts:</h3>
                <label>{postsList.length}</label>
                <div>{() => showAllPosts()}</div>
                {
                    postsList.map(item => {
                        return (
                            <div>
                                {
                                    item.post
                                }
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
export default Posts