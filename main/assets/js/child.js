// Получите ссылку на canvas
var canvas = document.getElementById('myCanvas');
    
// Проверка поддержки HTML5 canvas
if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    
    // Настройки для рисования
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    var drawing = false;
    
    // Обработчики событий для рисования
    canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    });
    
    canvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.stroke();
        }
    });
    
    canvas.addEventListener('mouseup', function () {
        drawing = false;
        ctx.closePath();
    });
    
    canvas.addEventListener('mouseout', function () {
        drawing = false;
        ctx.closePath();
    });
} else {
    alert('Canvas не поддерживается вашим браузером.');
}