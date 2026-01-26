import { GameObject } from './GameObject.js';

export const width = 1400;
export const height = 788;


const bedroom = document.getElementById("bedroom");
console.log(bedroom);
let currRoom = bedroom;
const world = document.getElementById("world");
world.style.width = width + 'px';
world.style.height = height + 'px';

const textBox = document.getElementById("textBox");
const textBoxText = document.getElementById("textBoxText");
textBox.style.left = width / 2 + 'px';
textBox.style.top = height * 0.85 + 'px';
textBox.addEventListener('click', () => { textBox.style.display = 'none' });

function setTextBox(text) {
    textBox.style.display = 'block';
    textBoxText.innerHTML = text;
}



document.addEventListener('mousemove', (e) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    if (innerWidth > width) mouseX -= ((innerWidth - width) / 2);
    if (innerHeight > height) mouseY -= ((innerHeight - height) / 2);
    console.log(mouseX, mouseY);
})



//                                x     y     path to img           room
// const flower = new GameObject(750, 470, 'flower', test);
// flower.setOnClick(() => { setTextBox("A flower.") });

// room 1 loading
// const alarmclock = new GameObject(300, 300, 'alarmclock', bedroom);
// alarmclock.setOnClick(() => { setTextBox("An alarm clock. It's 7:00 am.") });
// const bed = new GameObject(,,'bed')
const gameWindow = new GameObject(167, 259, 'window', bedroom);
gameWindow.setOnClick(() => {
    if (gameWindow.state == "") {
        console.log("dsjlkfjs");
        gameWindow.setImgState("Poster");
    } else { gameWindow.setImgState("") };
});



const bed = new GameObject(255, 483, 'bed', bedroom, 2);
bed.setOnClick(() => { setTextBox("A comfy bed.") });

const calender = new GameObject(915, 346, 'calender', bedroom, 3);
// calender.setOnClick();

const hamper = new GameObject(704, 551, 'hamper', bedroom, 2);
hamper.setOnClick(() => { setTextBox("A hamper. You have to do the laundry on Sunday.") });

const mirror = new GameObject(731, 314, 'mirror', bedroom, 2);
mirror.setOnClick(() => { setTextBox("You see yourself in a nice dress shirt.") });

const door = new GameObject(861, 286, 'door', bedroom, 2);
door.setOnClick(() => { setTextBox("You try to leave, but you feel like you forgot something.") });

const nightstand = new GameObject(152, 607, 'nightstand', bedroom, 2);
nightstand.setOnClick(() => { setTextBox("A nightstand.") });

const cup = new GameObject(281, 585, 'cup', bedroom, 4);
cup.setOnClick(() => { setTextBox("A cup. You got thirsty last night.") });

const alarmclock = new GameObject(222, 597, 'alarmclock', bedroom, 4);
alarmclock.setOnClick(() => { setTextBox("An alarm clock. It's 7:00 am.") });

const cd = new GameObject(282, 623, 'cd', bedroom, 4);
cd.setOnClick(() => { setTextBox('A cd titled "Schubert - Serenade", your favorite.') });
//ADD YES NO

const cds = new GameObject(277, 658, 'cds', bedroom, 4)
cds.setOnClick(() => { setTextBox('A cd collection.') });



const desk = new GameObject(1027, 330, 'desk', bedroom, 3);
desk.setOnClick(() => { setTextBox("A desk. You built it yourself.") });

const chair = new GameObject(981, 541, 'chair', bedroom, 4);
chair.setOnClick(() => { setTextBox("A chair. You picked it out at IKEA.") });

const books = new GameObject(1168, 345, 'books', bedroom, 5);
books.setOnClick(() => { setTextBox("Math textbooks, classic novels, and mangas.") });

const picture = new GameObject(1124, 361, 'picture', bedroom, 4);
picture.setOnClick(() => { setTextBox("A photo of you and someone else. You look happy.") });

const penContainer = new GameObject(1248, 528, 'penContainer', bedroom, 4);
//penContainer.setOnClick(() => {setTextBox("A comfy bed.")});
penContainer.setTranslate("bottomRight");

const todo = new GameObject(1153, 420, 'todo', bedroom, 4);
//todo.setOnClick(() => {setTextBox("A comfy bed.")});

const cdPlayer = new GameObject(1170, 519, 'cdPlayer', bedroom, 5);
//change
cdPlayer.setOnClick(() => { setTextBox("A cd player. It was your 20th birthday present") });
cdPlayer.setTranslate("bottomRight");

const drawer = new GameObject(1031, 508, 'drawer', bedroom, 4);
drawer.setOnClick(() => { setTextBox("A drawer. It's a normal drawer.") });

const puzzleDrawer = new GameObject(1122, 558, 'puzzleDrawer', bedroom, 5);
puzzleDrawer.setOnClick(() => { setTextBox("A drawer. There's a black box with wires. You spent a lot of time working on that.") });
puzzleDrawer.setTranslate("bottomRight");

const resume = new GameObject(1053, 529, 'resume', bedroom, 7);
resume.hide();
const letter = new GameObject(1057, 527, 'letter', bedroom, 6);
letter.hide();

const spacePaper = new GameObject(1296, 357, 'spacePaper', bedroom, 2);
//spacePaper.setOnClick(() => {setTextBox("A comfy bed.")});

const poster1 = new GameObject(425, 309, 'poster1', bedroom, 2);
poster1.setOnClick(() => { setTextBox("A poster of your favorite movie.") });

const poster2 = new GameObject(580, 349, 'poster2', bedroom, 2);
poster2.setOnClick(() => { setTextBox("A poster of your favorite game.") });






