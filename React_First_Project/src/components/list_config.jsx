import { useState, useEffect } from 'react'
import '/src/components/style/list_config.style.css'
import { getCode, getAccessToken } from "/APIs/Spotify.js";
import RangeSlider from 'react-bootstrap-range-slider';

function Login() {

    
  
  const [ Max_Number_of_Artis, setValue_artist ] = useState(50);
  const [ Max_Number_of_Songs, setValue_Songs ] = useState(50);
  const [Playlist_Name, setData_Playlist] = useState("");
  const [Name_list_Artist, setData_to_List] = useState(["El chaco", "El ROJO", "El Papu"])
  const listItems = Name_list_Artist.map((artist) =>
  
  <li key={artist.toString()}>{artist}</li>
);
  const handleInputChange_Playlist = (event)=>{
    setData_Playlist(
        
        event.target.value
    )
    console.log(Playlist_Name)
  }
  const sendData = async (Code) => {
    
    const result = await getAccessToken(Code)
    
  }
  useEffect(() => {

    if (localStorage.getItem("access_token") === "0") {
        let Code = getCode();
        sendData(Code)
    }
    
    
  },[])
  const testeo = ()=>{
    console.log("Max_Songs", Max_Number_of_Songs,"Max_Artists", Max_Number_of_Artis," ", Playlist_Name, localStorage.getItem("access_token"))
  }




  // -------------------------
  return (
    <div>
    <div className="mybody_config">
      <div className="false_config">
        <h2>
          Configure your new list
        </h2>
    
        <div className="Form_config">
          <div className='left_items'>
            <label>Max Number of Artist in Final Playlist</label>
            <div> <RangeSlider
                value={Max_Number_of_Artis}
                variant="success"
//TODO put the minimum in the number of the current artist.
                min={5}
                onChange={e => setValue_artist(e.target.value)}
            /></div>
            <label>Max Number of Songs in Final Playlist</label>
            <div> <RangeSlider
                value={Max_Number_of_Songs}
                min={25}
                max={1200}
                onChange={e => setValue_Songs(e.target.value)}
                />
            </div>
            <label>Name of the Playlist</label>
            <input type="text"
              onChange={handleInputChange_Playlist} />
          </div>
          <div className='center_items'>
            <ul>{listItems}</ul>
          </div>
          <div className='rigth_items'>Buscador</div>
        </div>
        <button onClick={testeo} >Submit</button>
      </div>
    </div>

    </div>
    
  );
}

export default Login
