import { nanoid } from 'nanoid';
import localStore from './storage';

/*
  Написати Todo-list де можна створювати, видаляти елементи та реалізувати
  збереження списку в локал сторедж
 */

class TodoList {   //створення обєкту з властивостями і методами (# -приватні,тобто невидно на екземплярі)
  #STORAGE_KEY = 'TODO_LIST_ITEMS'; //назва ключа в localStorage,куди зберігати todo-list назва ключа/властивосиі(приватна) 
  #ENTER_KEY_CODE = 'Enter';  //code клавіші ,на яку повіситься слухач = назва ключа/властивосиі(приватна)
  #appMarkup = // базова html  розмітка списку задач =назва ключа/властивосиі(приватна)
  ` <div class="todo-list">
      <header class="header">
        <input class="header__input" type="text" placeholder="Enter an activity...">
        <button type="button" class="header__button"><i class="fa fa-plus"></i></button>
      </header>
      <main class="list-container">
        <ul class="list current-list"></ul>
        <hr>
        <ul class="list done-list"></ul>
      </main>
      </script>
    </div>
  `;//в розмітці 2списка з класами current-list-внесені/done-list-виконані

  #refs = {};//назва ключа/властивосиі(приватна)= порожній обєкт посилань ел-тів html розмітки
  #items = localStore.load(this.#STORAGE_KEY) || []; ////сюди розпарсився   JSON рядок з localStorage якщо є /якщо нема то порожній ключ/властивість масиву обєктів(приватна)
   
  init(targetNode) {  //метод класу публічний(видно на екземплярі)
    //або вказати tag/id/class/attribut в методі,або в на початку елемента з класом for_todo
    const targetElement = targetNode || document.querySelector('.for_todo'); //ел-т(target),куди вставляти html всю розмітку
    targetElement.insertAdjacentHTML('afterbegin',this.#appMarkup); //',) ;//вставляє  базову html розмітку

    this.#defineRefs(); //створює посилання на ел-ти для керування => викликає приватний метод #defineRefs()   this =class Todolist
    this.#initListeners();//вішає лісенери подій => викликає приватний метод #initListeners()  this =class Todolist
    this.#render();//рендерить розмітку введеного рядка викликає приватний метод #render() this =class Todolist
  }
  
  #defineRefs() { //приватний метод створює обєкт посилань на елементи(розмітку) html 
    this.#refs.app = document.querySelector('.todo-list');//посилання app це ел-т з класом todo-list(div в markup ключі)
    if (this.#refs.app) {//обєкт посилань 
      this.#refs.addItemBtn = this.#refs.app.querySelector('.header__button');//блок розмітки кнопки  header__button класу 
      this.#refs.itemInput = this.#refs.app.querySelector('.header__input');//блок розмітки інпута  header__inpu класу
      this.#refs.currentList = this.#refs.app.querySelector('.current-list');//блок роз-ки списку ul current-list класу 
      this.#refs.doneList = this.#refs.app.querySelector('.done-list');//блок роз-ки списку  ul  з done-list класом 
      this.#refs.listContainer = document.querySelector('.list-container');//блок розмітка (зона списків) list-container класу
    }
  }
  
