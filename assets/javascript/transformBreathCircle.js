canvas.addEventListener('click', () => {
  console.log('clicked canvas');
});

// Inhale - makes circle larger

function draw() {
  var ctx = document.getElementById('myCanvas').getContext('2d');
  ctx.font = '48px serif';
  ctx.fontColor = "#e8ffff";
  ctx.fillText('Inhale', 10, 50);
}

// InhaleHold - rotates perimeter

// Exhale - makes shape smaller

// ExhaleHold - rotates perimeter