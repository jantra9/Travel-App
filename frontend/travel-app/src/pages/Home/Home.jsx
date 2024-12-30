import React, { useEffect,useState } from 'react'
import Navbar from '../../components/Input/Navbar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import TravelStoryCard from '../../components/Cards/TravelStoryCard';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {MdAdd} from 'react-icons/md'
import Modal from 'react-modal';
import AddEditTravelStory from './AddEditTravelStory';
import EmptyCard from '../../components/Cards/EmptyCard';

const Home = () => {
  const navigate= useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories]=useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [openAddEditModal, setOpenAddEditModal]=useState({
    isShown:false,
    type:"add",
    data:null,
  });

  //Get User Info
  const getUserInfo= async()=>{
    try {
      const response= await axiosInstance.get("/get-user");
      if(response.data){
        setUserInfo(response.data)
      }

    } catch (error) {
      if(error.response.status ===401){
        localStorage.clear();
        navigate("/login")
      }
    };
  };
  //Get All Stories
  const getAllTravelStories=async()=>{
    try {
      const response= await axiosInstance.get("/get-stories");
      if(response.data ){
        setAllStories(response.data)
      }
    } catch (error) {
      console.log("An unexpected error occurred, please try agian.")
    }
  };
  //Handle Edit Story Click
  const handleEdit=(data)=>{}
  //Handle Travel Story Click
  const handleViewStory=(data)=>{
    setOpenAddEditModal({isShown:true, type:"edit",data:data})
  }
  //Handle Update Favorite
  const updateIsFavorite = async (storyData) => {
    const storyId = storyData._id;
    try {
      const response = await axiosInstance.post(`/is-favorite/${storyId}`, {
        isFavorite: !storyData.isFavorite,
      });
      if (response.data) {
        // Successfully updated the favorite status; refresh the list of stories
        toast.success("Story Updated Successfully")
        getAllTravelStories();
      }
    } catch (error) {
      // Log detailed error message for better debugging
      console.error("Error updating favorite status for story ID:", storyId, error);
    }
  };
  //Handle real-time search
  const handleSearch=(e)=>{
    const searchInput= e.target.value;
    setSearchValue(searchInput)
    const filteredItems= allStories.filter((story)=>
      story.title.toLowerCase().includes(searchInput.toLowerCase()) || 
      story.story.toLowerCase().includes(searchInput.toLowerCase())
    );
      setFilteredStories(filteredItems)  
  };
  //Hanle clear the search input
  const handleClear=()=>{
    setSearchValue("");
    setFilteredStories(allStories)
  };
  //Use Effect to activate the functions
  useEffect(()=>{
    getUserInfo();
    getAllTravelStories();
    return()=>{};
  },[]);
  return (
  <>
    <Navbar 
    userInfo={userInfo} 
    handleSearch={handleSearch} 
    searchValue={searchValue}
    setSearchValue={setSearchValue}
    handleClear={handleClear}
     />
    <div className='container mx-auto py-10 '>
      <div className='flex gap-7'>
          {allStories.length>0 ? (
            <div className='grid grid-cols-3 gap-4'>
             {!searchValue ? 
              allStories.map((item) => (
                <TravelStoryCard 
                  key={item._id}
                  imgUrl={item.imageUrl}
                  title={item.title}
                  story={item.story}
                  date={item.visitedDate}
                  location={item.visitedLocation}
                  isFavorite={item.isFavorite}
                  onEdit={() => handleEdit(item)}
                  onClick={() => handleViewStory(item)}
                  onFavoriteClick={() => updateIsFavorite(item)} 
                />
              )) : 
              filteredStories.map((item) => (
                <TravelStoryCard 
                  key={item._id}
                  imgUrl={item.imageUrl}
                  title={item.title}
                  story={item.story}
                  date={item.visitedDate}
                  location={item.visitedLocation}
                  isFavorite={item.isFavorite}
                  onEdit={() => handleEdit(item)}
                  onClick={() => handleViewStory(item)}
                  onFavoriteClick={() => updateIsFavorite(item)} 
                />
              ))
            }
            </div>
          ):(<EmptyCard message="Start creating your first travel story"></EmptyCard>)}
        </div>
    </div>
    {/* Add and Edit Travel Story Model */}
    <Modal
      isOpen={openAddEditModal.isShown}
      onRequestClose={()=>{setOpenAddEditModal({ isShown: false, type: "data", data: null });}}
      style={{
        overlay:{
          backgroundColor:"rgba(0,0,0,0.5)",
          zIndex:99,
        },
      }}
      appElement={document.getElementById("root")}
      className="model-box"
      >
        <AddEditTravelStory
        type={openAddEditModal.type}
        storyInfo={openAddEditModal.data}
        onClose={()=>{
          setOpenAddEditModal({isShown:false, type:"data", data:null})
        }}
        getAllTravelStories={getAllTravelStories}
        />
    </Modal>
    <button className='w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10' onClick={()=>{
      setOpenAddEditModal({isShown:true, type:"add",data:null});
    }}>
      <MdAdd className="text-[32px] text-white" />
    </button>
    <ToastContainer />
  </>
  )
}
export default Home