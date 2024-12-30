import React, { useEffect, useState } from 'react'
import { MdAdd,MdClose, MdDeleteOutline, MdUpdate  } from "react-icons/md";
import DateSelector from '../../components/Input/DateSelector';
import ImageSelector from '../../components/Input/ImageSelector';
import TagInput from '../../components/Input/TagInput';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import uploadImage from '../../utils/uploadImage';
import {toast} from 'react-toastify'

const AddEditTravelStory = ({storyInfo, type, onClose,getAllTravelStories}) => {
  const [visitedDate, setVisitedDate]= useState(null);
  const[title,setTitle]=useState("");
  const[storyImg, setStoryImg]=useState(null);
  const [story, setStory] = useState("")
  const [visitedLocation,setVisitedLocation]=useState([]);
  const [error, setError] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //Update old story
  const updateTravelStory=async()=>{
    try {
      const id= storyInfo._id;
      let imageUrl="";
      let postData={  
        title, 
        story, 
        imageUrl: storyInfo.imageUrl || "", 
        visitedLocation, 
        visitedDate:visitedDate 
                    ? moment(visitedDate).valueOf() 
                    : moment().valueOf()
      }
      
      if (typeof storyImg=== 'object'
      ) {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || ""; // Update the imageUrl if a new image is selected
        postData={
          ...postData,
          imageUrl:imageUrl
        }
      }
      const response = await axiosInstance.put(`/edit-story/${id}`,
      postData)
      if(response.data){
        toast.success("Story is edited successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      console.log(error)
    }
  };
  //Add new story
  const addNewTravelStory=async()=>{
    try {
      let imageUrl="";
      //Upload image if present
      if(storyImg){
        const imgUploadRes= await uploadImage(storyImg);
        //Get image URL
        imageUrl= imgUploadRes.imageUrl || ""
      }
      const response = await axiosInstance.post("/add-story",{
        title, 
        story, 
        imageUrl: imageUrl||"", 
        visitedLocation, 
        visitedDate:visitedDate ? moment(visitedDate).valueOf() : moment().valueOf()
      })
      if (response.data){
        toast.success("Story Added Successfully");
        getAllTravelStories();
        onClose();
      }
    }catch (error) {
      console.error("Error adding travel story:", error);
    }
  };
  //Handle update or add
  const handleAddorUpdateClick=()=>{
    if(!title){setError("Please enter the title!"); return;}
    if(!story){setError("Please enter the story!"); return;}
    setError("");
    if(type==='edit'){
      updateTravelStory()
    } else addNewTravelStory()
  }
  //Delete story
  const handleDelete=async()=>{
    try {
      const id= storyInfo._id;
      const response= await axiosInstance.delete(`/delete-story/${id}`)
      if(response.data){
        console.log(`Delete ${response.data} sucessfully`)
        getAllTravelStories();
        onClose();
        toast.success("Story is deleted successfully")
      }
    } catch (error) {
      
    }
  };
  useEffect(() => {
    if(storyInfo && type==="edit"){
      setTitle(storyInfo.title)
      setStory(storyInfo.story)
      setStoryImg(storyInfo.imageUrl)
      setVisitedLocation(storyInfo.visitedLocation)
      setVisitedDate(storyInfo.visitedDate)
    } 
  }, [])
  
  return (
    <div>
        <div className='flex items-center justify-between p-5'>
            <h5 className='text-xl font-medium text-slate-700'>
                {type==="add"?"Add Story":"Update Story"}
            </h5>
            <div>
              <div className='flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg'>
               {type==="add" ? 
               (<button className='btn-small' onClick={handleAddorUpdateClick}>
                  <MdAdd className="text-lg" />SAVE STORY
                </button>):(
                <>
                <button className='btn-small' onClick={handleAddorUpdateClick}>
                  <MdUpdate className='text-lg'/>UPDATE STORY
                </button>
                <button className='btn-small btn-delete' onClick={()=>setShowDeleteModal(true)}>
                  <MdDeleteOutline className='text-lg'/>DELETE
                </button>
                </>
                )}
                  <button className='' onClick={onClose}>
                    <MdClose className='text-xl text-slate-400' />
                  </button>
              </div>
              {error && (
                <p className='text-red-500 text-xs pt-2 text-right'>
                  {error}
                </p>
              )}
            </div>
        </div>
        <div>
          <div className='flex-1 flex flex-col gap-2 pt-4 p-5'>
            <label className='input-label'>TITLE</label>
            <input 
            type='text'
            className='text-2xl text-slate-950 outline-none'
            placeholder='A Day at the Great Wall'
            value={title}
            onChange={({target})=>setTitle(target.value)}
            />
            <div className='my-3'>
                <DateSelector date={visitedDate} setDate={setVisitedDate} />
            </div>
            <ImageSelector 
            image={storyImg}
            setImage={setStoryImg}
            />
            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>STORY</label>
                <textarea 
                type="text" 
                className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded' 
                placeholder='Your Story' 
                rows={10} value={story} 
                onChange={({target})=>setStory(target.value)} />
            </div>
            <div className='p-3'>
                <label className='input-label'>VISITED LOCATIONS</label>
                <TagInput tags={visitedLocation} setTags={setVisitedLocation}/>
            </div>
          </div>
        </div>
        {showDeleteModal && (
          <div className='absolute top-0 bg-slate-100/[0.8] w-full h-full '>
            <div className='absolute bg-white h-36 w-[350px] left-1/2 transform -translate-x-1/2 top-1/3 py-10 px-5 rounded-lg '>
                <h4 className='text-lg'>Are you sure you want to delete this story?</h4>
                <div className=" flex justify-center items-center gap-10 mt-5">
                  <button className="btn-small" onClick={handleDelete}>
                    Confirm
                  </button>
                  <button className="btn-delete btn-small" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                  </button>
                </div>
            </div>
          </div>
      )}
      </div>
  )
}

export default AddEditTravelStory