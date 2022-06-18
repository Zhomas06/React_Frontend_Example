const redirect_uri = "http://localhost:3000/config"; 
const TOKEN = "https://accounts.spotify.com/api/token";

export const requestAuthorization =  (client_id,client_secret) => {
    
    
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); 

    let url = "https://accounts.spotify.com/authorize";
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; 
    
}

export function getCode(){
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    
    return code;
}

export function getAccessToken( code ){
    let client_id = localStorage.getItem("client_id")
    let client_secret = localStorage.getItem("client_secret")
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    let client_id = localStorage.getItem("client_id")
    let client_secret = localStorage.getItem("client_secret")
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        var data = JSON.parse(this.responseText);
        localStorage.setItem("data", data);

        if ( data["access_token"] != undefined ){
            let access_token = data["access_token"];
            localStorage.setItem("access_token", access_token);
        }
        if ( data["refresh_token"]  != undefined ){
            let refresh_token = data["refresh_token"] ;
            localStorage.setItem("refresh_token", refresh_token);
        }
        
    }
    else {
        console.log(this.responseText);
    }
}