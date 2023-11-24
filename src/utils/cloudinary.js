import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary';
import { env } from 'process';

          
cloudinary.config({ 
  cloud_name: process.env.CLOUNINARY_CLOUD_NAME, 
  api_key: process.env.CLOUNINARY_API_KEY, 
  api_secret: process.env.CLOUNINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        // upload the file on cliudinary
       const response=await cloudinary.uploader.upload(localFilePath,
            {
                resource_type:'auto'
            })
            // file has been uploaded succesfull
            console.log('file is uploded on cloudinary',response.url)
            return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally sved temporary file as the upload operation got failed
        return null;
    }
}


export {uploadOnCloudinary}