import storage from "./storage";
import throttle from "lodash.throttle";

const ref = {
    form: document.querySelector(".feedback-form"),
};
const LOCALSTORAGE_KEY = "feedback-form-state"; //назва ключа в localStorage

let formData = new FormData(ref.form); //створили екземпляр класу FormData з нашої форми
const dataFromStorage = storage.load(LOCALSTORAGE_KEY) || {}; //якщо є  в localStorage то завантажимо дані  або порожній обєкт
if (dataFromStorage !== {}) {
    for (key in dataFromStorage) { //повернули в поля форми те що у LocalStorage
        ref.form[key].value = dataFromStorage[key];// в поле  властивості key записане  її значення value
    };
};
// input
ref.form.addEventListener('input', throttle(updateInput, 500));//update що 500ms

function updateInput(event) {
    //  formData.forEach(() => {
        formData[event.target.name] = event.target.value;//
// });       
    storage.save(LOCALSTORAGE_KEY, formData);  // записуємо введене в формі в localStorage
};

// сабміт
ref.form.addEventListener("submit", onSubmit);
function onSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget); //створення екзем-ру класу FormData для всієї форми
    console.log('formData з submit ',formData);
    let objFormData = {};
    //екземпляр класа FormData можна ітерувати по інтерактивних полях у яких key:value key це name а значення це value
    formData.forEach((value, name) => {
      objFormData[name] = value; //в [] ключ обєкта бо змінна /інакше ключ через крапку
    });
    console.log("objFormData: ", objFormData);//вивела обєкт форми
    storage.remove(LOCALSTORAGE_KEY); //очистила сховище по ключу
    event.currentTarget.reset(); //reset currentTarget це ксидання всіх value форми
};