var container=document.getElementById("comment-widget");
var bootstraplink = document.createElement( "link" );
var localStorageElement=JSON.parse(localStorage.getItem('comments'));
var localStorageUser=JSON.parse(localStorage.getItem('users'));
bootstraplink.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
bootstraplink.type = "text/css";
bootstraplink.rel = "stylesheet";
document.getElementsByTagName( "head" )[0].appendChild( bootstraplink );
var falink=document.createElement("link");
falink.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
falink.type="text/css";
falink.rel="stylesheet";
document.getElementsByTagName( "head" )[0].appendChild( falink );
container.style.marginLeft="auto";
container.style.marginRight="auto";
container.style.marginTop="20px";
container.classList.add("row");
container.style.width='100%';
var user=0;
var userType=0;
var myuser={};
var imageValue=1;
var userHandle=""
var rt;
var pc;
displaycomments();
//Every comment will have handle, timestamp, avatar, replyto, id, parentcomment, dist
//Every user will have handle, avatar, upvoted and downvoted arrray
function displaycomments(){
    if(localStorageElement!=null){
        container.innerHTML="";
      localStorageElement=JSON.parse(localStorage.getItem('comments'));
      localStorageElement.forEach(function(comment) {
        //Comment handling will be done here  
        var currentDateString=" "+new Date().toLocaleString();


        var commentDateString=" "+comment.timestamp;
        
        var year=commentDateString.substring(
            commentDateString.lastIndexOf("/") + 1, 
            commentDateString.lastIndexOf(",")
        );
        var month=commentDateString.substring(
            commentDateString.indexOf(" ") + 1, 
            commentDateString.indexOf("/")
        );
        var day=commentDateString.substring(
            commentDateString.indexOf("/") + 1, 
            commentDateString.lastIndexOf("/")
        );
        var hour=commentDateString.substring(
            commentDateString.indexOf(", ") + 1, 
            commentDateString.indexOf(":")
        );
        var minute=commentDateString.substring(
            commentDateString.indexOf(":") + 1, 
            commentDateString.lastIndexOf(":")
        );
        var second=commentDateString.substring(
            commentDateString.lastIndexOf(":") + 1, 
            commentDateString.lastIndexOf(" ")
        );

        var year1=currentDateString.substring(
            currentDateString.lastIndexOf("/") + 1, 
            currentDateString.lastIndexOf(",")
        );
        var month1=currentDateString.substring(
            currentDateString.indexOf(" ") + 1, 
            currentDateString.indexOf("/")
        );
        var day1=currentDateString.substring(
            currentDateString.indexOf("/") + 1, 
            currentDateString.lastIndexOf("/")
        );
        var hour1=currentDateString.substring(
            currentDateString.indexOf(", ") + 1, 
            currentDateString.indexOf(":")
        );
        var minute1=currentDateString.substring(
            currentDateString.indexOf(":") + 1, 
            currentDateString.lastIndexOf(":")
        );
        var second1=currentDateString.substring(
            currentDateString.lastIndexOf(":") + 1, 
            currentDateString.lastIndexOf(" ")
        );

        var currentDate= new Date(year1,month1-1,day1,hour1,minute1,second1,0);

        var commentDate= new Date(year,month-1,day,hour,minute,second,0);
        var currentTime=currentDate.getTime();
        
        commentTime=commentDate.getTime();
        var timeDiff= (currentTime-commentTime)/1000;
        var finalTime=findFinalTime(timeDiff);
        var finalHandle=comment.handle;
        var finalAvatar="avatars/"+comment.avatar+".png";
        var finalDist=(Number(comment.dist)*5)+"%";
        
        var finalID=comment.id;
        var finalComment=comment.text;
        var finalUpvote=comment.upvote;
        var finalDownvote=comment.downvote;
        var finalReplyTo=comment.replyto;
        var finalParentComment=comment.parentcomment;
        console.log(finalReplyTo);
        var parentElement=document.getElementById(finalParentComment);
        var finalString="",finalString1="",finalString2="";

        finalString1='<div style="width:100%;margin-top:10px;margin-left:'+finalDist+'" class="row" id="'+finalID+'"><div class="col-1" style="margin-left:10px;"><img src="'+finalAvatar+'" style="width:70px;height:70px;border:1px solid black;float:left"></div><div style="float:left;margin-left:20px;max-width:80%;display:inline-block"><div style="height: 20px;margin-left:10px;"><span><a href="#" >'+finalHandle+'</a></span>';
        if(finalReplyTo.length>0){
        finalString2='<span style="margin-left:10px"><i class="fa fa-reply" style="padding:3px;"></i>'+finalReplyTo+'</span>';
        }
        finalString3='<span style="margin-left:10px;color:grey">'+finalTime+'</span></div><div style="height: 30px;margin-left:10px;overflow-wrap:break-word;display:inline-block;">'+finalComment+'</div><div style="height:20px;margin-left:10px;color:grey"><span style="margin-left:5px" id="'+finalID+'uc" >'+finalUpvote+'</span><i class="fa fa-chevron-up" style="margin-left:5px;margin-right:5px" id="'+finalID+'u" onclick="increaseVote('+finalID+')"></i><span>|</span><span style="margin-left:5px" id="'+finalID+'dc">'+finalDownvote+'</span><i class="fa fa-chevron-down" id="'+finalID+'d" style="margin-left:5px" onclick="decreaseVote('+finalID+')"></i><a style="margin-left:10px" href="#comment" onclick="sendReply('+finalID+')">Reply</a></div></div></div>';
        finalString=finalString1+finalString2+finalString3;
        if(finalParentComment!=""){
        insertAfter(createElementFromHTML(finalString),parentElement);
        }
        else
        {
            container.insertAdjacentHTML('beforeend', finalString);
        }
        if(userHandle!=null){
        localStorageUser.forEach(function(u1){
            if(u1.handle==userHandle){
                if(u1.upvotedarr.includes(finalID)){
                    document.getElementById(finalID+"u").style.color="blue";
                    document.getElementById(finalID+"uc").style.color="blue";
                }
            }
        });
        localStorageUser.forEach(function(u1){
            if(u1.handle==userHandle){
                if(u1.downvotedarr.includes(finalID)){
                    document.getElementById(finalID+"d").style.color="red";
                    document.getElementById(finalID+"dc").style.color="red";
                }
            }
        });
    }

        });
        
}
displayRest(user);
}

