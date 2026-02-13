import { GameObject } from './GameObject.js';
import { GameTextBox } from './GameTextBox.js';
import { GameIcon } from './GameIcon.js';

export const width = 1400;
export const height = 788;

let mouseY;
let mouseX;

//NOT BASED ON SCREEN BASED ON FULL WINDOW
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const eventBus = new EventTarget();

const bedroom = document.getElementById("bedroom");
const flowerRoom = document.getElementById("flowerRoom");
const escalatorRoom = document.getElementById("escalatorRoom");
const bentHallway = document.getElementById("bentHallway");
const mallRoom = document.getElementById("mallRoom");
const museumRoom = document.getElementById("museumRoom");
const swanRoom = document.getElementById("swanRoom");
const gatchaRoom = document.getElementById("gatchaRoom");
const subwayRoom = document.getElementById("subwayRoom")
const gummyRoom = document.getElementById("gummyRoom");
const classroom = document.getElementById("classroom");
const butterflyRoom = document.getElementById("butterflyRoom");
const vaultRoom = document.getElementById("vaultRoom");
const spaceRoom = document.getElementById("spaceRoom");
const windRoom = document.getElementById("windRoom");
const radioZoom = document.getElementById("radioZoom");

const a = document.getElementById("a");
const b = document.getElementById("b");
const c = document.getElementById("c");
const d = document.getElementById("d");
const f = document.getElementById("f");
const g = document.getElementById("g");
const h = document.getElementById("h");
const i = document.getElementById("i");
const j = document.getElementById("j")
const k = document.getElementById("k");
const ladderRoom = document.getElementById("ladderRoom");

let currRoom = bedroom;
setRoom(currRoom);

const world = document.getElementById("world");
world.style.width = width + 'px';
world.style.height = height + 'px';

const freeze = document.getElementById("freeze");

const puzzle1 = document.getElementById("puzzle1");
const puzzle2 = document.getElementById("puzzle2");
const puzzle3 = document.getElementById("puzzle3");
const puzzle4 = document.getElementById("puzzle4");
const puzzles = [puzzle1, puzzle2, puzzle3, puzzle4];

const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");
const input4 = document.getElementById("input4");
const inputs = [input1, input2, input3, input4];

const answers = ["swan", "lilac", "stone", "is within our power"];
let orreryNum = 0;
addInputListener();

function hideAllPuzzles() {
    for (let p of puzzles) {
        p.style.display = 'none';
    }
}

function addInputListener() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', function wrapper(e) {
            if (e.target.value.toLowerCase() == "ivantill") {
                const till = document.createElement('img');
                till.src = "imgs/till.png";
                spaceRoom.appendChild(till);
            }
            if (e.target.value.toLowerCase() == answers[i]) {
                orreryNum++;
                orrery.setImgState(orreryNum.toString());
                inputs[i].disabled = true;
                if (orreryNum == 4) {
                    finalDoor.setImgState("Open");
                    doorOpening.play();
                }
                inputs[i].removeEventListener('input', wrapper);
            }
        });
    }
}




const lockerMusic = new Audio('cutscenes/lockerMusic.mp3');

const zoom = document.getElementById("zoom");
const zoomImg = document.getElementById("zoomImg");
const diaryText = document.getElementById("diaryText");
zoom.addEventListener('click', () => {
    zoom.style.display = 'none';
    diaryText.style.display = 'none';
    hideAllPuzzles();
    if (currentZoom == "dickinson") {
        currentZoom = "";
        currentSong.pause();
        playCutscene("locker", lockerMusic);
    }

});


const cutscene = document.getElementById("cutscene");
const playedCutscenes = [];
function playCutscene(name, music = null) {
    if (!playedCutscenes.includes(name)) {
        cutscene.src = "cutscenes/" + name + ".mp4";
        cutscene.style.display = 'block';
        playedCutscenes.push(name);
        if (name == "locker") {
            vaultDiary.show();
        }
        if (music) {
            setSong(music);
        }
    }
}

cutscene.addEventListener("ended", () => {
    lockerMusic.pause();
    cutscene.style.display = 'none';
});

let currentZoom = "";

function setZoom(o) {
    if (typeof o == "string") {
        if (textBox.isHidden()) { //maybe change
            zoomImg.src = 'imgs/' + o + "Zoom.png";
            zoom.style.display = 'flex';
        }
    } else {
        if (textBox.isHidden()) { //maybe change
            if (o) {
                zoomImg.src = o.imgSrc + "Zoom.png";
            }
            zoom.style.display = 'flex';
        }
    }
}


function setDiary(date) {
    setZoom(null);
    if (textBox.isHidden()) {
        zoomImg.src = "imgs/diary.png";
        diaryText.innerHTML = diaryEntries.get(date);
        if (date == "dickinson" || date == "deuxDef") {
            diaryText.style.fontFamily = 'serif';
        } else {
            diaryText.style.fontFamily = 'handwriting';
        }
        diaryText.style.display = 'block';
    }
}


function setPuzzle(num) {
    setZoom(null);
    if (textBox.isHidden()) {
        puzzles[num - 1].style.display = 'inline-block';
        zoomImg.src = "imgs/diary.png";
    }
}

