import { useState } from 'react'
import '/src/components/style/init.style.css'
import { requestAuthorization } from "/APIs/Spotify.js";

function Login() {
  localStorage.setItem("access_token", 0);
  const [data, setData] = useState(
    {
        clien_id: "",
        secret_client: ""
    }
  );

  const handleInputChange = (event)=>{
    setData({
        ...data,
        [event.target.name]:event.target.value
    })
  }

  const sendData = (event) => {
    event.preventDefault();
    requestAuthorization(data.clien_id,data.secret_client)
    console.log(data.clien_id + " " +data.secret_client)
  }

  return (
    <div className="mybody">
      <div className="falseback">
    <div className="Form_Init">
        <h2>
        Request the autorization
        </h2>
        
        <label>Client ID</label>
        <input 
        type="text"
        name="clien_id"
        onChange={handleInputChange} />

        <label>Client Secret</label>
        <input type="text"
        name="secret_client"
        onChange={handleInputChange} />
        <div className='thebutton'><button onClick={sendData} >Submit</button></div>
        

      
    </div>
    </div>
    </div>
  )
}

export default Login
