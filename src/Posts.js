import React from "react";
import axios from "axios";

function Posts(props) {

    return (
        <div>
            <h2>Create New Post:</h2>
            <input placeholder={"write your post"}
                   onChange={(event) => props.enterText(event, "postToSend")}
                   value={props.postToSend}/>
            <button disabled={props.postToSend.length === 0}
                    onClick={() => props.sendPost()}>post
            </button>
            <div>
                <h3>Your posts:({props.postsList.length})</h3>
                <div>
                    {
                        props.postsList.map(post => {
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
    )
}

export default Posts