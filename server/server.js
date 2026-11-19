// import {app} from './app.js';
import "dotenv/config";
import {app} from './app.js'
import {v2 as  cloudinary } from "cloudinary"

// cloudinary.uploader
//   .upload("my_image.jpg")
//   .then(result=>console.log(result));

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET
})

const PORT = process.env.PORT || 4000;

app.listen(process.env.PORT, () => {
    
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})

// console.log('Server is running on port ' );