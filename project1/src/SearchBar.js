const frm = document.querySelector("form");
frm.onsubmit = onSubmit;

function onSubmit(e) {
  e.preventDefault();
  const searchKey = document.getElementById("searchKey").value;
  document.querySelector(".cards").remove();
  getData().then((courses) => {
    const tp = document.getElementById("active").dataset["type"];
    drawCourses(filter(courses[tp], searchKey));
  });
}

const filter = (courses, searchKey) => {
  return courses.filter((e) =>
    e["title"].toLowerCase().includes(searchKey.toLowerCase())
  );
};
