var sendText=document.getElementById("sendText");
var msg_id=document.getElementById("msg_id");
var userName=document.getElementById("userName");
// var signupBtn=document.getElementById("signupBtn");
var session=false;
var userNam="";


const database=firebase.database();
const rootRef=database.ref('chat_app')


function SendMsg(){
if(sendText.value!==""){
console.log(sendText.value)
database.ref('/chat_app/').push({
    user: userNam,
    message: sendText.value
});
sendText.value="";

document.getElementById("chatbox").scrollTo(0,document.getElementById("chatbox").clientHeight);
}
}


function showMsg(){
// 
if(session){
rootRef.on('value', function(data){
    msg_id.innerHTML=""
 
data.forEach((childData) => {
    var childDataKey=childData.key;
    var childDataValue=childData.val();

    console.log("sender "+childDataValue['user'] )
    console.log("message "+childDataValue['message'] )

    var li=document.createElement("li");
    var br1=document.createElement("br");
    var b=document.createElement("b");
    b.innerHTML = childDataValue['user'];

    if(childDataValue['user']===userNam){

      
            li.setAttribute("class","msg1")
    // var li_text=document.createTextNode(childDataValue['message']+" : " +childDataValue['user']);
    var li_text=document.createTextNode(childDataValue['message']+" : " );
    
    li.appendChild(li_text);
    li.appendChild(b)
    
    }else{
        li.setAttribute("class","msg2")
        var li_text=document.createTextNode(" : "+childDataValue['message']);
        li.appendChild(b)
        li.appendChild(li_text);
       
    }
    msg_id.appendChild(li);
    msg_id.appendChild(br1);


});

document.getElementById("chatbox").scrollTo(0,document.getElementById("chatbox").clientHeight);

});

}
}

showMsg();

function signup(){
console.log("here")

var provider = new firebase.auth.FacebookAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log("value ", user.displayName)
userName.innerHTML=user.displayName;
    document.getElementById("signupBtn").disabled=true;
    document.getElementById("sendText").disabled=false;
    document.getElementById("sendBtn").disabled=false;
    userNam=user.displayName;
    session=true;
    showMsg();


  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log(error.message)
  });


}



