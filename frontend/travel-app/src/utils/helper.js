export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


export const getInitials =(name)=>{
  if(!name){
    return ""};
  return name.charAt(0).toUpperCase()
}