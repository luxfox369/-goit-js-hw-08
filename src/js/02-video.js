//npm start складаємо всі файли до купи
//згідно package.json start це "parcel src/*.html "
//з каталогу src загружається index.html
//тоді  з нього 02-video.html
//тоді з нього цей <script src="js/ 02-video.js" type="module"></script>

//Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
//Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
//Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
//Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше,
// ніж раз на секунду.
//import плеєра з б-ки встановленою npm install @vimeo/player
import Player from '@vimeo/player';
import storage from "./storage";
import throttle from "lodash.throttle";

const refVimeoPlayer = document.querySelector('#vimeo-player');//посилання на плеєр в html по id
const player = new Player(refVimeoPlayer); //створення екземпляра плеєра
const LOCALSTORAGE_KEY = "videoplayer-current-time"; //назва ключа для запису текучого часу програвання

let time = storage.load(LOCALSTORAGE_KEY) || {}; //завантажуємо час як JavaScrypt обєкт з localStorage або 0 
console.log('loaded last saved time from localStorage :', time);
player.setCurrentTime(time); //встановлюємо для плеєра  завантажений час

player.on('timeupdate', throttle(onTimeUpdate, 1000)); //обробляємо подію timeupdate

function onTimeUpdate(currentTime) {
    storage.save(LOCALSTORAGE_KEY, currentTime.seconds); //записуємо обєкт currentTime в JSON формат
    console.log("Save currentTime to LocalStorage in sec ", currentTime.seconds);
};

// const currentTime =
// {
//     duration: 61.857,
//     percent: 0.049,
//     seconds: 3.034
// };