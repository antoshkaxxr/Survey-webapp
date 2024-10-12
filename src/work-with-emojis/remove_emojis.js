// Найти элемент с id "canvas"
var canvasElement = document.getElementById('canvas');

// Проверить, существует ли элемент
if (canvasElement) {
    // Удалить элемент из DOM
    canvasElement.parentNode.removeChild(canvasElement);
} else {
    console.log("Элемент с id 'canvas' не найден.");
}