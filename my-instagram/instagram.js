const useLocalStorage = true;

function getID() {
  const idInput = document.querySelector(".search").value;
  if (idInput) {
    const urlID = `http://www.instagram.com/${idInput}`;
    window.open(urlID);
  }
}

const heartIcon = document.querySelector(".heart-icon");
const alarmContainer = document.querySelector(".alarm-container");

heartIcon.addEventListener("click", () => {
  if (alarmContainer.classList.contains("animate")) {
    // 오른쪽에서 왼쪽으로 알림창 뜨게 하기
    alarmContainer.classList.remove("animate");
    alarmContainer.classList.add("animate-reverse");
  } else {
    alarmContainer.classList.add("animate");
    alarmContainer.classList.remove("animate-reverse");
  }
});

const storyElements = document.querySelectorAll(".story-element");
storyElements.forEach((e) => {
  e.addEventListener("click", () => {
    const id = e.id.charAt(e.id.length - 1);
    const story = document.getElementById("story-modal" + id);
    story.style.display = "block";
  });
});

const stories = document.querySelectorAll(".story-modal");
stories.forEach((e) => {
  e.addEventListener("click", (event) => {
    const id = e.id.charAt(e.id.length - 1);
    if (e === event.target) {
      e.style.display = "none";
    }
  });
});

const rightArrows = document.querySelectorAll(".right-arrow");
rightArrows.forEach((e) => {
  e.addEventListener("click", () => {
    const id = e.id.charAt(e.id.length - 1);
    const storyNow = document.getElementById("story-modal" + id);
    const storyNext = document.getElementById("story-modal" + (Number(id) + 1));
    storyNow.style.display = "none";
    storyNext.style.display = "block";
  });
});

const leftArrows = document.querySelectorAll(".left-arrow");
leftArrows.forEach((e) => {
  e.addEventListener("click", () => {
    const id = e.id.charAt(e.id.length - 1);
    const storyNow = document.getElementById("story-modal" + id);
    const storyPrev = document.getElementById("story-modal" + (Number(id) - 1));
    storyNow.style.display = "none";
    storyPrev.style.display = "block";
  });
});

const profileImage = document.getElementById("profile-image");
const profileModal = document.getElementById("profile-modal");
const profileName = document.getElementById("profile-name");

profileImage.addEventListener("mouseover", () => {
  profileModal.style.display = "block";
  profileModal.style.position = "absolute";
});

profileImage.addEventListener("mouseout", () => {
  profileModal.style.display = "none";
});

profileName.addEventListener("mouseover", () => {
  profileModal.style.display = "block";
  profileModal.style.position = "absolute";
});

profileName.addEventListener("mouseout", () => {
  profileModal.style.display = "none";
});

const likeCount = document.getElementById("like-count");
const likeBtn = document.getElementById("like-btn");
const likedBtn = document.getElementById("liked-btn");

likeBtn.addEventListener("click", () => {
  likedBtn.style.display = "block";
  likeBtn.style.display = "none";

  const count = likeCount.innerText;
  likeCount.innerText = `${parseInt(count) + 1}개`;
});

likedBtn.addEventListener("click", () => {
  likeBtn.style.display = "block";
  likedBtn.style.display = "none";

  const count = likeCount.innerText;
  likeCount.innerText = `${parseInt(count) - 1}개`;
});

const commentsCreateForm = document.querySelector(".comments-create-form");
const commentInput = document.querySelector(".comment-input");
const commentContainer = document.querySelector(".comments-container");

// 댓글을 만드는 로직
const commentsList = JSON.parse(window.localStorage.getItem("comments")) || [];
// parse는 string을 array 형태로 변환

window.onload = () => {
  if (commentsList.length > 0) {
    commentContainer.innerHTML = commentsList
      .map(
        (comment, index) => `
        <div class="comment-wrapper">

        <div class="comment-and-date">
          <span class="comment" style="font-size:12px">${comment}</span>
          <span class="comment-date">${
            new Date().getMonth() + 1
          }월 ${new Date().getDate()}일</span>
        </div>
    
        <img
          id="${index}" 
          class="comment-delete-icon"
          onclick="deleteComment(${index})" 
          src="./images/close.png" 
          alt="comment" 
        />
    
      </div>`
      )
      .reverse()
      .join("");
  }
};

let commentId = 0;

commentsCreateForm.addEventListener("submit", (e) => {
  e.preventDefault(); // 새로고침 방지
  const commentText = commentInput.value;
  if (!commentText) return;

  commentsList.push(commentText);

  if (useLocalStorage) {
    const locallyStoredComments =
      JSON.parse(window.localStorage.getItem("comments")) || [];
    window.localStorage.setItem(
      "comments",
      JSON.stringify([...locallyStoredComments, commentText])
    );
  }

  const commentNode = `
  <div class="comment-wrapper">

    <div class="comment-and-date">
      <span class="comment" style="font-size:12px">${commentText}</span>
      <span class="comment-date">${
        new Date().getMonth() + 1
      }월 ${new Date().getDate()}일</span>
    </div>

    <img
      id="${commentId}" 
      class="comment-delete-icon"
      onclick="deleteComment(${commentId})" 
      src="./images/close.png" 
      alt="comment" 
    />

  </div>
  `;

  commentId = commentsList.length;

  commentContainer.innerHTML = commentNode + commentContainer.innerHTML;
  commentInput.value = "";
});

const deleteComment = (id) => {
  commentsList.splice(id, 1); // id index부터 1개 없애는 코드.

  if (commentsList.length === 0) {
    commentId = 0;
  }

  if (useLocalStorage) {
    const locallyStoredComments = JSON.parse(
      window.localStorage.getItem("comments")
    );
    locallyStoredComments.splice(id, 1);
    window.localStorage.setItem(
      "comments",
      JSON.stringify(locallyStoredComments)
    );
  }

  commentContainer.innerHTML = commentsList
    .map(
      (comment, index) => `
      <div class="comment-wrapper">

      <div class="comment-and-date">
        <span class="comment" style="font-size:12px">${comment}</span>
        <span class="comment-date">${
          new Date().getMonth() + 1
        }월 ${new Date().getDate()}일</span>
      </div>
  
      <img
        id="${index}" 
        class="comment-delete-icon"
        onclick="deleteComment(${index})" 
        src="./images/close.png" 
        alt="comment" 
      />
  
    </div>`
    )
    .reverse()
    .join("");
};

const footer = document.querySelector(".footer-message");
footer.innerText = `Ⓒ ${new Date().getFullYear()} INSTAGRAM FROM META`;

const logo = document.querySelector(".logo");
logo.addEventListener("click", () => {
  window.location.reload();
});

const following = document.querySelector(".following");
const follow = document.querySelector(".follow");
following.addEventListener("click", () => {
  following.style.display = "none";
  follow.style.display = "block";
});
follow.addEventListener("click", () => {
  follow.style.display = "none";
  following.style.display = "block";
});

const smile = document.querySelector(".smile");
const emoticonContainer = document.querySelector(".emoticon-container");
smile.addEventListener("click", () => {
  emoticonContainer.classList.toggle("display-on");
});

const emoji = document.querySelectorAll(".emoticon");
emoji.forEach((e) => {
  e.addEventListener("click", () => {
    const txt = document.getElementById(e.id).innerText;
    var inputValue = $(".comment-input").val();
    inputValue += txt;
    $(".comment-input").val(inputValue);
  });
});
