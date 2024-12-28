import axiosInstance from "./axiosInstance";


//This frontend FormData object received image file under the key "image" and send in a post request to the server
//The backend recives and generate a URL to access the image
const uploadImage=async (imageFile) => {
    //Create new form data object
    const formData=new FormData();
    //Appends the image file to the formData
    formData.append("image", imageFile);
    try {
        //Send a post request to backend with the image inside the formData
        const response= await axiosInstance.post("/upload-image", formData, {
            headers:{
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading the image:", error);
        throw error
    }
    
}
export default uploadImage