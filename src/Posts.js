import React from "react";

function Posts() {
    let post

    function setText(event) {
        post = event.target.value
    }

    function sendPost(){
        //לכתוב פונקציה ששולחת לשרת את הפוסט ומאחסנת אותו
    }

    function ShowAllPosts(){
        //לכתוב פונקצייה ששולחת לשרת בקשה לצפות בכל הפוסטים של המשתמש
    }

    return (
        <div>
            <h2>Create New Post:</h2>
            <input onChange={(event) => setText(event)} value={post} placeholder={"what do you think now?"}/>
            <button onClick={sendPost()}>post</button>
            <div>
                <h3>Your posts:</h3>
                <il>
                    1
                    2
                    3
                </il>
            </div>
        </div>
    )
}

export default Posts