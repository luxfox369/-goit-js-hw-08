// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from "./gallery-items";
const markUp = galleryItems.map(({ preview, original, description }) =>
    `<a class="gallery-item" href="${original}">
        <img class="gallery-image" src=${preview} alt =${description} />
      </a>`).join("");
const galleryRef = document.querySelector(".gallery");
galleryRef.innerHTML = markUp;
const lightbox = new SimpleLightbox('.gallery a', { showCounter: true, captionsData: 'alt', captionDelay: 250,fadeSpeed:100, });


//npm start складаємо всі файли до купи
//згідно package.json start це "parcel src/*.html "
//з каталогу src загружається index.html
//тоді  з нього 01-gallery.html
//тоді з нього цей <script src="js/01-gallery.js" type="module"></script>
//тут є 3 import !!!
//1.бібліотека SimpleLightbox 
//2.стилі css SimpleLightbox
//3.масив даних gallery-items.js)