function setRoom(room) {
    currRoom.style.display = 'none';
    room.style.display = 'block';
    currRoom = room;
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


//INVENTORY HANDLING
const inventory = new Map();


function inventoryRemove(name = "") {
    inventory.get(name).hide();
    inventory.delete(name);
}

function inventoryAdd(name = "", onclick) {
    const icon = new GameIcon(name, onclick);
    icon.show();
    inventory.set(name, icon);
}

const diaryEntries = new Map([
    ["oct23", ""],
    ["feb14", ""],
    ["feb15", ""],
    ["mar15", ""],
    ["mar15Continued", ""],
    ["may6", ""],
    ["dickinson", ""],
    ["deuxDef", ""],
    ["june4", ""],
    ["june5", ""]
]);


diaryEntries.forEach((_, date) => {
    fetch('diary/' + date + '.txt')
        .then(response => response.text())
        .then(text => {
            diaryEntries.set(date, text);
        })

});


document.addEventListener('mousemove', (e) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    if (innerWidth > width) mouseX -= ((innerWidth - width) / 2);
    if (innerHeight > height) mouseY -= ((innerHeight - height) / 2);
    // console.log(mouseX, mouseY);
})


const click = new Audio('sound/click.wav');
const serenade = new Audio('sound/schubertSerenade.mp3');
const theSwan = new Audio('sound/theSwan.mp3');
const deux = new Audio('sound/pasDeDeux.mp3');
const doorOpening = new Audio('sound/doorOpening.mp3');
const rain = new Audio('sound/rain.mp3');
const thud = new Audio('sound/thud.mp3');
const wind = new Audio('sound/wind.mp3');
const bang = new Audio('sound/bang.mp3');
const radioStatic = new Audio('sound/radioStatic.mp3');

radioStatic.loop = true;
wind.loop = true;
rain.loop = true;
let currentSong = null;


function setSong(song) {
    if (currentSong) {
        currentSong.pause();
    }
    currentSong = song;
    currentSong.play();
    currentSong.loop = true;
}


// room 1 loading

function loadActI() {
    playCutscene("actI");

}
loadActI();

let boxCase = null;
let vault = null;
let dickinson = null;
let vaultDiary = null;
let orrery = null;
let finalDoor = null;
let butterflyDoorOpened = false;

let currentRadioSong;


