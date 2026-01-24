const world = document.getElementById("world");
console.log(world);
world.style.backgroundImage = "url('imgs/room.png')";

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    console.log(mouseX, mouseY);
})