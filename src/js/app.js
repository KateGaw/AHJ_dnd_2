const images = document.querySelector('.images');
const error = document.getElementById('error-message');
const selectBtn = document.querySelector('#selectBtn');

const drawImages = (img) => {
  for (const i of img) {
    const newImg = document.createElement('img');
    newImg.src = URL.createObjectURL(i);

    newImg.addEventListener('load', () => {
      error.classList.add('visibile');
      const newElem = document.createElement('div');
      newElem.className = 'image-element';
      newElem.innerHTML = '<div class="delBtn">✗</div>';
      newElem.appendChild(newImg);
      images.appendChild(newElem);
    });

    newImg.addEventListener('error', () => {
      error.classList.remove('visibile');
    });
  }
};


const dnd = document.querySelector('#dnd');

// add picture for DnD
const dndAdding = () => {
  dnd.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  dnd.addEventListener('dragleave', (event) => {
    event.preventDefault();
  });

  dnd.addEventListener('drop', (event) => {
    event.preventDefault();
    const pic = Array.from(event.dataTransfer.files);
    drawImages(pic);
  });
};
dndAdding();


// add picture for clicking
dnd.addEventListener('click', () => {
  selectBtn.value = null;
  selectBtn.dispatchEvent(new MouseEvent('click'));
});

// show picture on the page
selectBtn.addEventListener('input', (event) => {
  const pic = Array.from(event.currentTarget.files);
  drawImages(pic);
});

// delete picture
images.addEventListener('click', (event) => {
  if (event.target.className === 'delBtn') {
    const img = event.target.closest('.image-element');
    img.parentNode.removeChild(img);
  }
});
