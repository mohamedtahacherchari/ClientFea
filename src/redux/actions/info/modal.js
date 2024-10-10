
export const closeInfo =()=>{
  console.log("you closed the info and removed info state")
    return {
        type: "CLOSE_INFO"
    }
}

export const  closeModal = ()=>{
  console.log("modal is closed")
   return {
     type: "CLOSE_MODAL",
     payload: false
   }
}

export const  openModal = ()=>{
  console.log("modal is open")
    return {
      type: "OPEN_MODAL",
      payload: true
    }
 }