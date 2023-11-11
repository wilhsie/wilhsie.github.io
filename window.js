window.addEventListener("DOMContentLoaded", (event) => {
    let target = document.querySelector(".drag"), x = 0, y = 0;

    function onDrag(e) {
    // we use the coords of the mousedown event
    target.style.transform = `translate(${e.clientX - x}px, ${e.clientY - y}px)`;
    }

    function onLetGo() {
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', onLetGo);
    }

    function onGrab(e) {
        // we store the point of click(coords)
        x = e.offsetX, y = e.offsetY;
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', onLetGo);
    }

    if (target) {
        target.addEventListener('mousedown', onGrab);
    }
});