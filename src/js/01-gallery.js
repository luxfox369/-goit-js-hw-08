// Add imports above this line
import SimpleLightbox from "simplelightbox"; //звязок з бібліотекою simplelightbox встановленою через npm install
import "simplelightbox/dist/simple-lightbox.min.css";//звязок з css файлом simplelightbox
import { galleryItems } from './gallery-items'; //а в gallery-items.js ' export []
//масив galleryItems доступний тут
// Change code below this line
//console.log(galleryItems);
let markUp = galleryItems //використовуючи масив робимо розмітку  <a><img...></a>
    .map(({ preview,original,description }) => 
    `<a class="gallery__item" href = ${original} >
        <img
        class="gallery__image"
        src=${preview}
        alt=${description}
        />
     </a>` )
    .join("");
//вибираємо в html селектор класу    
const galleryRef = document.querySelector(".gallery");
//додаємо туди створену розмітку
galleryRef.innerHTML = markUp;
//використовуємо SimpleLightbox(є import) для класу .gallery тегів a створеної розмітки
let gallery = new SimpleLightbox('.gallery a', { showCounter:false,captionsData:'alt' , captionDelay: 250 ,});

//npm start складаємо всі файли до купи
//згідно package.json start це "parcel src/*.html "
//з каталогу src загружається index.html
//тоді  з нього 01-gallery.html
//тоді з нього цей <script src="js/01-gallery.js" type="module"></script>
//тут є 3 import !!!
//1.бібліотека SimpleLightbox 
//2.стилі css SimpleLightbox
//3.масив даних gallery-items.js)