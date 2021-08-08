const usersBasket = document.querySelector(".users");
const body = document.querySelector("body");
const modalUser = document.querySelector("#modalUser");
const modalBackDrop = document.querySelector("#modalBackDrop");
const email = document.querySelector("#email");
const img = document.querySelector("#profileImg");
const fullName = document.querySelector("#fullName");
const userLocation = document.querySelector("#userLocation");
const street = document.querySelector("#street");
const closeModal = document.querySelector(".close-button");
const overlay = document.querySelector("#modalBackDrop");
const sortButton = document.querySelector("#sortButton");
const sortBackButton = document.querySelector("#sortBackButton");
let sortArr = [];
// let usersData = {};
// fetch('http://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phon e,picture')
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     usersData = data;
//     console.log(data);
//   })

//   console.log(usersData);

function capitaliZe(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function fetchData() {
  const response = await fetch(
    "http://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phon e,picture"
  );
  const users = await response.json();
  return users;
}

async function seedDiv() {
  fetchData().then((users) => {
    console.log(users);
    users.results.forEach((item) => {
      let individualUser = document.createElement("div");
      let individualUserImg = document.createElement("img");
      let individualUserInfo = document.createElement("p");
      let gender = document.createElement("span");
      individualUserInfo.innerText = `${item.name.first} ${item.name.last}`;
      gender.innerText = item.name.title;
      individualUserImg.src = item.picture.medium;
      individualUser.classList = "just_user";
      gender.classList = "gender";
      individualUser.append(individualUserImg);
      individualUser.append(gender);
      individualUser.append(individualUserInfo);
      usersBasket.appendChild(individualUser);
      individualUser.addEventListener("click", () => {
        modalUser.style.display = "block";
        modalBackDrop.style.display = "block";
        // body.style.overflow = 'hidden';
        email.innerText = `email: ${item.email}`;
        fullName.innerText = `${capitaliZe(item.name.first)} ${capitaliZe(
          item.name.last
        )}`;
        img.src = item.picture.large;
        userLocation.innerText = `state: ${item.location.state}, city: ${item.location.city}`;
        street.innerText = `street: ${item.location.street}`;
      });
    });
  });
}

seedDiv();

overlay.addEventListener("click", () => {
  modalUser.style.display = "none";
  modalBackDrop.style.display = "none";
});

closeModal.addEventListener("click", () => {
  modalUser.style.display = "none";
  modalBackDrop.style.display = "none";
});

sortButton.addEventListener("click", sortDivs);
sortBackButton.addEventListener("click", unsortDivs);

function sortDivs() {
  const usersList = document.querySelectorAll(".just_user");
  // const usersListArray = Array.prototype.slice.call(usersList, 0);
  const usersListArray = [...usersList];
  const newUsersListArray = [...usersListArray];
  newUsersListArray.sort(function (a, b) {
    let aDiv = a.children[2].innerText;
    let bDiv = b.children[2].innerText;
    if (aDiv > bDiv) return 1;
    if (aDiv < bDiv) return -1;
    return 0;
  });
  usersBasket.innerHTML = "";
  newUsersListArray.forEach((item) => {
    usersBasket.appendChild(item);
  });
}

function unsortDivs() {
  const usersList = document.querySelectorAll(".just_user");
  // const usersListArray = Array.prototype.slice.call(usersList, 0);
  const usersListArray = [...usersList];
  const newUsersListArray = [...usersListArray];
  newUsersListArray.sort(function (a, b) {
    let aDiv = a.children[2].innerText;
    let bDiv = b.children[2].innerText;
    if (aDiv > bDiv) return -1;
    if (aDiv < bDiv) return 1;
    return 0;
  });
  usersBasket.innerHTML = "";
  newUsersListArray.forEach((item) => {
    usersBasket.appendChild(item);
  });
}

// usersBasket.appendChild(usersListArray);

//   // sortArr.push(item.children[2].innerText);
//   // sortArr.sort();
//   // console.log(sortArr);
// })
