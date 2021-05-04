const images = [
  {
    image_name : "cats.jpg",
    number_of_items : 5,
    title:"Cats"
  },
  {
    image_name : "cookies.jpg",
    number_of_items : 8,
    title:"Cookies"
  },
  {
    image_name : "crayons.jpg",
    number_of_items : 13,
    title:"Crayons"
  },
  {
    image_name : "horses.jpg",
    number_of_items : 5,
    title:"Horses"
  },
  {
    image_name : "laptops.jpg",
    number_of_items : 2,
    title:"Laptops"
  },
  {
    image_name : "pasteries.jpg",
    number_of_items : 3,
    title:"Pasteries"
  },
  {
    image_name : "people.jpg",
    number_of_items : 6,
    title:"People"
  },
  {
    image_name : "pizza.jpg",
    number_of_items : 9,
    title:"Pizza Slices"
  }
];


let timerSetting;

let currentImageValue = 0, displayNumber = 0, score = 0,chosen = false;
let totalAvailable = images.length;

const endOfGame = () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("statsContent").style.display = "none";
  document.getElementById("imageContainer").style.display = "none";
  document.getElementById("message").style.display = "block";
  document.getElementById("message").innerHTML = `Game Over Beta! Your score is ${score} / ${totalAvailable}`;
  setTimeout(() => location.reload(), 5000);
  
}

const setImageSrc = (randomImageName) => {
  const imageContainer = document.getElementById("imageContainer");
  const image = `<img src = 'images/${randomImageName}' class='fade'>`;
  imageContainer.innerHTML = image;
}

const setImageName = (randomImagetitle) => {
  document.getElementById("item-name").innerHTML = randomImagetitle;
}

const generatePlusOrMinus = () => {
  const number0or1 = Math.floor(Math.random()*2);
  return number0or1 === 0 ? -1 : +1;
  
}

const generateDisplayNumber = (plusOrMinus,numberOfItems) => {
  const split = Math.floor(Math.random()*2);
  if (split === 0) {
    //pass original number (numberOfItems)
    document.getElementById("number").innerHTML = numberOfItems;
    displayNumber = numberOfItems;
  }else{
    document.getElementById("number").innerHTML = `${numberOfItems + plusOrMinus}`;
    displayNumber = numberOfItems + plusOrMinus;
  }

  currentImageValue = numberOfItems;

}

const generate = () => {
  if (images.length === 0) {
    stopTimer();
    endOfGame();
  }
  chosen = false;
  const randomNumber = Math.floor(Math.random() * images.length);
  const randomImageName = images[randomNumber].image_name;
  setImageSrc(randomImageName);

  const randomImagetitle = images[randomNumber].title;
  setImageName(randomImagetitle);

  const plusOrMinus = generatePlusOrMinus();
  const numberOfItems = images[randomNumber].number_of_items;
  generateDisplayNumber(plusOrMinus,numberOfItems);


  images.splice(randomNumber,1);

}

const timer = () => {

  timerSetting = setInterval(generate, 3000);
}


const play = () => {
  document.getElementById("statsContent").style.display = "block";
  document.getElementById("startScreen").style.display = "none";
  generate();
  timer();
}

const stopTimer = () => {
  clearInterval(timerSetting);
}

const match = () => {
  if (!chosen) {
    currentImageValue === displayNumber ? score ++ : score--;
    chosen = true;
    document.getElementById("currentscore").innerHTML = score;
  }
}

const noMatch = () => {
  if (!chosen) {
    currentImageValue !== displayNumber ? score++  : score --;
    chosen = true;
    document.getElementById("currentscore").innerHTML = score;
  }
}


