import React from "react";
function Feed(props){

    return (
        <div>
            <h3 className={"headline"}>Your Feed: <br/> {props.feed.length} last post shown<br/>
                <button onClick={() => props.showFeed()}>Refresh</button></h3>
            <div>
                {
                    props.feed.map(post => {
                        return (
                            <div>
                                <h2>
                                    {post.post}
                                </h2>
                                <h6>by {post.username} at {post.time}</h6>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Feed