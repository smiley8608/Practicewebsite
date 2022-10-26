import axios from "axios";
import React, { FormEvent, useState } from "react";
import path from "react-router";

export const Uplodeimages = () => {

    const [image,setImage]=useState<any>()
    const [imageUrl,setImageUrl]=useState()

    useEffect=()=>{
        
        const newImageUrl=[]
        image.foreach()
    }

    const onImageChange=(e:any)=>{
        setImage([...e.target.files])
    }

  return <div>
    uplode imaGes
    <form method="POST" action="http://localhost:3005/multer/uploade" encType="multipart/form-data" >
    <input type="file" multiple accept="image/*" onChange={onImageChange} />
    

        <input type='submit'/>
    </form>

  </div>;
};
