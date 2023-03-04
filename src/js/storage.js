// save/load перевіряють помилки парса і подібну рутину
//де потрібно перевірка JSON stringify/parse  ці save/load виконують  де є import з /storage.js
//import { save,load } from './storage';
//викликати save(key,value)/load(key)

const save = (key, value) => {
  try {
    console.log("from save try")
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = key => {
  try {
    console.log("from load try");
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

const remove = key => {
  try {
       console.log("from в remove try")
     return localStorage.removeItem(key);
    } catch (error) {
      console.error("Get state error: ", error.message);
    }
}
export default {
  save,
  load,
  remove,
};
//Тепер ми можемо безпечно додавати і читати записи з локального сховища.
//Спробуйте самостійно дописати метод 
//remove(key) для видалення запису,
// аналогічно load(key)
// і save(key, value).
