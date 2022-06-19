import { useState, useEffect } from 'react'
import '/src/components/style/list_config.style.css'
import { getCode, getAccessToken,getArtists,mainCreatorAllInOne } from "/APIs/Spotify.js";
import RangeSlider from 'react-bootstrap-range-slider';

function Login() {

  const [ Max_Number_of_Artis, setValue_artist ] = useState(50);
  const [ Max_Number_of_Songs, setValue_Songs ] = useState(50);
  const [Playlist_Name, setData_Playlist] = useState("");
  const [Artist_Name, setData_Artist] = useState("");
  const [Name_list_Artist, setData_to_List] = useState([])
  const [Temporal_list_Artist, setData_temporal] = useState([])
  const listItems = Name_list_Artist.map((artist) =><li key={artist.toString()}>{<div className='artista_lista'>{artist}</div>}</li>);
const listArtist = Temporal_list_Artist.map((artist) =>//key={artist.name.toString()}

  <li >{<div className='artista'>{artist.name}</div>}</li>
);
  const handleInputChange_Playlist = (event)=>{
    setData_Playlist(
        
        event.target.value
    )
    console.log(Playlist_Name)
  }

  const handleInputAdd_Artist = async (event) => {
    setData_Artist(event.target.value)
  }

  const load_data_artist = async () =>{
    let list_temporal = null;
    
    if(Artist_Name !== ""){
      list_temporal = await getArtists(Artist_Name);
    }
    
    if (list_temporal !== null ){
      setData_temporal(list_temporal["data"]["artists"]["items"]);
      
    }else{
      setData_temporal([])
    }

  }
  useEffect( () => {
    
    load_data_artist()
    
  },[Artist_Name])
  
  const sendData = async (Code) => {
    
    const result = await getAccessToken(Code)
    
  }
  useEffect(() => {

    if (localStorage.getItem("access_token") === "0") {
        let Code = getCode();
        sendData(Code)
    }
    
    
  },[])
  const add_artist_to_list = ()=>{
    setData_to_List([...Name_list_Artist,Artist_Name])
    console.log(Artist_Name);
    console.log(Name_list_Artist);
  }

  const create_the_list = ()=>{
    mainCreatorAllInOne(Playlist_Name,Max_Number_of_Artis,Max_Number_of_Songs,Name_list_Artist)
  }

  // vv Render vv
  return (
    <div>
    <div className="mybody_config">
      <div className="false_config">
        <h2>
          Configure your new Playlist
        </h2>
    
        <div className="Form_config">
          <div className='left_items'>
            <label>Max Number of Artist in Final Playlist</label>
            <div> <RangeSlider
                value={Max_Number_of_Artis}
                variant="success"
//TODO put the minimum in the number of the current artist.
                min={5}
                max={200}
                onChange={e => setValue_artist(e.target.value)}
            /></div>
            <label>Max Number of Songs in Final Playlist</label>
            <div> <RangeSlider
                value={Max_Number_of_Songs}
                min={25}
                max={9999}
                onChange={e => setValue_Songs(e.target.value)}
                />
            </div>
            <label>Name of the Playlist</label>
            <input type="text"
              onChange={handleInputChange_Playlist} />
          </div>
          <div className='center_items'>
            <div id="container" className="better_scrollbar">
              <ul>{listItems}</ul>
            </div>
          </div>
          <div className='rigth_items'>
            <label>Search the Artists</label>
            <div className='searcher'>
              <input type="text"
                onChange={handleInputAdd_Artist} />
                <button onClick={add_artist_to_list} >Add</button>
            </div>
            <div id="container_2" class="better_scrollbar">
              <ul>{listArtist}</ul>
            </div>      
          </div>
        </div>
        <div className='sender'><button onClick={create_the_list} >Create the list based in the configuration!</button></div>
        
      </div>
    </div>

    </div>
    
  );
}

export default Login
