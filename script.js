// 📸 Lightbox para las primeras 3 imágenes (.contenedor-imagenes)
const imagenes = document.querySelectorAll('.contenedor-imagenes img');
const lightbox = document.getElementById('lightbox');
const imagenGrande = document.getElementById('imagen-grande');
const cerrar = document.querySelector('.cerrar');
const flechaIzquierda = document.querySelector('.flecha.izquierda');
const flechaDerecha = document.querySelector('.flecha.derecha');

let imagenActual = 0;

imagenes.forEach((img, index) => {
  img.addEventListener('click', () => {
    imagenGrande.src = img.src;
    lightbox.style.display = 'flex';
    imagenActual = index;
  });
});

cerrar.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

flechaIzquierda.addEventListener('click', () => {
  imagenActual = (imagenActual - 1 + imagenes.length) % imagenes.length;
  imagenGrande.src = imagenes[imagenActual].src;
});

flechaDerecha.addEventListener('click', () => {
  imagenActual = (imagenActual + 1) % imagenes.length;
  imagenGrande.src = imagenes[imagenActual].src;
});

document.addEventListener('keydown', e => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowLeft') flechaIzquierda.click();
    else if (e.key === 'ArrowRight') flechaDerecha.click();
    else if (e.key === 'Escape') cerrar.click();
  }
});

// 🌠 Lightbox con autoplay para últimas 2 imágenes (.imagenes-extra)
const imagenesExtra = document.querySelectorAll('.imagenes-extra img');
const lightboxExtra = document.getElementById('lightbox-extra');
const imagenExtraGrande = document.getElementById('imagen-extra-grande');
const cerrarExtra = document.querySelector('.cerrar-extra');

let indexActual = 0;
let intervaloCambio = null;

function mostrarImagen(index) {
  imagenExtraGrande.src = imagenesExtra[index].src;
}

function cerrarLightbox() {
  lightboxExtra.style.display = 'none';
  clearInterval(intervaloCambio);
  intervaloCambio = null;
}

cerrarExtra.addEventListener('click', cerrarLightbox);

lightboxExtra.addEventListener('click', e => {
  if (e.target === lightboxExtra) {
    cerrarLightbox();
  }
});

document.addEventListener('keydown', e => {
  if (lightboxExtra.style.display === 'flex' && e.key === 'Escape') {
    cerrarLightbox();
  }
});

imagenesExtra.forEach((img, i) => {
  img.addEventListener('click', () => {
    indexActual = i === 0 ? 1 : 0; // Mostrar la otra imagen primero
    mostrarImagen(indexActual);
    lightboxExtra.style.display = 'flex';

    clearInterval(intervaloCambio);
    intervaloCambio = setInterval(() => {
      indexActual = indexActual === 0 ? 1 : 0;
      mostrarImagen(indexActual);
    }, 3000);
  });
});
