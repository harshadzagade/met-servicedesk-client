const sideMenu = document.getElementsByClassName("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");


menuBtn.addEventListener('click', () => {
    console.log(closeBtn);
    sideMenu.style.dispaly = 'block';
})
closeBtn.addEventListener('click', () => {
    sideMenu.style.dispaly = 'none';
})


