const world = document.getElementById("world");
console.log(world);
world.style.backgroundImage = "url('imgs/room.png')";

const gameWidth = 800;
const gameHeight = 450;

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;


const Xscale = Math.floor(gameWidth / screenWidth);