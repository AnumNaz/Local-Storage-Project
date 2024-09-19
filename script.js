let task = document.querySelector(".value");
let submit = document.querySelector(".submit");
let showText = document.querySelector(".colTwo");
let newArr = localStorage.getItem("key");
if (!newArr) {
  const taskarr = new Array();
  localStorage.setItem("key", JSON.stringify(taskarr));
}
let getArr = JSON.parse(newArr);

submit.addEventListener("click", () => {
  if (task.value == "") {
    alert("Enter your task name!");
  } else {
    let value = task.value.trim();
    getArr.push(value);
    console.log(getArr);
    localStorage.setItem("key", JSON.stringify(getArr));
    display();
    task.value = "";
  }
});

function display() {
  showText.innerHTML = "";
  getArr.forEach((e, index) => {
    let div = document.createElement("div");
    let text = document.createElement("p");
    let updateBtn = document.createElement("button");
    let delBtn = document.createElement("button");
    text.appendChild(document.createTextNode(e));
    div.setAttribute("class", "mb-3");
    updateBtn.setAttribute("class", "edit");
    delBtn.setAttribute("class", "del");

    updateBtn.appendChild(document.createTextNode("Edit"));
    delBtn.appendChild(document.createTextNode("Delete"));

    div.append(text, updateBtn, delBtn);
    showText.appendChild(div);

    delBtn.addEventListener("click", () => {
      deletetask(index);
    });

    updateBtn.addEventListener("click", () => {
      submit.disabled = true;
      let updated = document.createElement("button");
      updated.setAttribute("class", "update");
      updated.appendChild(document.createTextNode("Update"));
      updateBtn.replaceWith(updated);
      let arr = document.querySelectorAll(".edit");
      let delarr = Array.from(document.querySelectorAll(".del"));
      delarr.forEach((e) => {
        e.disabled = true;
      });
      let updatearr = Array.from(arr);
      updatearr.forEach((e) => {
        e.disabled = true;
      });
      task.value = text.textContent;
      updated.addEventListener("click", () => {
        if (!task.value == "") {
          updatetask(index);
          text.textContent = task.value;
          updated.replaceWith(updateBtn);
          task.value = "";
          submit.disabled = false;
          // delBtn.disabled=false;
          updatearr.forEach((e) => {
            e.disabled = false;
          });
          delarr.forEach((e) => {
            e.disabled = false;
          });
        }
      });
    });
  });
}

function deletetask(e) {
  getArr.splice(e, 1);
  localStorage.setItem("key", JSON.stringify(getArr));
  display();
}

function updatetask(e) {
  getArr[e] = task.value;
  localStorage.setItem("key", JSON.stringify(getArr));
  display();
}

display();
