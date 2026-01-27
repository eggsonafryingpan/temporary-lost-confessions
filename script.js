import { GameObject } from './GameObject.js';
import { GameTextBox } from './GameTextBox.js';

export const width = 1400;
export const height = 788;


const bedroom = document.getElementById("bedroom");
let currRoom = bedroom;
const world = document.getElementById("world");
world.style.width = width + 'px';
world.style.height = height + 'px';


const zoom = document.getElementById("zoom");
const zoomImg = document.getElementById("zoomImg");

zoom.addEventListener('click', () => zoom.style.display = 'none');

function setZoom(o) {
    if (textBox.isHidden()) {
        const zoom = document.getElementById("zoom");
        const zoomImg = document.getElementById("zoomImg");
        console.log(zoomImg);
        zoom.style.display = 'flex';
        zoomImg.src = o.imgSrc + "Zoom.png";
    }
}

const textBox = new GameTextBox();


async function textChain(arr) {
    for (const func of arr) {
        await func();
    }
}

function setTextBox(text) {
    textBox.setText(text);
    return textBox.textPromise;
}

function setTextBoxConfirm(text, yes, no) {
    textBox.setTextConfirm(text, yes, no);
    return textBox.textPromise;
}

const inventory = [];

function inventoryRemove(o) {
    let index = inventory.indexOf(o);
    if (index != -1) {
        inventory.splice(index, 1);
    }
}


document.addEventListener('mousemove', (e) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    if (innerWidth > width) mouseX -= ((innerWidth - width) / 2);
    if (innerHeight > height) mouseY -= ((innerHeight - height) / 2);
    // console.log(mouseX, mouseY);
})


const click = new Audio('sound/click.wav');
const serenade = new Audio('sound/schubertSerenade.mp3');


//KATEEEEE this is how u make a new object:
// const [objName] = new GameObject(
// [x],
// [y],
// [file name without .png or the folders its in],
// [room its in aka the folder its in],
// [z index/layer its on])

//Example (the img is at imgs/test/flower.png but you only need to put 'flower')
// const flower = new GameObject(750, 470, 'flower', test, 5);


//How to set what it does when its click:
// [varName].setOnClick( () => {[function where something happens]})
// In the example I use setTextBox() and setTextBoxConfirm()

// How to use setTextBox():
//setTextBox([text that pops up])  --> function handles the rest

//How to use setTextBoxConfirm():
//setTextBoxConfirm([text],[function of what happen when you click yes], [function of what happens when you click no]);

//Example:
// flower.setOnClick(() => { setTextBox("A flower.") });
// flower.setOnClick(() => { setTextBoxConfirm("Do u want the flower?, yesFunction(), noFunction()")});
// yesFunction() {
//  blah blah blah
// }
// noFunction() {
//  blah blah blah
// }

// room 1 loading

//testing change later
const gameWindow = new GameObject(167, 259, 'window', bedroom);
// gameWindow.setOnClick(() => {
//     if (gameWindow.state == "") {
//         gameWindow.setImgState("Poster");
//     } else { gameWindow.setImgState("") };
// });
gameWindow.setOnClick(() => { setTextBox("A window. It's cold outside, you should probably keep it closed.") });



const bed = new GameObject(255, 483, 'bed', bedroom, 2);
// bed.setOnClick(() => { setTextBox("A comfy bed.") });
bed.setOnClick(() => { setTextBox("A comfy bed.") });

const calender = new GameObject(915, 346, 'calender', bedroom, 3);
calender.setOnClick(() => { setZoom(calender); });

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
cd.setOnClick(() => { setTextBoxConfirm('A CD titled in black pen: "Serenade - Franz Schubert". It\'s your favorite song. Pick it up?', () => { inventory.push(cd), cd.hide() }) });

const cds = new GameObject(277, 658, 'cds', bedroom, 4)
cds.setOnClick(() => { setTextBox('A CD collection.') });

const desk = new GameObject(1027, 330, 'desk', bedroom, 3);
desk.setOnClick(() => { setTextBox("A desk. You built it yourself.") });