function loadBedroom() {

    //when player walks out and back in
    let bedroomChanged = false;
    function changeBedroom() {
        if (!bedroomChanged) {
            bedroomChanged = true;
            alarmclock.setImgState("777");
            alarmclock.setOnClick(() => { setTextBox("An alarm clock. It's 7:77 am.") });
            gameWindow.setImgState("Poster");
            gameWindow.setOnClick(() => { setTextBox("A poster of a window. It's peeling from the wall.") })
            mirror.setOnClick(() => { setTextBox("You don't see anyone in the mirror.") })
            cdPlayer.setOnClick(() => {
                if (inventory.has("swanCD")) {
                    setTextBoxConfirm('Take out the CD and play "The Swan (Carnaval of the Animals) - Best of Saint-Saëns"?',
                        () => {
                            setSong(theSwan);
                            boxCase.hide();
                            inventoryRemove("swanCD");

                        }
                    )
                } else if (inventory.has("deuxCD")) {
                    if (inventory.has("butterflyKey") || butterflyDoorOpened) {
                        setTextBoxConfirm('Take out the CD and play "Pas de deux - Tchaikovsky"?', () => {
                            setSong(deux);
                            inventoryRemove("deuxCD");
                            vault.setImgState("Open");
                            vault.setLocation(596, 281);
                            dickinson.show();
                        })
                    } else {
                        setTextBox("You wonder if \"The Swan\" did anything. Maybe check near the museum?");
                    }
                } else if (currentSong == theSwan) {
                    setTextBox('"The Swan" plays.');
                } else if (currentSong == deux) {
                    setTextBox('"Pas de deux" plays.');
                } else if (currentSong == serenade) {
                    setTextBox('"Serenade" plays.');
                }
            })
        }
    }
    const gameWindow = new GameObject(167, 259, 'window', bedroom);
    gameWindow.setOnClick(() => { setTextBox("A window. It's cold outside, you should probably keep it closed.") });



    const bed = new GameObject(255, 483, 'bed', bedroom, 2);
    bed.setOnClick(() => { setTextBox("A comfy bed.") });

    const calender = new GameObject(915, 346, 'calender', bedroom, 3);
    calender.setOnClick(() => { setZoom(calender); });

    const hamper = new GameObject(704, 551, 'hamper', bedroom, 2);
    hamper.setOnClick(() => { setTextBox("A hamper. You have to do the laundry on Sunday.") });

    const mirror = new GameObject(731, 314, 'mirror', bedroom, 2);
    mirror.setOnClick(() => { setTextBox("You see yourself in a nice dress shirt.") });


    const nightstand = new GameObject(152, 607, 'nightstand', bedroom, 2);
    nightstand.setOnClick(() => { setTextBox("A nightstand.") });

    const cup = new GameObject(281, 585, 'cup', bedroom, 4);
    cup.setOnClick(() => { setTextBox("A cup. You got thirsty last night.") });

    const alarmclock = new GameObject(222, 597, 'alarmclock', bedroom, 4);
    alarmclock.setOnClick(() => { setTextBox("An alarm clock. It's 7:00 am.") });

    const serenadeCD = new GameObject(282, 623, 'serenadeCD', bedroom, 4);
    serenadeCD.setOnClick(() => {
        setTextBoxConfirm('A CD titled in black pen: "Serenade - Franz Schubert". It\'s your favorite song. Pick it up?',
            () => {
                inventoryAdd("serenadeCD", () => { setTextBox('"Serenade - Franz Schubert"') });
                currentSong = serenade;
                serenadeCD.hide()
            })
    });




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
                    inventoryAdd("pen", () => { setTextBox("A pen.") });
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
        if (inventory.has("serenadeCD")) {
            textChain([
                () => setTextBoxConfirm(
                    "Place the CD in the CD player?",
                    () => {
                        cdPlayer.setImgState("Closed");
                        inventoryRemove("serenadeCD");
                        setSong(serenade)
                        setTimeout(() => {
                            click.play();
                            puzzleDrawer.setImgState("SlightlyOpen");
                        }, 1000);
                    }),//2nd in sequence
                () => setTextBox('"Serenade - Franz Schubert" plays. You hear a click from the desk drawer.')
            ]);
        } else if (cdPlayer.state == "Closed") {
            setTextBox('"Serenade" plays.');
        } else { setTextBox("A CD player. It was your 16th birthday present.") };
    });

    const resume = new GameObject(1053, 529, 'resume', bedroom, 7);
    resume.hide();
    resume.setOnClick(() => {
        setTextBoxConfirm("It's your resume! You need it for the job interview today. Pick it up?",
            () => {
                inventoryAdd("resume", () => { setTextBox("Your resume.") });
                resume.hide();
            }
        )
    });




    const drawer = new GameObject(1031, 508, 'drawer', bedroom, 4);
    drawer.setOnClick(() => setTextBox("A drawer. It's a normal drawer."));

    const puzzleDrawer = new GameObject(1122, 558, 'puzzleDrawer', bedroom, 5);
    puzzleDrawer.setOnClick(() => {
        if (puzzleDrawer.state == "")
            setTextBox('A locked drawer. There\'s a sticky note. It says: "Secret Drawer: Open with     favorite song".');
        else if (puzzleDrawer.state == "SlightlyOpen")
            setTextBoxConfirm("It's unlocked. Open it?", () => {
                puzzleDrawer.setImgState("Open");
                resume.show();
                letter.show();
            })
        else {
            setTextBox('An opened drawer. There\'s a sticky note. It says: "Secret Drawer: Open with favorite song"');
        }
    });
    puzzleDrawer.setTranslate("bottomRight");


    const spacePaper = new GameObject(1296, 357, 'spacePaper', bedroom, 2);
    spacePaper.setOnClick(() => { setZoom(spacePaper); });

    const poster1 = new GameObject(425, 309, 'poster1', bedroom, 2);
    poster1.setOnClick(() => { setTextBox("A poster of your favorite movie.") });

    const poster2 = new GameObject(580, 349, 'poster2', bedroom, 2);
    poster2.setOnClick(() => { setTextBox("A poster of your favorite game.") });

    const door = new GameObject(861, 286, 'door', bedroom, 2);
    door.setOnClick(() => {
        if (!inventory.has("resume")) {
            setTextBox("You try to leave, but you feel like you forgot something.");
        } else {
            setTextBox("You feel strangely pulled to the letter in the drawer.");
        }
    });


    const letter = new GameObject(1057, 527, 'letter', bedroom, 6);
    letter.hide();
    letter.setOnClick(
        () => setTextBoxConfirm("A letter you wrote a long time ago. Take it?", () => {
            freeze.style.display = 'block';
            handAnim();
        })
    );

    const handClosed = new GameObject(1000, 0, 'handClosed', bedroom, 7);
    handClosed.hide();
    const handOpen = new GameObject(1000, -552, 'handOpen', bedroom, 7);
    handOpen.hide();

    function handAnim() {
        const downKF = [
            { top: '-552px' },
            { top: '0' }
        ];
        const downOpt = {
            duration: 1500,
            easing: 'ease-in-out',
            fill: 'forwards'
        };
        const downAnim = handOpen.img.animate(downKF, downOpt);
        downAnim.pause();


        const upKF = [
            { top: '0' },
            { top: '-556px' }
        ];
        const upOpt = {
            duration: 1500,
            easing: 'ease-in-out',
            fill: 'forwards'
        };
        const upAnim = handClosed.img.animate(upKF, upOpt);
        upAnim.pause();


        downAnim.onfinish = () => {
            handOpen.hide();
            letter.hide();
            handClosed.show();
            upAnim.play();
        };
        upAnim.onfinish = () => {
            handClosed.hide();
            textChain([() => setTextBox("Crap."), () => setTextBox("You can't let anyone read that letter."), () => setTextBox("You have to get it back.")]);
            freeze.style.display = 'none';
            door.setOnClick(() => {
                setTextBoxConfirm("Open the door?", () => {
                    setRoom(flowerRoom);
                    changeBedroom();
                })
            })
        };

        handOpen.show();
        downAnim.play();
    }






}

loadBedroom();

