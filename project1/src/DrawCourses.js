getData().then((courses) => drawCourses(courses));

async function getData() {
  const courses = await fetch("http://localhost:3000/courses");
  return await courses.json();
}

// draw the given list of courses in the dom
async function drawCourses(courses) {
  const cards = document.createElement("ul");
  cards.classList.add("cards");

  courses
    .map((e) =>
      drawCourse(
        e["title"],
        e["instructors"][0]["name"],
        e["rating"],
        e["price"],
        e["image"]
      )
    )
    .forEach((e) => cards.appendChild(e));

  document.querySelector(".courses>div").appendChild(cards);
}

// prettier-ignore
// => returns <li class=card> ... </li>
function drawCourse(courseName, authorName, ratingValue, priceValue, imgLink) {
  const card       = document.createElement("li");
  const cardLink   = document.createElement("a");
  const imgWrapper = document.createElement("div");
  const img        = document.createElement("img");
  const caption    = document.createElement("caption");
  const h1         = document.createElement("h1");
  const author     = document.createElement("div");
  const rating     = document.createElement("div");
  const price      = document.createElement("div");

  card.classList.add("card");
  card.appendChild(cardLink);

  cardLink.href = "#";
  cardLink.appendChild(imgWrapper);
  cardLink.appendChild(caption);

  imgWrapper.classList.add("imgWrapper");
  imgWrapper.appendChild(img);

  img.src = imgLink;
  img.alt = "#";

  caption.appendChild(h1);
  caption.appendChild(author);
  caption.appendChild(rating);
  caption.appendChild(price);

  h1.innerText = courseName;

  author.innerText = authorName;
  author.classList.add("author");

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

  price.innerText = "$" + priceValue;
  price.classList.add("price");

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
