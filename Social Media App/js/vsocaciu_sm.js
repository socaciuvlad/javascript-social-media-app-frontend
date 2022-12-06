const numberOfLikesElement = document.getElementsByClassName("numberOfLikes");
const likeButton = document.getElementsByClassName("likeButton");
const profilePostName = document.getElementsByClassName("profileNameText");
const commentSection = document.getElementsByClassName('commentSection');
const imageElement = document.getElementsByClassName("profileImage")[0];
const profileButton = document.getElementsByClassName('profileOptionsButton');

const accountSettingsButton = document.getElementById('accountSettingsButton');
const menuDropdown = document.getElementsByClassName('menuOptionsDropdown')[0];
const logoutButton = document.getElementById('logoutButton');

const numberOfCommentsElement = document.getElementsByClassName('numberOfComments');

const infoButton = document.getElementsByClassName("infoIcon");
const moreInfoContent = document.getElementsByClassName("moreInfoContent");

let isLiked = false;
let numberOfLikes;

async function getUserData() {
  const response = await fetch('assets/data/userData.json');
  return response.json();
}

for (let i = 0; i < profilePostName.length; i++){
  getUserData().then( data => {
    profilePostName[i].innerHTML = data.username;
  })
}

for (let i = 0; i < numberOfLikesElement.length; i++) {
  getUserData().then( data => {
    numberOfLikes = data.numberOfLikes;
    numberOfLikesElement[i].innerHTML = numberOfLikes;
  })
};

for(let i = 0; i < numberOfCommentsElement.length; i++){
  getUserData().then( data => {
    numberOfCommentsElement[i].innerHTML = data.noOfComments;
  })
}

for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener("click", function () {
    isLiked = !isLiked;
    if (isLiked) {
      numberOfLikes++;
      numberOfLikesElement[i].innerHTML = numberOfLikes;
      likeButton[i].style.color = "blue";
    } else {
      numberOfLikes--;
      numberOfLikesElement[i].innerHTML = numberOfLikes;
      likeButton[i].style.color = "black";
    }
  });
}

const imageSource = imageElement.getAttribute("src");

for(let i = 0; i < commentSection.length; i++){
    const commentInputElement = document.querySelector(`.cs${i} .commentInput`);      
            commentInputElement.addEventListener('keypress', () => postComment(commentInputElement, event));
            let timeOut;
        function postComment(item, event) {
          clearTimeout(timeOut);
          const commentWarning = document.querySelector(`.cs${i} .pressEnterNotification`);
          if(event.keyCode === 13){
            const newComment = document.createElement('div');
            newComment.classList.add('commentsSection');
            commentSection[i].appendChild(newComment);

            console.log(commentSection[i]);

            const newImage = document.createElement('img');
            newImage.classList.add('profileImage');
            newImage.setAttribute('src', imageSource);
            newComment.appendChild(newImage);
            
            const commentInfoWrapper = document.createElement('div');
            newComment.appendChild(commentInfoWrapper);

            const newUsernameSpan = document.createElement('span');
            newUsernameSpan.innerHTML = 'Vlad Socaciu';
            commentInfoWrapper.appendChild(newUsernameSpan);

            const newCommentParagraph = document.createElement('p');
            newCommentParagraph.innerHTML = item.value;
            commentInfoWrapper.appendChild(newCommentParagraph);

            const numberOfCommentsElement1 = document.querySelector(`.cn${i} .numberOfComments`);
            numberOfCommentsElement1.innerHTML++;

            commentWarning.innerHTML = '';

           item.value = '';
        } else {          
          timeOut = setTimeout( () => {
          
            commentWarning.innerHTML = 'press enter';
            commentWarning.style.color = 'blue';
        }, 3000);          
      }
    }

}

for(let i = 0; i < profileButton.length; i++){
  profileButton[i].addEventListener('click', function(){
    const profileDropdown = document.querySelectorAll(`.pf${i} .profileOptionsDropdown`);
    for(let i = 0; i < profileDropdown.length; i++){
      profileDropdown[i].style.display = 'flex';
      profileDropdown[i].focus();
      profileDropdown[i].addEventListener('blur', function() {
        profileDropdown[i].style.display = 'none';
      })
    }
  })
};

accountSettingsButton.addEventListener('click', function() {
  menuDropdown.style.display = 'flex';
  menuDropdown.focus();
});

menuDropdown.addEventListener('blur', function(){
  this.style.display = 'none';
});

logoutButton.addEventListener('click', function() {
  window.open('login/login.html', '_self');
});


for(let i = 0; i < infoButton.length; i++){
  infoButton[i].addEventListener('mouseover', function() {
    moreInfoContent[i].style.display = 'flex';
  });
  
  infoButton[i].addEventListener('mouseout', function() {
    moreInfoContent[i].style.display = 'none';
  });
}
