import React,{useRef,useState, useEffect} from 'react'
import { FaRegFileImage} from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md';
const ImageSelector = ({image, setImage}) => {
    const inputRef= useRef(null);
    const [previewUrl, setPreviewUrl]= useState(null);
    const handleImageChange=(event)=>{
        const file=event.target.files[0]; //Access the first file selected
        if(file){setImage(file)}
    };
    {/*This function stimulate a click on the hidden file input element, which triggers the file picker dialog*/}
    const onChooseFile=()=>{
        inputRef.current.click();
    }
    // if the image is server-provided URL-> set image as previewURL , a locally selected file-> create a temporary URL, then set previewURL as that tem URL, or cleared entirely-> set null
    //Clear up function:
    useEffect(() => {
    if(typeof image==='string'){
        setPreviewUrl(image)
    } else if(image){
        setPreviewUrl(URL.createObjectURL(image))
    } else{
        setPreviewUrl(null)
    }
      return () => {
        // This is to clear the url used for image was chosen but removed (image is removed)
        if(previewUrl && typeof previewUrl==="string" && !image){
            URL.revokeObjectURL(previewUrl)
        }
      }
    }, [image])
    
  return (
    <div>
        {/*The file input element, allowing users to choose an image file from their device*/}
        <input 
            type='file'
            accept='image/*'
            ref={inputRef}
            onChange={handleImageChange}
            className='hidden'
        />
        { !image ? 
            // The button is visible to users and trigger the onChooseFile function when click
            (<button className='w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50' onClick={()=>onChooseFile()}>
                <div className='w-14 h-14 bg-cyan-50 border items-center flex justify-center rounded-full gap-4'>
                    <FaRegFileImage className='text-xl text-cyan-500'/>
                </div>
                <p className='text-sm text-slate-500'>
                    Browse image files to upload
                </p>
            </button>):(
            <div>
                <img 
                src={previewUrl}
                alt='Selected'
                className=''
                />
            </div>)}
    </div>
  )
}

export default ImageSelector