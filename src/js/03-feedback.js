import storage from "./storage";
import throttle from "lodash.throttle";

const ref =
{
    form: document.querySelector(".feedback-form"),
   
}
//напочатку заповнення форми з того що є в локалсторедж
const LOCALSTORAGE_KEY = "feedback-form-state";
let dataFromStorage = storage.load(LOCALSTORAGE_KEY) || {};
if (dataFromStorage) {
    for (let key in dataFromStorage) //key це name кожного input в формі
    {
        ref.form[key].value = dataFromStorage[key];
     }
}
//записування що 500мс в локалсторедж що є в інпутах
ref.form.addEventListener('input', throttle(onInput, 500));
function onInput (e) {
    dataFromStorage = storage.load(LOCALSTORAGE_KEY);
    let data = { ...dataFromStorage, [e.target.name]: e.target.value };
    storage.save(LOCALSTORAGE_KEY, data);
}
//після натиснення submit обєкт в консоль ,і очистити форму та ключ в локалсторедж
ref.form.addEventListener('submit', onSubmit);    
function onSubmit (e) {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    //console.log("formData ", formData); //ніби пустий обєкт але там є всі інтерактивні поля з name/value для ітервції
    const result = {};
    // formData.forEach((value,name) => result[name] = value);
    for (let [name, value] of formData) {
       result[name] = value;  
    }
    console.log("result ", result);
    storage.remove(LOCALSTORAGE_KEY);
    e.currentTarget.reset();
}