//Flower room
function loadFlowerRoom() {
    const door1 = new GameObject(112, 146, 'door1', flowerRoom, 2);
    door1.setOnClick(() => { setRoom(escalatorRoom) });
    door1.setHighlight();

    const door2 = new GameObject(594, 206, 'door2', flowerRoom, 2);
    door2.setHighlight();
    door2.setOnClick(() => { setRoom(spaceRoom) });

    const exit3 = new GameObject(1146, 504, 'door3', flowerRoom, 2);
    exit3.hide();
    exit3.setHighlight();
    exit3.setOnClick(() => { setRoom(subwayRoom) });

    const flowerFrame = new GameObject(1109, 260, 'flowerFrame', flowerRoom, 2);
    flowerFrame.setOnClick(() => {
        if (inventory.has("keychain")) {
            setTextBoxConfirm("Place the lilac keychain on the frame?", () => {
                flowerFrame.setImgState("Keychain");
                inventoryRemove("keychain");
                exit3.show();
            });
        } else if (flowerFrame.state == "Keychain") {
            flowerFrame.setOnClick(() => { setTextBox("A lilac and a magnolia sit side by side.") });
        }
        else {
            setTextBox("A wooden frame. It's missing something.");
        }
    });

    const magnolia = new GameObject(1197, 351, 'magnolia', flowerRoom, 3);
    magnolia.setOnClick(() => { setTextBox("A beautiful magnolia.") });

    const bottomHighlight = new GameObject(0, 678, 'bottomHighlight', flowerRoom, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(() => { setRoom(bedroom) });



}
loadFlowerRoom();

//escalator room

function loadEscalatorRoom() {
    const door1 = new GameObject(1145, 197, 'door1', escalatorRoom, 2);
    door1.setHighlight();
    door1.setOnClick(() => { setRoom(flowerRoom) });

    const door2 = new GameObject(499, 193, 'door2', escalatorRoom, 3);
    door2.setHighlight();
    door2.setOnClick(() => { setRoom(bentHallway) });

    const escalator = new GameObject(60, 224, 'escalator', escalatorRoom, 2);
    escalator.setOnClick(() => { setTextBox("An escalator. It doesn't move. Guess it's a staircase now.") })
}

loadEscalatorRoom();

function loadBentHallway() {
    const highlight = new GameObject(556, 226, 'exitHighlight', bentHallway, 3);
    highlight.setInvisibleHighlight();
    highlight.setOnClick(() => { setRoom(mallRoom) });
    const lipstickPoster = new GameObject(1100, 150, 'lipstickPoster', bentHallway, 3);
    lipstickPoster.setOnClick(() => { setTextBox("f.l.e 50% SALE") });

    const bottomHighlight = new GameObject(0, 678, 'bottomHighlight', bentHallway, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(() => { setRoom(escalatorRoom) });

}

loadBentHallway();

let swanCDStand = null;
function loadMallRoom() {
    const joeShop = new GameObject(1039, 231, 'joeShop', mallRoom, 2);
    joeShop.setOnClick(() => { setTextBox("A store that sells records and CDs. It looks very familiar.") });
    const cdDisplay = new GameObject(897, 307, 'cdDisplay', mallRoom, 2);
    cdDisplay.setOnClick(() => { setTextBox("An empty display for Joe's Records and CDs.") });
    swanCDStand = new GameObject(943, 332, 'cdStand', mallRoom, 3);
    swanCDStand.setHighlight();
    swanCDStand.hide();
    swanCDStand.setOnClick(() => {
        setTextBoxConfirm('A CD. It\'s titled "The Swan (Carnaval of the Animals) - Best of Saint-Saëns". Take it?', () => {
            inventoryAdd("swanCD");
            swanCDStand.hide();
        })
    })
    const exit1 = new GameObject(344, 289, 'exit1', mallRoom, 2);
    exit1.setHighlight();
    exit1.setOnClick(() => { setRoom(gatchaRoom) })

    const display = new GameObject(93, 229, 'display', mallRoom, 2);
    display.setOnClick(() => { setTextBox("An empty display case.") })
    const diary = new GameObject(556, 361, 'diary', mallRoom, 2);
    diary.setOnClick(() => { setDiary("oct23") });
    const exit2 = new GameObject(627, 404, 'exit2Highlight', mallRoom, 2);
    exit2.setInvisibleHighlight();
    exit2.setOnClick(() => { setRoom(museumRoom) });

    const bottomHighlight = new GameObject(0, 678, 'bottomHighlight', mallRoom, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(() => { setRoom(bentHallway) });

}

loadMallRoom();

function loadMuseumRoom() {
    const painting = new GameObject(462, 220, 'painting', museumRoom, 2);
    painting.setOnClick(() => { setTextBox("An oil painting littered with geometric shapes. It's very blue.") })
    const sign = new GameObject(959, 451, 'sign', museumRoom, 2);
    sign.setOnClick(() => { setTextBox('The sign reads: "The Sea On a Rainy Night by Anonymous".') })
    const exit = new GameObject(1106, 385, 'exit', museumRoom, 2);
    exit.setHighlight();
    exit.setOnClick(() => { setRoom(swanRoom) });
    const bottomHighlight = new GameObject(0, 678, 'bottomHighlight', museumRoom, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(() => { setRoom(mallRoom) });
}

loadMuseumRoom();

function loadSwanRoom() {
    const exit = new GameObject(186, 308, 'exit', swanRoom, 2);
    exit.setHighlight();
    exit.setOnClick(() => { setRoom(museumRoom) });
    const stand = new GameObject(623, 485, 'stand', swanRoom, 2);
    stand.setOnClick(() => { setTextBox("A marble stand for the exhibit. It has a swan engraved on it.") })
    const diary2 = new GameObject(644, 497, 'diary2', swanRoom, 4);
    diary2.hide();
    diary2.setOnClick(() => { setDiary("feb15") });
    const butterflyKey = new GameObject(691, 465, 'butterflyKey', swanRoom, 4);
    butterflyKey.hide();
    butterflyKey.setOnClick(() => {
        setTextBoxConfirm('A key shaped like a butterfly. Take it?', () => {
            inventoryAdd("butterflyKey", () => { setTextBox('A key shaped like a butterfly.') });
            butterflyKey.hide();
            diary2.show();
        })
    }
    );

    const box = new GameObject(728, 508, 'box', swanRoom, 3);
    box.setTranslate("bottomRight");
    box.setOnClick(() => {
        if (box.state != "Opened") {
            setTextBoxConfirm("Open the box?",
                () => {
                    box.setImgState("Opened");
                    butterflyKey.show();
                })
        } else {
            setTextBox("A wooden box.");
        }
    });
    boxCase = new GameObject(666, 423, 'case', swanRoom, 5);
    boxCase.setOnClick(() => { setTextBox("A thick glass case protects a wooden box. You wonder how you could open it.") });

    const speaker = new GameObject(364, 166, 'speaker', swanRoom, 2);
    speaker.setOnClick(() => {
        if (currentSong == serenade) {
            setTextBox('A speaker. "Serenade" plays. Is it connected to the CD player in your room? You wonder if you can change the song.')
        } else if (currentSong == theSwan) {
            setTextBox('A speaker. "The Swan" plays.');
        } else if (currentSong == deux) {
            setTextBox('A speaker. "Pas de deux" plays.')
        } else {
            setTextBox("A speaker.");
        }
    })

    const diary = new GameObject(925, 641, 'diary', swanRoom, 2);
    diary.setOnClick(() => { setDiary("feb14") });
}
loadSwanRoom();

function loadGatchaRoom() { // todo create overlay effect
    const diary = new GameObject(450, 635, 'diary', gatchaRoom, 2);
    diary.setOnClick(() => { setDiary("mar15") });

    const diary2 = new GameObject(952, 605, 'diary2', gatchaRoom, 2);
    diary2.hide();
    diary2.setOnClick(() => { setDiary("mar15Continued") });


    const handClosed = new GameObject(1400, 600, 'handClosed', gatchaRoom, 7);
    handClosed.hide();
    const handOpen = new GameObject(848, 600, 'handOpen', gatchaRoom, 7);
    handOpen.hide();

    function handAnim() {
        const inKF = [
            { left: '1400px' },
            { left: '948px' }
        ];
        const opt = {
            duration: 1500,
            easing: 'ease-in-out',
            fill: 'forwards'
        };
        const inAnim = handClosed.img.animate(inKF, opt);
        inAnim.pause();
        const outKF = [
            { left: '948px' },
            { left: '1400px' }
        ];
        const outAnim = handOpen.img.animate(outKF, opt);
        outAnim.pause();


        inAnim.onfinish = () => {
            handClosed.hide();
            handOpen.show();
            diary2.show();
            outAnim.play();
        };
        outAnim.onfinish = () => {
            handOpen.hide();
        };

        handClosed.show();
        inAnim.play();
    }

    const leftGatcha = new GameObject(550, 450, 'leftGatcha', gatchaRoom, 2);
    leftGatcha.setOnClick(() => { setTextBox("A capsule toy machine. It's empty.") });

    const rightCoinSlot = new GameObject(813, 587, 'rightCoinSlot', gatchaRoom, 3);
    rightCoinSlot.setOnClick(() => {
        setTextBoxConfirm("Check the coin slot?", () => {
            setTextBox("There's nothing there.");
        })
    });
    const rightGatcha = new GameObject(783, 450, 'rightGatcha', gatchaRoom, 2);
    rightGatcha.setOnClick(() => { setTextBox("A capsule toy machine. It's empty.") });

    const leftCoinSlot = new GameObject(560, 587, 'leftCoinSlot', gatchaRoom, 3);
    let leftCoinSlotRan = false;
    leftCoinSlot.setOnClick(() => {
        setTextBoxConfirm("Check the coin slot?", () => {
            if (!leftCoinSlotRan) {
                setTextBoxConfirm("Someone left a quarter. Take it?", () => {
                    inventoryAdd("coin", () => { setTextBox("A quarter.") });
                })
                leftCoinSlotRan = true;
            } else {
                setTextBox("It's empty.");
            }

        })
    })


    const gatchaOut = new GameObject(697, 639, 'gatchaOut', gatchaRoom, 4);
    gatchaOut.setOnClick(() => {
        if (gatchaOut.state == "Ball") {
            setTextBoxConfirm("Take the capsule?", () => {
                setZoom("gatchaRoom/keychain");
                inventoryAdd("keychain", () => {
                    setTextBox("A lilac keychain.");
                });
                gatchaOut.setImgState("");
                swanCDStand.show();
                handAnim();
            })
        } else {
            setTextBox("You suppose this is where the capsules come out.");
        }
    })

    const gatcha = new GameObject(675, 450, 'gatcha', gatchaRoom, 3);
    gatcha.setOnClick(() => {
        if (inventory.has("coin")) {
            setTextBoxConfirm("Insert the quarter into the coin slot?", () => {
                gatchaOut.setImgState("Ball");
                inventoryRemove("coin");
                thud.play();
            });
        } else {
            setTextBox("A capsule toy machine. There's a couple left, but you need a quarter.")
        }
    });


    const gatchaPoster = new GameObject(695, 469, 'gatchaPoster', gatchaRoom, 4);
    gatchaPoster.setOnClick(() => { setTextBox("Flower keychains. They're made of plastic, but they look charming.") });


    const bottomHighlight = new GameObject(0, 698, 'bottomHighlight', gatchaRoom, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(() => { setRoom(mallRoom) });
}

loadGatchaRoom();


function loadSubwayRoom() {
    const exit1 = new GameObject(109, 254, 'exit1', subwayRoom, 2);
    exit1.setHighlight();
    exit1.setOnClick(() => { setRoom(flowerRoom) });
    const exit2 = new GameObject(1227, 419, 'exit2', subwayRoom, 2);
    exit2.setHighlight();
    exit2.setOnClick(() => { setRoom(gummyRoom) });
    const subwayDoor = new GameObject(620, 254, 'subwayDoor', subwayRoom, 2);
    subwayDoor.setOnClick(() => { setTextBox("A subway door. It's askew.") });
    const handle1 = new GameObject(1055, 254, 'handle', subwayRoom, 2);
    handle1.setOnClick(() => { setTextBox("A subway handholds. It's collecting dust.") });
    const handle2 = new GameObject(899, 219, 'handle', subwayRoom, 2);
    handle2.setOnClick(() => { setTextBox("A subway handholds. It's collecting dust.") });
    const handle3 = new GameObject(544, 139, 'handle', subwayRoom, 2);
    handle3.setOnClick(() => { setTextBox("A subway handholds. It's collecting dust.") });
    const handle4 = new GameObject(400, 105, 'handle', subwayRoom, 2);
    handle4.setOnClick(() => { setTextBox("A subway handholds. It's collecting dust.") });
}


loadSubwayRoom();

function loadGummyRoom() {
    const sign = new GameObject(657, 271, 'sign', gummyRoom, 2);
    sign.setOnClick(() => { setTextBox("A sign. Left: Lockers. Right: Room 101.") });
    const rightHighlight = new GameObject(751, 80, 'rightHighlight', gummyRoom, 2);
    rightHighlight.setInvisibleHighlight();
    rightHighlight.setOnClick(() => { setRoom(classroom); rain.play(); });

    const leftHighlight = new GameObject(605, 80, 'leftHighlight', gummyRoom, 2);
    leftHighlight.setInvisibleHighlight();
    leftHighlight.setOnClick(() => { setRoom(butterflyRoom) });

    const gummy = new GameObject(542, 596, 'gummy', gummyRoom, 2);
    gummy.setOnClick(() => { setTextBox("An empty gummy package.") });
    const diary = new GameObject(465, 330, 'diary', gummyRoom, 2);
    diary.setOnClick(() => { setDiary("may6") });

    const bottomHighlight = new GameObject(0, 678, 'bottomHighlight', gummyRoom, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(() => { setRoom(subwayRoom) });
}
loadGummyRoom();

function loadClassroom() {
    const exit1 = new GameObject(124, 281, 'exit1', classroom, 2);
    exit1.setHighlight();
    exit1.setOnClick(() => { setRoom(gummyRoom); rain.pause(); });
    const whiteboard = new GameObject(614, 297, 'whiteboard', classroom, 2);
    whiteboard.setOnClick(() => { setTextBox("A whiteboard. The lesson is on The Great Gatsby.") });
    const classroomWindow = new GameObject(943, 74, 'window', classroom, 2);
    classroomWindow.setOnClick(() => { setTextBox("A window. It's raining outside.") }); // TODO GET RAIN SOUND??
    const teacherDesk = new GameObject(448, 418, 'teacherDesk', classroom, 2);
    teacherDesk.setOnClick(() => { setTextBox("The teacher's desk.") });

    const rightDesk = new GameObject(873, 477, 'rightDesk', classroom, 2);
    rightDesk.setImgState("CD");
    rightDesk.setOnClick(() => {
        setTextBoxConfirm("A desk. Look inside?", () => {
            if (rightDesk.state == "CD") {
                setTextBoxConfirm('There\'s a CD titled "Pas de deux - Tchaikovsky". Take it?', () => {
                    inventoryAdd("deuxCD", () => { setTextBox('A CD titled "Pas de deux - Tchaikovsky".') });
                    rightDesk.setImgState("");
                });
            } else {
                setTextBox("It's empty.");
            }
        })
    })

    const rightChair = new GameObject(922, 515, 'rightChair', classroom, 5);
    rightChair.setOnClick(() => { setTextBox("Your seat.") });

    const deuxDef = new GameObject(910, 481, 'deuxDef', classroom, 4);
    deuxDef.setOnClick(() => { setDiary("deuxDef") });

    const leftDesk = new GameObject(426, 477, 'leftDesk', classroom, 2);
    leftDesk.setOnClick(() => {
        setTextBoxConfirm("A desk. Look inside?", () => {
            setTextBox("There's some papers.");
        })
    });

    const leftChair = new GameObject(445, 512, 'leftChair', classroom, 3);
    leftChair.setOnClick(() => { setTextBox("A chair. Someone familiar sits there.") });
}
loadClassroom();

function loadButterflyRoom() {
    const bottomHighlight = new GameObject(0, 678, 'bottomHighlight', butterflyRoom, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(() => { setRoom(gummyRoom) });
    const butterflyDoor = new GameObject(640, 352, 'butterflyDoor', butterflyRoom, 2);
    butterflyDoor.locked = true;
    butterflyDoor.setOnClick(() => {
        if (butterflyDoor.locked) {
            if (inventory.has("butterflyKey")) {
                setTextBoxConfirm("Use the butterfly key?", () => {
                    butterflyDoorOpened = true;
                    butterflyDoor.locked = false;
                    inventoryRemove("butterflyKey");
                    click.play();
                })
            } else {
                setTextBox("It's locked.");
            }
        } else {
            setTextBoxConfirm("Open the door?", () => {
                setRoom(vaultRoom);
            })
        }
    });
    const diary = new GameObject(839, 578, 'diary', butterflyRoom, 2);
    diary.setOnClick(() => { setDiary("june4") });
}
loadButterflyRoom();

function loadVaultRoom() {
    const twoDancers = new GameObject(619, 99, 'twoDancers', vaultRoom, 2);
    twoDancers.setOnClick(() => { setTextBox("Two dancers.") })
    vault = new GameObject(596, 340, 'vault', vaultRoom, 2);
    vault.setOnClick(() => {
        if (vault.state == "Open") {
            setTextBox("The safe is open.");
        } else {
            setTextBox("A safe. It's locked.");
        }
    })
    const speaker = new GameObject(399, 67, 'speaker', vaultRoom, 2);
    speaker.setOnClick(() => {
        if (currentSong == theSwan) {
            setTextBox("A speaker. \"The Swan\" plays.");
        } else if (currentSong == deux) {
            setTextBox("A speaker. \"Pas de deux\" plays.")
        } // SET ANOTHER SONG TODO MAYBE
    });
    dickinson = new GameObject(681, 475, 'dickinson', vaultRoom, 4);
    dickinson.hide();
    dickinson.setOnClick(() => { currentZoom = "dickinson"; setDiary("dickinson") });
    vaultDiary = new GameObject(747, 574, 'diary', vaultRoom, 2);
    vaultDiary.setOnClick(() => { setDiary("june5") });
    vaultDiary.hide();
    const bottomHighlight = new GameObject(0, 678, 'bottomHighlight', vaultRoom, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(() => { setRoom(butterflyRoom) });
}
loadVaultRoom();

function loadSpaceRoom() {
    finalDoor = new GameObject(657, 327, 'door', spaceRoom, 2);
    finalDoor.setOnClick(() => {
        if (finalDoor.state == "Open") {
            setTextBoxConfirm("Walk through?", () => {
                setRoom(windRoom);
                currentSong.pause();
                wind.play();

            });
        } else {
            setTextBox("A door. It's locked.");
        }
    })

    const paper1 = new GameObject(275, 333, 'paper1', spaceRoom, 2);
    paper1.setOnClick(() => { setPuzzle(1) });
    const paper2 = new GameObject(517, 363, 'paper2', spaceRoom, 2);
    paper2.setOnClick(() => { setPuzzle(2) });
    const paper3 = new GameObject(827, 363, 'paper3', spaceRoom, 2);
    paper3.setOnClick(() => { setPuzzle(3) });
    const paper4 = new GameObject(1046, 333, 'paper4', spaceRoom, 2);
    paper4.setOnClick(() => { setPuzzle(4) });
    orrery = new GameObject(513, 51, 'orrery', spaceRoom, 2);
    orrery.setOnClick(() => { setTextBox("An orrery. There's 4 planets orbiting around a sun.") })

    const bottomHighlight = new GameObject(0, 678, 'bottomHighlight', spaceRoom, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(() => { setRoom(flowerRoom) });
}
loadSpaceRoom();

function loadWindRoom() {

    const walls = new GameObject(0, 0, 'walls', windRoom, 2);
    walls.setOnClick(() => { setTextBox("A white void.") });

    const shredder = new GameObject(679, 486, 'shredder', windRoom, 4);
    shredder.setOnClick(() => {
        if (!inventory.has("letter") || walls.state == "Open") {
            setTextBox("A paper shredder.")
        } else {
            setTextBoxConfirm("Shred the letter?", () => yesYesYes(), () => noNoNo())
        }
    });

    const platform = new GameObject(951, 788, 'platform', windRoom, 3);
    platform.setTranslate("bottomRight");

    const letter = new GameObject(681, 594, 'letter', windRoom, 4);
    letter.setOnClick(() => {
        setTextBoxConfirm("Take the letter?", () => {
            inventoryAdd("letter", () => { setTextBox("The letter.") });
            letter.hide();
        })
    });

    const bottomHighlight = new GameObject(0, 708, 'bottomHighlight', windRoom, 5);
    bottomHighlight.pressed = false;
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(() => {
        if (platform.state == "") {
            platform.setImgState("Back");
            shredder.hide();
            if (!inventory.has("letter")) {
                letter.hide();
            }
            if (!bottomHighlight.pressed) {
                setTextBox("You turn around but the door is gone.");
            }
        } else {
            if (!inventory.has("letter")) {
                letter.show();
            }
            platform.setImgState("");
            shredder.show();
        }
        bottomHighlight.pressed = true;
    });




    function yesYesYes() {
        setTextBoxConfirm("Are you sure?", () => {
            setTextBoxConfirm("Are you certain?", () => {
                setTextBoxConfirm("Do you want to reconsider?", () => { }, () => {
                    setTextBoxConfirm("Is this your final decision?", () => {
                        location.reload(true);
                    })
                })
            })
        })
    };

    function noNoNo() {
        setTextBoxConfirm("You need to shred it.", () => { }, () => {
            setTextBoxConfirm("You have to.", () => { }, () => {
                setTextBoxConfirm("It's no use.", () => { }, () => {
                    setTextBoxConfirm("There's no exit here don't you see that?", () => { }, () => {
                        setTextBoxConfirm("You shouldn't have written it in the first place", () => { }, () => {
                            textChain([
                                () => setTextBox("Alright..."),
                                () => setTextBox("Do you remember what happened after the incident?"),
                                () => setTextBox("You avoided them for the rest of the week."),
                                () => setTextBox("You muted your phone and blocked them."),
                                () => setTextBox("It's been three years."),
                                () => setTextBox("Were you afraid?"),
                                () => setTextBox("Then why did you keep the letter?"),
                                () => setTextBoxConfirm("Do you want to continue?", () => {
                                    walls.setOnClick(() => {
                                        if (platform.state == "Back") {
                                            setTextBox("A white void. It feels a little off.");
                                        } else {
                                            setTextBoxConfirm("Push?", () => {
                                                walls.setImgState("Open");
                                                walls.setOnClick(() => { });
                                                bottomHighlight.hide();
                                                platform.hide();
                                                wind.pause();
                                                bang.play();
                                            });
                                        }
                                    })
                                }, () => {
                                    location.reload(true);
                                })
                            ])
                        })
                    })
                })
            })
        })
    }

    //TODO HAIHAIH IMPORTMANT THIS I RADIO BROADCAST TEST
    // eventBus.addEventListener("radioChange", () => {
    //  if (currentRadioSong=="jfdlksf") {
    //     img.setImgState("fdsjkljfdslkf");
    // });
}

loadWindRoom();

const radioFreq = new Map([
    [theSwan, 655],
    [deux, 878]
]);

function loadRadioSound() {
    theSwan.volume = 0;
    theSwan.play();
    deux.volume = 0;
    deux.play();
    radioStatic.play();
}
function loadRadioZoom() {
    const arm = new GameObject(705, 352, 'arm', radioZoom, 3);
    arm.setPivot(16, 311);
    arm.img.style.pointerEvents = 'none';

    const coil = new GameObject(594, 356, 'coil', radioZoom, 2);
    coil.setOnClick(() => { loadRadioSound(); coil.setOnClick(() => { }) });

    let isMouseDown = false;
    coil.setOnMouseDown(() => {
        isMouseDown = true;
        console.log(isMouseDown);
    })
    document.addEventListener('mouseup', () => {
        isMouseDown = false;
        console.log(isMouseDown);
    })


    coil.setOnMouseMove(() => {
        if (!isMouseDown) return;
        const rect = coil.img.getBoundingClientRect();
        const x = mouseX - rect.left;
        const theta = (x / coil.getWidth() * 50 - 25) * 1.1;
        arm.setRotation(theta);

        const armFreq = x / coil.getWidth() * 400 + 600;
        radioFreq.forEach((freq, song) => {
            let distance = Math.abs(armFreq - freq);
            let volume = Math.exp(-1 * distance * 0.2);
            if (volume < 0.01) {
                volume = 0;
            }
            song.volume = volume;
            if (volume > 0) {
                radioStatic.volume = 1 - volume;
            }
            console.log(radioStatic.volume)
            if (volume > 0.5) {
                currentRadioSong = song;
                const event = new Event("myCustomEvent");
                eventBus.dispatchEvent(new CustomEvent("radioChange"));
            }
        });
    })


}

loadRadioZoom();


function loadA() {
    const amp = new GameObject(545, 467, 'amp', a, 2);
    const radio = new GameObject(536, 551, 'radio', a, 3);
    const starDoor = new GameObject(316, 300, 'starDoor', a, 2);
    eventBus.addEventListener("radioChange", () => {
        if (currentRadioSong == theSwan) {
            starDoor.setOnClick(() => { setTextBox("It's unlocked. Open it?") })
        }
    });
    const door2 = new GameObject(838, 171, 'door2', a, 2);
    door2.setHighlight();
}

function loadB() {
    const door1 = new GameObject(148, 311, 'door1', b, 2);
    door1.setHighlight();
    const door2 = new GameObject(573, 263, 'door2', b, 2);
    door2.setHighlight();
    const door3 = new GameObject(1207, 414, 'door3Highlight', b, 2);
    door3.setInvisibleHighlight();
    const rocks = new GameObject(608, 370, 'rocks', b, 2);
}

function loadC() {
    const door2 = new GameObject(668, 217, 'door2', c, 2);
    door2.setHighlight();
    const heartDoor = new GameObject(893, 224, 'heartDoor', c, 2);
    const door1 = new GameObject(434, 649, 'door1', c, 2);
    const cobweb = new GameObject(583, 137, 'cobweb', c, 2);
}

function loadD() {
    const door1 = new GameObject(848, 142, 'door1', d, 2);
    door1.setHighlight();
    const ladder = new GameObject(588, 590, 'ladder', d, 2);
    const bottomHighlight = new GameObject(0, 678, 'bottomHighlight', d, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick();
}

function loadF() {
    const ladder = new GameObject(963, 528, 'ladder', f, 2);
    const door1 = new GameObject(598, 371, 'door1', f, 2);
    door1.setHighlight();
    const bottomHighlight = new GameObject(0, 678, 'bottomHighlight', f, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick();
}

function loadG() {
    const paper = new GameObject(980, 257, 'paper', g, 2);
    //set highlight later
    const squareDoor = new GameObject(627, 270, 'squareDoor', g, 2);
    const bottomHighlight = new GameObject(0, 678, 'bottomHighlight', g, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick();
}

function loadH() {
    const door1 = new GameObject(831, 269, 'door1', h, 2);
    door1.setHighlight();
    const ladder = new GameObject(379, 363, 'ladder', h, 2);


}

function loadI() {
    const circleDoor = new GameObject(1067, 307, 'circleDoor', i, 2);
    const door1 = new GameObject(391, 357, 'door1', i, 2);
    const hole = new GameObject(733, 359, 'hole', i, 2);
    //set change to ripped

}

function loadJ() {
    const heartDoor = new GameObject(926, 304, 'heartDoor', j, 2);
    const door1 = new GameObject(239, 318, 'door1', j, 2);
    door1.setHighlight();
    const bottomHighlight = new GameObject(0, 678, 'bottomHighlight', j, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick();
}

function loadK() {
    const ladder = new GameObject(196, 555, 'ladder', k, 2);
    const window = new GameObject(530, 282, 'window', k, 2);
    const bottomHighlight = new GameObject(0, 678, 'bottomHighlight', k, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick();
}

function loadLadderRoom() {
    const ladder = new GameObject(771, 678, 'ladder', ladderRoom, 2);
    const bottomHighlight = new GameObject(0, 678, 'bottomHighlight', k, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick();
}