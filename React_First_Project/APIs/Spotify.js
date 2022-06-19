import axios from "axios";

const redirect_uri = "http://localhost:3000/config";
const TOKEN = "https://accounts.spotify.com/api/token";

export const requestAuthorization = (client_id, client_secret) => {
  localStorage.setItem("client_id", client_id);
  localStorage.setItem("client_secret", client_secret);

  let url = "https://accounts.spotify.com/authorize";
  url += "?client_id=" + client_id;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirect_uri);
  url += "&show_dialog=true";
  url +=
    "&scope=playlist-modify-public playlist-modify-private user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
  window.location.href = url;
};

export function getCode() {
  let code = null;
  const queryString = window.location.search;
  if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get("code");
  }

  return code;
}

export function getAccessToken(code) {
  let client_id = localStorage.getItem("client_id");
  let client_secret = localStorage.getItem("client_secret");
  let body = "grant_type=authorization_code";
  body += "&code=" + code;
  body += "&redirect_uri=" + encodeURI(redirect_uri);
  body += "&client_id=" + client_id;
  body += "&client_secret=" + client_secret;
  callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
  let client_id = localStorage.getItem("client_id");
  let client_secret = localStorage.getItem("client_secret");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", TOKEN, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader(
    "Authorization",
    "Basic " + btoa(client_id + ":" + client_secret)
  );
  xhr.send(body);
  xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    var data = JSON.parse(this.responseText);
    localStorage.setItem("data", data);

    if (data["access_token"] != undefined) {
      let access_token = data["access_token"];
      localStorage.setItem("access_token", access_token);
    }
    if (data["refresh_token"] != undefined) {
      let refresh_token = data["refresh_token"];
      localStorage.setItem("refresh_token", refresh_token);
    }
  } else {
    console.log(this.responseText);
  }
}

export const getArtists = async (artist_name) => {
  var config = {
    method: "get",
    url:
      "https://api.spotify.com/v1/search?q=artist%3A" +
      encodeURI(artist_name) +
      "&type=artist&market=ES&limit=10&offset=0",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  try {
    const result = JSON.stringify(await axios(config));
    return JSON.parse(result);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getTheArtists = async (artist_name) => {
  var config = {
    method: "get",
    url:
      "https://api.spotify.com/v1/search?q=artist%3A" +
      encodeURI(artist_name) +
      "&type=artist&market=ES&limit=1&offset=0",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  try {
    const result = JSON.stringify(await axios(config));
    return JSON.parse(result);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getTheTopSongs = async (artist_id) => {
  var config = {
    method: "get",
    url:
      "https://api.spotify.com/v1/artists/" +
      encodeURI(artist_id) +
      "/top-tracks?market=ES",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  try {
    const result = JSON.stringify(await axios(config));
    return JSON.parse(result);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getTheRelatedArtist = async (artist_id) => {
  var config = {
    method: "get",
    url:
      "https://api.spotify.com/v1/artists/" +
      encodeURI(artist_id) +
      "/related-artists",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  try {
    const result = JSON.stringify(await axios(config));
    return JSON.parse(result);
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const getUserID = async () => {
  var config = {
    method: "get",
    url: "https://api.spotify.com/v1/me",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  try {
    const result = JSON.stringify(await axios(config));
    return JSON.parse(result);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const createTheList = async (Playlist_Name, user_id) => {
  var data = JSON.stringify({
    name: Playlist_Name,
    description: "Enjoy the music to the fullest",
    public: false,
  });

  var config = {
    method: "post",
    url:
      "https://api.spotify.com/v1/users/" + encodeURI(user_id) + "/playlists",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    data: data,
  };
  try {
    const result = JSON.stringify(await axios(config));
    return JSON.parse(result);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const AddSongToTheList = async (Playlist_id, Array_Of_Songs_Uris) => {
  var config = {
    method: "post",
    url:
      "https://api.spotify.com/v1/playlists/" +
      encodeURI(Playlist_id) +
      "/tracks?uris=" +
      encodeURIComponent(Array_Of_Songs_Uris.join(",")),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  try {
    const result = JSON.stringify(await axios(config));
    return JSON.parse(result);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const obtainerOfUrisArtists = async (listOfArtis) => {
  let list_of_uris = [];
  for (const Artist_Name in listOfArtis) {
    let uri = await getTheArtists(listOfArtis[Artist_Name]);

    list_of_uris.push(uri.data.artists.items[0].id);
  }
  return list_of_uris;
};

const obtainerOfRelatedUris = async (listOfArtis) => {
  let list_of_uris = [];

  for (const Artist_Name in listOfArtis) {
    let uri = await getTheRelatedArtist(listOfArtis[Artist_Name]);

    list_of_uris = list_of_uris.concat(
      uri.data.artists.map((artist) => {
        return artist.id;
      })
    );
  }

  return list_of_uris;
};

const obtainerOfUrisSong = async (listOfArtis, Max_Number_of_Songs) => {
  let list_of_uris = [];

  for (const Artist_Name in listOfArtis) {
    let uri = await getTheTopSongs(listOfArtis[Artist_Name]);

    list_of_uris = list_of_uris.concat(
      uri.data.tracks.map((artist) => {
        return artist.uri;
      })
    );
    if (list_of_uris.length > Max_Number_of_Songs) {
      break;
    }
  }

  return list_of_uris;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const creatorOfPlaylist = async (
  Playlist_Name,
  User_Id,
  Array_Of_Songs_Uris
) => {
  let response = await createTheList(Playlist_Name, User_Id);
  console.log(response.data.id);
  console.log(Array_Of_Songs_Uris.length);

  for (const index in [
    ...Array(Math.ceil(Array_Of_Songs_Uris.length / 50)).keys(),
  ]) {
    console.log("Sliders ", index * 50, (parseInt(index) + 1) * 50);

    let respones = await AddSongToTheList(
      response.data.id,
      Array_Of_Songs_Uris.slice(index * 50, (parseInt(index) + 1) * 50)
    );
    //let counter = await new Promise((r) => setTimeout(r, 1000));
    //console.log("counter", " ", counter);
  }
};

export const mainCreatorAllInOne = async (
  Playlist_Name,
  Max_Number_of_Artis,
  Max_Number_of_Songs,
  Name_list_Artist
) => {
  let Array_Of_Uris = await obtainerOfUrisArtists(Name_list_Artist);
  let Array_Of_Related_Uris = await obtainerOfRelatedUris(Array_Of_Uris);
  Array_Of_Uris = Array_Of_Uris.concat(Array_Of_Related_Uris);
  Array_Of_Uris = [...new Set(Array_Of_Uris)]; //Removing duplicates
  if (Array_Of_Uris.length > Max_Number_of_Artis) {
    Array_Of_Uris = Array_Of_Uris.slice(0, Max_Number_of_Artis);
  }
  let Array_Of_Songs_Uris = await obtainerOfUrisSong(
    Array_Of_Uris,
    Max_Number_of_Songs
  );
  if (Array_Of_Songs_Uris.length > Max_Number_of_Songs) {
    Array_Of_Songs_Uris = Array_Of_Songs_Uris.slice(0, Max_Number_of_Songs);
  }
  let User_Id = await getUserID();
  User_Id = User_Id.data.id;
  let Created = await creatorOfPlaylist(
    Playlist_Name,
    User_Id,
    Array_Of_Songs_Uris
  );
};
