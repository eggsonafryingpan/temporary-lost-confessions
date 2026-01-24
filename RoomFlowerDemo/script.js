const world = document.getElementById("world");
console.log(world);
const width = 1400;
const height = 788;
world.style.backgroundImage = "url('imgs/room.png')";
const dpr = window.devicePixelRatio || 1;

world.style.width = `${width * dpr / dpr}px`;
world.style.height = `${height * dpr / dpr}px`;
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    console.log(mouseX, mouseY);
})

