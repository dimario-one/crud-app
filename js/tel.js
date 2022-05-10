
import { rootReducer } from "./redux/rootReducer";
import {createStore} from "./createStore";

let table = document.querySelector("#table tbody");
let btn = document.getElementById("button");
let modal = new bootstrap.Modal(document.querySelector("#basicModal"));
let editModal = new bootstrap.Modal(document.querySelector("#editModal"));
let home = document.getElementById("home");
let street = document.getElementById("street");
let name = document.getElementById("name");
let room = document.getElementById("room");
let comment = document.getElementById("comment");
let saveBtn = document.getElementById("save");
let saveEditName = document.getElementById("edit-save");
let editName = document.getElementById("edit-name");
let editStreet = document.getElementById("edit-street");
let editHome = document.getElementById("edit-home");
let editRoom = document.getElementById("edit-room");
let editComment = document.getElementById("edit-comment");
let find = document.getElementById("find");
let findModal = new bootstrap.Modal(document.querySelector("#findModal"));
let findSave = document.getElementById("find-save");
let findName = document.getElementById("find-name");
let message = document.getElementById("message");
let storageStatus = document.getElementById("storage-status");
let reduxBtn=document.getElementById('redux');
let localStorageBtn=document.getElementById('local-storage');
let ID;
let flagStorage = false;

// Для проверки логики страницы
let array = [
  {
    id: 1,
    name: "Иванов Иван Иванович",
  },
  {
    id: 2,
    name: "Петров Иван Петрович",
  },
  {
    id: 3,
    name: "Сидоров Иван Васильевич",
  },
  {
    id: 4,
    name: "Краснов Иван Иванович",
  },
  {
    id: 5,
    name: "Лаптев Иван Радионович",
  },
];

// Для redux
let store= createStore(rootReducer,array); 


window.store=store;

// Функция устанавливает сообщение какой тип хранения данных сейчас используется
function setStorageMessage(flag = false) {
  if (flag) {
    storageStatus.innerHTML = "Сейчас используется Redux";
  } else {
    storageStatus.innerHTML = "Сейчас используется LocalStore";
  }
}

// Функция отправки начальных данных в local storage
function setDataLocalStorage(array) {
  localStorage.setItem("array", JSON.stringify(array));
}

setDataLocalStorage(array);

// Функция получения данных из local storage
function getDataLocalStorage(value) {
  return localStorage.getItem(`${value}`);
}

// Функция заполнения таблицы
function showTable() {
  let obj=getDataLocalStorage('array');
  let arr= JSON.parse(obj);
  resetCellValue();
  let data;
  // Отрисовка таблицы
  // Ячейки таблицы
  for (let i = 0; i < arr.length; i++) {
    // let div = document.createElement("div");
    let row = document.createElement("tr");
    let row_cell = document.createElement("td");
    let row_cell_1 = document.createElement("td");
    // let row_cell_2 = document.createElement("td");
    let row_cell_6 = document.createElement("td");

    let deleteBtn = document.createElement("button");

    // Заполнение идет рядами так что это порядковый номер.
    row_cell.innerHTML = `${i + 1}`;
    row_cell.classList.add("cell", "cell_min", "findCell");
    row_cell.setAttribute("id", `number-row-${i}-cell`);
    // Заполняем таблицу
    data = arr[i];
    // Запоняем ячейки имя
    row_cell_1.innerHTML = `${data.name}`;
    row_cell_1.classList.add("cell", "cell_big", "findCell");
    row_cell_1.setAttribute("id", `name-row-${i}-cell`, "name");

    // Заполняем ячейку delete
    deleteBtn.classList.add("cell", "btn", "btn-close");
    row_cell_6.setAttribute("id", `cellDeleteButton-row-${i}-cell`);
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("aria-label", "Close");
    row_cell_6.appendChild(deleteBtn);

    // Вставка в Dom
    row.appendChild(row_cell);
    row.appendChild(row_cell_1);
    row.appendChild(row_cell_6);
    table.appendChild(row);
    row.addEventListener("click", () => {
      console.log(row);
    });
  }
}

// Функция добавления абонента
function addUser() {
  let arr=JSON.parse(getDataLocalStorage('array'));
  let obj = {
    id: arr.length+1,
    name: name.value,
   
  };
  array.push(obj);
  setDataLocalStorage(array);
  showTable();
}

// Функция удаления элемента из таблицы
function deleteRow(index) {
  let newArr = [];
  for (i = 0; i < array.length; i++) {
    if (index !== `${i}`) {
      newArr.push(array[i]);
    }
  }
  array = newArr;
  setDataLocalStorage(newArr)
  showTable();
}

// Функция очистки таблицы
function resetCellValue() {
  table.innerHTML = "";
}

//
function getRow(id) {
  let allCell = document.querySelectorAll(".findCell");
  let cell;
  let arr;
  let row = [];
  let elem = id.split("-");
  for (i = 0; i < allCell.length; i++) {
    cell = allCell[i].getAttribute("id");
    arr = cell.split("-");
    if (elem[1] === arr[1] && elem[2] === arr[2]) {
      row.push(allCell[i]);
    }
  }
  setValueRow(row);
}

// Функция заполнения ряда таблицы
function setValueRow(row) {
  let elem;
  let attribute;
  for (i = 0; i < row.length; i++) {
    attribute = row[i].getAttribute("id");
    let id = attribute.split("-");
    elem = document.getElementById(`${attribute}`);
    for (a = 0; a < id.length; a++) {
      switch (id[a]) {
        case "name":
          elem.innerHTML = editName.value;
          break;
        case "number":
          console.log(`номер ${id[a]}`);
          break;
        default:
          console.log("что то пошло не так в функции setValueRow");
          break;
      }
    }
  }
}

// Функция поиска абонента
function findUser() {
  let name = findName.value;
  let arr=JSON.parse(getDataLocalStorage('array'));
  for (i = 0; i < arr.length; i++) {
    if (name === arr[i].name) {
      message.classList.remove("d-none");
      message.classList.add("d-block");
      message.innerText = ` ${arr[i].id}  ${arr[i].name}`;
    }
  }
}
setStorageMessage(flagStorage);
showTable();
// Слушатель

localStorageBtn.addEventListener("click",function(){ flagStorage= false;setStorageMessage(false)});

reduxBtn.addEventListener("click",function(){ flagStorage= true;setStorageMessage(true)});

findSave.addEventListener("click", function () {
  findUser();
  findModal.hide();
});

find.addEventListener("click", function () {
  findModal.show();
});

saveEditName.addEventListener("click", function () {
  getRow(ID);
  editModal.hide();
});

saveBtn.addEventListener("click", function () {
  addUser();
  modal.hide();
});

btn.addEventListener("click", function () {
  modal.show();
});

document.addEventListener("click", function (event) {
  let td = event.target.closest("td");
  if (!td) {
    return;
  } else {
    let id = td.getAttribute("id");
    let type = id.split("-");
    let name = type[0];
    if (name === "name") {
      ID = id;
      editModal.show();
    } else {
      if (name === "cellDeleteButton") {
        deleteRow(type[2]);
      }
    }
  }
});
