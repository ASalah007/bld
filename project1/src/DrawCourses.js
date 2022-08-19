getData().then((courses) => drawCourses(courses["python"]));

async function getData() {
  const courses = await fetch("http://localhost:3000/courses");
  return await courses.json();
}

// draw the given list of courses in the dom
function drawCourses(courses) {
  const cards = document.createElement("div");
  cards.classList.add("cards");
  cards.classList.add("carousel-inner");

  const items = courses.map((e) =>
    drawCourse(
      e["title"],
      e["instructors"][0]["name"],
      e["rating"],
      e["price"],
      e["image"]
    )
  );
  
  const courseWidth = 220;
  const containerWidth = document.getElementsByClassName("carousel")[0].clientWidth;
  const coursesCount = containerWidth / courseWidth;


  for (let i = 0; i < items.length; i++) {
    const dv = document.createElement("div");
    dv.style.display = "flex";
    const dv2 = document.createElement("div");
    dv2.classList.add("carousel-item");
    dv2.appendChild(dv);

    if (i == 0) {
      dv2.classList.add("active");
    }
    for (let j = 0; j < coursesCount && i < items.length; j++, i++) {
      dv.appendChild(items[i]);
    }
    cards.appendChild(dv2);
  }

  document.querySelector(".courses>div>div").appendChild(cards);
}

// prettier-ignore
function drawCourse(courseName, authorName, ratingValue, priceValue, imgLink) {
  const card       = document.createElement("div");
  const cardBody   = document.createElement("div");
  const cardTitle  = document.createElement("h1");
  const cardImage  = document.createElement("img");
  const cardText   = document.createElement("p");
  const cardRating = document.createElement("div");
  const cardPrice  = document.createElement("div");

  card      .classList.add("card");
  cardBody  .classList.add("card-body");
  cardTitle .classList.add("card-title");
  cardImage .classList.add("card-img-top");
  cardText  .classList.add("card-text");
  cardRating.classList.add("card-rating");
  cardPrice .classList.add("card-price");

  card.appendChild(cardImage);
  card.appendChild(cardBody);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardRating);
  cardBody.appendChild(cardPrice);

  card.style.width = "200px"

  cardImage.src = imgLink;

  cardTitle.innerText = courseName;

  cardText.innerText = authorName;

  const starCount = parseFloat(ratingValue);
  const s1 = document.createElement("span");
  s1.classList.add("rating-num")
  s1.innerText = ratingValue.toPrecision(2);
  cardRating.appendChild(s1);

  for (var i = 0; i < Math.floor(starCount); i++) {
    const star = document.createElement("img");
    star.classList.add("star");
    star.src= "../resources/star.png";
    cardRating.appendChild(star);
  }
  if (starCount - i > 0) {
    const halfStar = document.createElement("img");
    halfStar.classList.add("half-star");
    halfStar.src= "../resources/half-star.png";
    cardRating.appendChild(halfStar);
  }

  cardPrice.innerText = "$" + priceValue;
  return card;
}

// courses navigation list
let coursesLinks = document.querySelectorAll(".courses-list>li>a");
coursesLinks.forEach((l) => {
  l.addEventListener("click", function () {
    switchCourses(this);
  });
});

const switchCourses = (link) => {
  document.querySelector("#active").id = "";
  link.id = "active";
  document.querySelector(".cards").remove();
  getData().then((courses) => drawCourses(courses[link.dataset["type"]]));
};
