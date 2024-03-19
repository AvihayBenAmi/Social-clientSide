import React, {useState} from 'react';

function ImageInput() {
    const [imageUrl, setImageUrl] = useState('');

    const handleInputChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleButtonClick = () => {
        if (imageUrl.trim() !== '') {
            document.getElementById('image').src = imageUrl;
        }
    };

    return (
        <div>
            <img id="image" style={{maxWidth: '200px', maxHeight: '200px'}}/>
            <br/>
            <lable className={"headline"}>Upload or update your profile photo:</lable>
            <br/>
            <input type="text" placeholder="enter your url photo adress" value={imageUrl} onChange={handleInputChange}/>
            <button onClick={handleButtonClick}>Upload</button>
        </div>
    );
}

export default ImageInput;
