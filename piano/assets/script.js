function playSound(keyName) {
  let audio = document.createElement('AUDIO');
  audio.src = `audio/${keyName}.mp3`;
  audio.play();
}

function changeKeyColor(keyIndex, initialColor) {
  let keyPressed = document.getElementsByTagName('kbd')[keyIndex];
  keyPressed.style.background = 'red';

  document.addEventListener('keyup', function() {
    if (initialColor === 'white') {
      keyPressed.style.background = 'white';
    } else if (initialColor === 'black') {
      keyPressed.style.background = 'black';
    }
  });
}

document.addEventListener('keydown', function(event) {
  let keys = 'ASDFGHJWETYU';
  let keyPressed = event.key.toUpperCase();

  if (keys.includes(keyPressed)) {
    let keyPressedIndex = keys.indexOf(keyPressed);
    playSound(keyPressed);
    if (keyPressedIndex < 7) {
      changeKeyColor(keyPressedIndex, 'white');
    } else {
      changeKeyColor(keyPressedIndex, 'black');
    }
  }
});