  #initListeners() { //приватний метод(невидно на екземплярі)навішує лісенерів:
    this.#refs.addItemBtn.addEventListener('click', this.#addTask.bind(this));//клік на кнопку "+"" - додавання task
    this.#refs.listContainer.addEventListener('click', this.#taskContainerOnClick.bind(this));//клік на контейнер списків  делегування (remove/toggle)
    this.#refs.itemInput.addEventListener('keypress', this.#addTaskByEnterKey.bind(this));//yнатиснення в input кнопки enter 
  }
  
  #updateItems(items) { //приватний метод рендерить журнали існуючих обєктів   і  стрінгіфай  #items в localStorage даних
    this.#items = items; //записує передані items
    this.#render(); //приватний метод цього класу виконує  рендерінг розмітки
    localStore.save(this.#STORAGE_KEY, items);//передані items стрінгіфай в JSON форматі (рядок) 
  }
  
  #addTask() { //створює обєкт задачі з 3-ма ключами /потім рендер існуючого #items в журнал /функція повішана на клік по кнопці "+"  та натисненні enter
    const { value } = this.#refs.itemInput; //деструктуризація ел-та input,витягання одного з атрибутів- value

    if (value) { //якщо непусте поле input
      const items = [...this.#items]; //в items розпилити масив #items котре витягнуте з locslStorage перетворене в JS формат)
      items.push({ id: nanoid(), value, done: false });// в кінець додати введений в input обєкт з 3-ма ключами done: false -невиконаний
       //id:унікал id створений завдяки  import { nanoid } from 'nanoid';
       //value  з input(через деструктуризацію #refs )
      this.#updateItems(items);
     }

    this.#refs.itemInput.value = null; //після рознесення данних і рендерення розмітки очищає input
  }
  
  #addTaskByEnterKey(e) {  //при насненні enter в input e-обєкт події=клавіша
     if (e.code === this.#ENTER_KEY_CODE) { //#ENTER_KEY_CODE = 'Enter'
      this.#addTask(); 
    }
  }
  
  #taskContainerOnClick(e) { ///по кліку на контейнере журнал  введених задач
    //визначає від клікнутого тега(target) найближчий(зверху) тег з класом .list__item[data-id]
    const taskRef = e.target.closest('.list__item[data-id]'); //
   //якщо визначило
    if (taskRef) {
      if (e.target.dataset.action === 'remove') { //якщо в визначеного таргет є data-action=remove
        this.#removeTask(taskRef.dataset.id); // викликаємо метод remove на li з data-id = id 
      }

      if (e.target.dataset.action === 'toggle') { //якщо в визначеного таргет є data-action=toggle
        this.#toggleTask(taskRef.dataset.id); // викликаємо метод toggle на li з data-id = id на  target
      }
    }
  }
  
  #removeTask(id) {// remove фільтруємо #items = ел-ти якого не мають цього id таким чином видаляємо вибраний
    const items = this.#items.filter((item) => item.id !== id);
    this.#updateItems(items); //записує в #items/рендерить розмітку по журналах існуючих #items/стрінгіфаїть #items в JSON в localStorage
  }

  #toggleTask(id) {   //повертає розпушене  li з цим id і міняє ключ done на протилежний тому що був
    const items = this.#items.map((item) => {// пробігає по всьому масиву обєктів #items
      if (id === item.id) {                  // витягає його по id
        return { ...item,done: !item.done, }; //повертає розпушене це li/міняє done на протилежний тому що був
      }
      return item; //нічого не міняє якщо нема такого id
    });

    this.#updateItems(items);
    //записує створений масив в приватну властивість #items,
      //рендерить розмітку згідно цих #items
      //записує стрінгіфай items JSON формат в localStorage
        
  }
  
  #render() {//рендерить розмітку журнала  введеного/зміненого обєкта і  фільтрує його по done розмітка на 2 журнали
   //деструктуризує його { id, value, done } 
  //сторює li списка та додає йому data атрибути: data-id="${id} /data-done="${done}
      //id згенероване
      //value з input записує в span class="list__item-name"
      //done= при add false при toggle протилежне попередньому
      //створює div 2х кнопок-іконок:
      //1.смітник  remove fa fa-trash-o з б-ки вверху css який причепл в html 
      // @import 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css';
      //з класом remove та data-action="remove"
      //span з роділювачем |
      //2.зелений кружечок з галочкою - fa-check-circle ,
      //який змінює клас uncomplete fa-check - circle / complete fa - check - circle - o 
      //в залежності що є в done true / false та data-action="toggle"
      //
    const getItem = ({ id, value, done }) =>
     `
      <li class="list__item" data-id="${id}" data-done="${done}"> 
        <span class="list__item-name">${value}</span>
        <div class="list__buttons">
          <i class="list__button remove fa fa-trash-o" data-action="remove"></i>
          <span class="list__bar">|</span>
          <i class="${`list__button fa ${done ? 'uncomplete fa-check-circle' : 'complete fa-check-circle-o'}`}"
            data-action="toggle"></i>
        </div>
     </li>
    `;
   
   //після рендерення розмітки #items фільтрується на 2 масива 
    const todoTasks = this.#items.filter(({ done }) => !done);//масив обєктів з done=false
    const doneTasks = this.#items.filter(({ done }) => done); //масив обєктів з done=/true
    //getItem це розмітка одного рядка  в журналі 
   //створення нового html всіх існуючих  рядків поділений на 2 журнала (пофільтровані по класах currentList/doneList)
    this.#refs.currentList.innerHTML = todoTasks.map(getItem).join('');//заміняє весь html для масиву з done=false
    this.#refs.doneList.innerHTML = doneTasks.map(getItem).join('');  //заміняє весь html для масиву з done=true
  }
}
const todoList = new TodoList(); //створення екземпляра класа
todoList.init(); //ініціалізація
// console.log(todoList);
/* 
*/
/* 
    JSON (JavaScript Object Notation) – це загальний формат, 
    який представляє значення та об’єкти.
  */
// console.log(
//   'JSON 1 stringify',
//   JSON.stringify({
//     name: 'Mango',
//     age: 2,
//   }),
// );

// console.log(
//   'JSON 2 stringify',
//   JSON.stringify([
//     {
//       name: 'Mango',
//       age: 2,
//     },
//   ]),
// );

// console.log('JSON 1 parse', JSON.parse('{"name":"Mango","age":2}'));

// console.log('JSON 2 parse', JSON.parse('[{"name":"Mango","age":2}]'));

// console.log('до JSON');

// try {
//   const data = JSON.parse('{"name":"Mango","age":2,}');
//   console.log(data);
// } catch (error) {
//   console.log('Ваш JSON не валідний. Стукніть когось!');
// }

// console.log('після JSON');

// localStorage, sessionStorage
// setItem(key, value) – зберегти пару ключ/значення.
// getItem(key) – отримати значення за ключем.
// removeItem(key) – видалити дані за ключем.
// clear() – видалити все.
// key(index) – отримати ключ на заданій позиції.
// length – кількість збережених елементів.

// localStorage.setItem(
//   'STORAGE_KEY',
//   JSON.stringify([
//     {
//       name: 'Mango',
//       age: 2,
//     },
//   ]),
// );