const chair = new GameObject(981, 541, 'chair', bedroom, 4);
chair.setOnClick(() => { setTextBox("A chair. You picked it out at IKEA.") });

const books = new GameObject(1168, 345, 'books', bedroom, 5);
books.setOnClick(() => { setTextBox("Math textbooks, classic novels, and mangas.") });

const picture = new GameObject(1124, 361, 'picture', bedroom, 4);
picture.setOnClick(() => { setTextBox("A photo of you and someone else. You look happy.") });

const penContainer = new GameObject(1248, 528, 'penContainer', bedroom, 4);
penContainer.setTranslate("bottomRight");
penContainer.setOnClick(() => {
    if (penContainer.state != 'PenOut') {
        setTextBoxConfirm("Three pens you got from a job fair. Take one?",
            () => {
                penContainer.setImgState('PenOut');
                inventory.push(penContainer); //change to pen not pen container
            })
    } else {
        setTextBox("Two pens you got from a job fair.");
    }
});


const todo = new GameObject(1153, 420, 'todo', bedroom, 4);
todo.setOnClick(() => { setZoom(todo); });

const cdPlayer = new GameObject(1170, 519, 'cdPlayer', bedroom, 5);
cdPlayer.setTranslate("bottomRight");
cdPlayer.setOnClick(() => {
    if (inventory.includes(cd)) {
        textChain([
            () => setTextBoxConfirm(
                "Place the CD in the CD player?",
                () => {
                    cdPlayer.setImgState("Closed");
                    inventoryRemove(cd);
                    serenade.play();
                    setTimeout(() => {
                        click.play();
                        puzzleDrawer.unlocked = true;
                    }, 1000);
                }),//2nd in sequence
            () => setTextBox('"Serenade - Franz Schubert" plays. You hear a click from under the desk.')
        ]);
    } else if (cdPlayer.state == "Closed") {
        setTextBox("A beautiful classical piece plays.");
    } else { setTextBox("A CD player. It was your 20th birthday present.") };
});


const resume = new GameObject(1053, 529, 'resume', bedroom, 7);
resume.hide();
resume.setOnClick(() => {
    setTextBoxConfirm("It's your resume! You need it for the job interview today. Pick it up?",
        () => {
            inventory.push(resume);
            resume.hide();
        }
    )
});


const letter = new GameObject(1057, 527, 'letter', bedroom, 6);
letter.hide();
letter.setOnClick(
    () => setTextBoxConfirm("A letter... Take it?", () => { console.log("kitty cat appears") })
);


const drawer = new GameObject(1031, 508, 'drawer', bedroom, 4);
drawer.setOnClick(() => setTextBox("A drawer. It's a normal drawer."));

const puzzleDrawer = new GameObject(1122, 558, 'puzzleDrawer', bedroom, 5);
puzzleDrawer.unlocked = false;
puzzleDrawer.setOnClick(() => {
    if (!puzzleDrawer.unlocked)
        setTextBox("A locked drawer. There's a black box with wires. You spent a lot of time working on that.");
    else if (puzzleDrawer.state == "")
        setTextBoxConfirm("It's unlocked. Open it?", () => {
            puzzleDrawer.setImgState("Open")
            resume.show();
            letter.show();
        })
    else {
        setTextBox("The mechanism worked.");
    }
});
puzzleDrawer.setTranslate("bottomRight");


const spacePaper = new GameObject(1296, 357, 'spacePaper', bedroom, 2);
spacePaper.setOnClick(() => { setZoom(spacePaper); });

const poster1 = new GameObject(425, 309, 'poster1', bedroom, 2);
poster1.setOnClick(() => { setTextBox("A poster of your favorite movie.") });

const poster2 = new GameObject(580, 349, 'poster2', bedroom, 2);
poster2.setOnClick(() => { setTextBox("A poster of your favorite game.") });


//when player walks out and back in
function changeBedroom() {
    alarmclock.setImgState("777");
    alarmclock.setOnClick(() => { setTextBox("An alarm clock. It's 7:77 am.") });
    gameWindow.setImgState("Poster");
    gameWindow.setOnClick(() => { setTextBox("A poster of a window. How odd.") })
}


