import { GameObject } from './GameObject.js';
import { GameTextBox } from './GameTextBox.js';
import { GameIcon } from './GameIcon.js';

export const width = 1400;
export const height = 788;


const bedroom = document.getElementById("bedroom");
const flowerRoom = document.getElementById("flowerRoom");
const escalatorRoom = document.getElementById("escalatorRoom");
const bentHallway = document.getElementById("bentHallway");
const mallRoom = document.getElementById("mallRoom");
const museumRoom = document.getElementById("museumRoom");
const swanRoom = document.getElementById("swanRoom");
const gatchaRoom = document.getElementById("gatchaRoom");

let currRoom = bedroom;
setRoom(currRoom);
const world = document.getElementById("world");
world.style.width = width + 'px';
world.style.height = height + 'px';

const freeze = document.getElementById("freeze");


const zoom = document.getElementById("zoom");
const zoomImg = document.getElementById("zoomImg");
const diaryText = document.getElementById("diaryText");
zoom.addEventListener('click', () => zoom.style.display = 'none');



function setZoom(o) {
    diaryText.style.display = 'none';
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
        diaryText.style.display = 'block';
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
    ["mar15Continued", ""]
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
let currentSong = null;

function setSong(song) {
    if (song) {
        currentSong.pause();
    }
    currentSong = song;
    currentSong.play();
    currentSong.loop = true;
}


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

let boxCase = null;
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
                    setTextBoxConfirm('Take out the CD and play "Pas de deux - Tchaikovsky"?', () => {
                        setSong(deux);
                        inventoryRemove("deuxCD");
                    })
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
                    inventoryAdd("pen", () => { textBox("A pen.") });
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

    const flowerFrame = new GameObject(1109, 260, 'flowerFrame', flowerRoom, 2);
    flowerFrame.setOnClick(() => {
        if (inventory.has("keychain")) {
            setTextBoxConfirm("Place the lilac keychain on the frame?", () => {
                flowerFrame.setImgState("Keychain");
                inventoryRemove("keychain");
                //OPEN SOMETHING TODO
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
    swanCDStand.hide();
    swanCDStand.setOnClick(() => {
        setTextBoxConfirm('A CD. It\'s titled "The Swan (Carnaval of the Animals) - Best of Saint-Saëns".', () => {
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
    const deuxCD = new GameObject(694, 470, 'deuxCD', swanRoom, 4);
    deuxCD.hide();
    deuxCD.setOnClick(() => {
        textChain([
            () => setTextBoxConfirm('A CD titled "Pas de deux - Tchaikovsky". Take it?',
                () => {
                    inventoryAdd("deuxCD", () => { setTextBox('A CD titled "Pas de deux - Tchaikovsky"') });
                    deuxCD.hide();
                }),
            () => setTextBoxConfirm("A piece of paper fell out of the CD case. Read it?", () => { setDiary("feb15"); diary2.show(); })
        ])
    }
    );

    const box = new GameObject(728, 508, 'box', swanRoom, 3);
    box.setTranslate("bottomRight");
    box.setOnClick(() => {
        if (box.state != "Opened") {
            setTextBoxConfirm("Open the box?",
                () => {
                    box.setImgState("Opened");
                    deuxCD.show();
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

function loadGatchaRoom() {
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
            setTextBox("Where the capsules come out.");//TODO i dont like this
        }
    })

    const gatcha = new GameObject(675, 450, 'gatcha', gatchaRoom, 3);
    gatcha.setOnClick(() => {
        if (inventory.has("coin")) {
            setTextBoxConfirm("Insert the quarter into the coin slot?", () => {
                gatchaOut.setImgState("Ball");
                inventoryRemove("coin");
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