function increaseVote(x){
    if(userHandle!=null){
    console.log("IN");
    localStorageElement.forEach(function(c1) {
        if(c1.id==x){
            
            localStorageUser.forEach(function(u1){
                if(u1.handle==userHandle){
                    console.log(userHandle);
                    if(!u1.upvotedarr.includes(x)){
                    u1.upvotedarr.push(x);
                    var index = u1.downvotedarr.indexOf(x);
                if (index > -1) {
                    u1.downvotedarr.splice(index, 1);
                    var xyz=Number(c1.downvote)-1;
                    c1.downvote=xyz.toString();
                }
                var abc=Number(c1.upvote)+1;
            c1.upvote=abc.toString();
            console.log(c1.upvote);
                    }

                }
            });
        }
    });
    localStorage.setItem('comments',JSON.stringify(localStorageElement));
    localStorage.setItem('users',JSON.stringify(localStorageUser));
    displaycomments();
}
}

function decreaseVote(x){
    if(userHandle!=null){
    console.log("IN");
    localStorageElement.forEach(function(c1) {
        if(c1.id==x){
            console.log(c1.downvote);
            
            console.log(c1.downvote);
            localStorageUser.forEach(function(u1){
                if(u1.handle==userHandle){
                    if(!u1.downvotedarr.includes(x)){
                    u1.downvotedarr.push(x);
                    var index = u1.upvotedarr.indexOf(x);
                if (index > -1) {
                    u1.upvotedarr.splice(index, 1);
                    var xyz=Number(c1.upvote)-1;
                    c1.upvote=xyz.toString();
                }
                var abc=Number(c1.downvote)+1;
            c1.downvote=abc.toString();

                    }
                }
            });
        }
    });
    localStorage.setItem('comments',JSON.stringify(localStorageElement));
    localStorage.setItem('users',JSON.stringify(localStorageUser));
    displaycomments();
}
}

function sendReply(x){
    localStorageElement.forEach(function(c1) {
        if(c1.id==x){
            rt=c1.handle;
            pc=x;
            document.getElementById("comment").placeholder = "Replying to "+rt;
        }
    });


}

function chooseFunc(x){
    userType=x;
    displayRest(0);
}

function displayRest(x){
    if(x==0){
        var str='<div id="typeOfUser" class="row" style="width:100%;margin-top:10px"><div class="col-2"></div><div class="col-4"><button class="btn btn-danger" style="width:100%" onclick="chooseFunc(1)">New User</button></div><div class="col-4"><button class="btn btn-warning" onclick="chooseFunc(2)" style="width:100%">Existing User</button></div><div class="col-2"></div></div>';
        var string='<div id="joinDiscussionForm" style="width:100%;margin-top:10px" class="row"><div class="col-3"></div><div class="col-6"><input class="form-control" type="text" name="handle" id="handle" placeholder="Your handle" style="width:100%;"></input><br><h3 class="display-6">Choose Avatar</h3><br><div class="row"><div class="col-3"><button class="btn" onclick="setAvatar(1)"><img class="img-fluid" src="avatars/1.png"></button></div><div class="col-3"><button class="btn" onclick="setAvatar(2)"><img class="img-fluid" src="avatars/2.png"></button></div><div class="col-3"><button class="btn" onclick="setAvatar(3)"><img class="img-fluid" src="avatars/3.png"></button></div><div class="col-3"><button class="btn" onclick="setAvatar(4)"><img class="img-fluid" src="avatars/4.png"></button></div></div></div><div class="col-3"></div><div style="margin-left:auto;margin-right:auto;"><button class="btn btn-primary" style="margin-left:auto;margin-right:auto;width:200px;margin-top:10px;" onclick="addhandle()">Join the Discussion</button></div></div>';
        if(userType==0){
        container.insertAdjacentHTML('beforeend', str);
        }else if(userType==1){
            container.insertAdjacentHTML('beforeend', string);
            document.getElementById("typeOfUser").style.display="none";
        }else{
            string='<div id="joinDiscussionForm" style="width:100%;margin-top:10px"><div style="width:60%;margin-left:auto;margin-right:auto"><input class="form-control" id="handle" style="width:100%" placeholder="Your handle"></input></div><br><div style="width:50%;margin-left:auto;margin-right:auto"><button class="btn btn-primary" onclick="joinHandle()" style="width:100%">Join</button></div></div>';
            container.insertAdjacentHTML('beforeend', string);
            document.getElementById("typeOfUser").style.display="none";
        }
    }else{
        var string='<textarea rows="2" cols="200"  id="comment" placeholder="Your comment" style="margin-top:10px;"></textarea><button class="btn btn-primary" style="margin-top:10px;" onclick="addcomment()">Post</button>';
        container.insertAdjacentHTML('beforeend', string);
    }
}

function joinHandle(){
    enteredHandle=document.getElementById("handle").value;
    if(localStorageUser==null){
        localStorageUser=[];
    }
    var flag=0;
    localStorageUser.forEach(function(user1) {
        if(user1.handle==enteredHandle){
            flag=1;
            user=1;
            myuser.handle=enteredHandle;
            myuser.avatar=user1.avatar;
            imageValue=user1.avatar;
            userHandle=enteredHandle;
            document.getElementById("joinDiscussionForm").style.display="none";
            displayRest(1);
            displaycomments();
        }
     });
     if(flag==0){
         alert("No such user exists");
     }
}

function addhandle(){
    if(localStorageUser==null){
        localStorageUser=[];
    }
    var flag=0;
    enteredHandle=document.getElementById("handle").value;
    console.log(enteredHandle);
    localStorageUser.forEach(function(user) {
        if(user.handle==enteredHandle){
            flag=1;
        }
     });
         var obj={};
         obj.handle=enteredHandle;
         obj.avatar=imageValue;
         obj.upvotedarr=[];
         obj.downvotedarr=[];
         myuser.handle=enteredHandle;
         userHandle=enteredHandle;
         myuser.avatar=imageValue;
         user=1;
        localStorageUser.push(obj);
        localStorage.setItem('users',JSON.stringify(localStorageUser));
        document.getElementById("joinDiscussionForm").style.display="none";
        displayRest();
     
}

function setAvatar(x){
    imageValue=x;
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild; 
  }

function findFinalTime(diff){
if(diff<60){
    return "a few seconds ago";
}else if(diff<3600){
    var div=Math.floor(diff/60);
    if(div==1)
    return "1 minute ago";
    return div+" minutes ago";
}else if(diff<(60*60*24)){
    var div=Math.floor(diff/(60*60));
    if(div==1)
    return "1 hour ago";
    return div+" hours ago";
}else if(diff<(60*60*24*30)){
    var div=Math.floor(diff/(60*24*60));
    if(div==1)
    return "1 day";
    return div+" days";
}else if(diff<(60*60*24*30*52)){
    var div=Math.floor(diff/(60*24*30*60));
    if(div==1)
    return "1 week";
    return div +" weeks";
}else{
    var div=Math.floor(diff/(60*24*30*60*52));
    if(div==1)
    return "1 year";
    return div+" years";
}
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function addcomment(){
    var obj={};
    obj.handle=userHandle;
    obj.timestamp=new Date().toLocaleString();
    obj.text=document.getElementById("comment").value;
    obj.upvote="0";
    obj.downvote="0";
    obj.avatar=imageValue;
    console.log(obj.avatar);
    console.log("YEAH");
    if(rt!=null)
    obj.replyto=rt;
    else
    obj.replyto="";
    if(localStorageElement==null){
        localStorageElement=[];
    }
    var x=0;
    localStorageElement.forEach(function(comment) {
        x=Number(comment.id);
     });
    obj.id=Number(x)+1;
    if(pc!=null)
    obj.parentcomment=pc;
    else{
        obj.parentcomment="";
    }
    rt=null;
    pc=null;
    var y=0;
    if(obj.parentcomment!=null){
        localStorageElement.forEach(function(comment) {
            if(comment.id==obj.parentcomment){
                y=Number(comment.dist);
            }
         });
    }
    if(y<3)
    obj.dist=y+1;
    else
    obj.dist=y;
    if(localStorageElement==null){
        localStorageElement=[];
    }
        localStorageElement.push(obj);
        localStorage.setItem('comments',JSON.stringify(localStorageElement));
        displaycomments();
}