import { GameObject } from './GameObject.js';
import { GameTextBox } from './GameTextBox.js';
import { GameIcon } from './GameIcon.js';

export const width = 1400;
export const height = 788;

const bedroom2 = document.getElementById("bedroom2");
const hallway = document.getElementById("hallway");
const library = document.getElementById("library");
const aquarium = document.getElementById("aquarium");
const beach = document.getElementById("beach");
const hills = document.getElementById("hills");
const stairwell = document.getElementById("stairwell");
const stairwell2 = document.getElementById("stairwell2");
const paintingWall = document.getElementById("paintingWall");
const gardenL = document.getElementById("gardenL");
const gardenR = document.getElementById("gardenR");
const spaceView = document.getElementById("spaceView");
const space = document.getElementById("space");
const finale = document.getElementById("finale");



// TEMPORARY
let currRoom = bedroom2;
setRoom(currRoom);

const world = document.getElementById("world");
world.style.width = width + 'px';
world.style.height = height + 'px';


const zoom = document.getElementById("zoom");
const zoomImg = document.getElementById("zoomImg");
const diaryText = document.getElementById("diaryText");


let keypadEnable = false;

zoom.addEventListener('click', () => {
    if(keypadEnable != true){
        zoom.style.display = 'none';
        diaryText.style.display = 'none';

    }
   
});


let safe = null;
function setZoom(o) {
    if (typeof o == "string") {
        if (textBox.isHidden()) { //maybe change
            zoomImg.src = 'imgs/' + o + "Zoom.png";
            zoomImg.onload = () => {
                zoom.style.display = 'flex';
            };
        }
    } else {
        if (textBox.isHidden()) { //maybe change
            if (o) {
                zoomImg.src = o.imgSrc + "Zoom.png";
            }
            zoomImg.onload = () => {
                zoom.style.display = 'flex';
            };
        }
    }
}

function setText(date){
    
    if(!textBox.isHidden()){
        // zoom.style.display = 'flex';
        return;


    }
    keypadEnable = false;
    keypad.style.display = "none";
    display.style.display = "none";
    zoomImg.src = "imgs/diary.png"
    diaryText.innerHTML = diaryEntry.get(date);
    diaryText.style.display = 'block';
    console.log(diaryEntry.get(date));

}

const diaryEntry = new Map([
    ["july22", ""],
    ["feb16", ""],
    ["april13", ""],
    ["nov12", ""],
    ["june10", ""],
    ["june9", ""],
    ["dec21", '']
]);


diaryEntry.forEach((_, date) => {
    fetch('diaryText/' + date + '.txt')
        .then(response => response.text())
        .then(text => {
            diaryEntry.set(date, text);
        })

});

function setRoom(room) {
    currRoom.style.display = 'none';
    room.style.display = 'block';
    currRoom = room;
}

const textBox = new GameTextBox();



function setTextBox(text) {
    textBox.setText(text);
    return textBox.textPromise;
}

function setTextBoxConfirm(text, yes, no) {
    textBox.setTextConfirm(text, yes, no);
    return textBox.textPromise;
}


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

function pause(){
    document.getElementById("pause").classList.remove("hidden");
}

function unpause(){
    document.getElementById("pause").classList.add("hidden");
}
// unpause();

let mouseX =0;
let mouseY=0;
document.addEventListener('mousemove', (e) => {
     mouseX = e.clientX;
     mouseY = e.clientY;
    if (innerWidth > width) mouseX -= ((innerWidth - width) / 2);
    if (innerHeight > height) mouseY -= ((innerHeight - height) / 2);
    // console.log(mouseX, mouseY);
    
})

const handOpen = new GameObject(700,-600, "hand", bedroom2, 25);
handOpen.hide();

const handClose = new GameObject(700,0, "handClose", bedroom2, 25);
handClose.hide();
let letter = null;
function handMove(){
    const downKF = [
            { top: '-802px' },
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
            { top: '-802px' }
        ];
        const upOpt = {
            duration: 1500,
            easing: 'ease-in-out',
            fill: 'forwards'
        };

        const upAnim = handClose.img.animate(upKF, upOpt);
        upAnim.pause();


        downAnim.onfinish = () => {
            handOpen.hide();
            letter.hide();
            handClose.show();
            upAnim.play();
        };

        upAnim.onfinish = () => {
            handClose.hide();
            unpause();
            setTextBox("The letter! You need to get that back before anybody sees.");
        };

        handOpen.show();
        downAnim.play();
}


// const handClose = new GameObject(200,200, "handClose", bedroom2, 25);


//console.log(bedroom2.id);

let letterTaken = false;
let brushTaken = false;
const code = 1421;
const serenade = ["note2", "note3", "note2", "note4", "note1", "note2", "note1", "note4"];
const bouquet = ["jasmine", "zinnia", "tulip", "clematis", "camellia"];
const allFlowers = ["jasmine", "zinnia", "tulip", "clematis", "lilac", "daisy", "rose", "camellia"];
//1213 4143
const note1 = new Audio('sound/Bflat.mp3');
const note2 = new Audio('sound/C.mp3');
const note3 = new Audio('sound/Dflat.mp3');
const note4 = new Audio('sound/F.mp3');
const ocean = new Audio('sound/ocean.mp3');
const boom = new Audio('sound/boom.mp3');
const unlocked = new Audio('sound/unlock.mp3');
// const ambiance = new Audio('sound/ambiance.mp3');
// ambiance.loop = true;
// ambiance.play();
let notesPlayed = [];
let count = 0;
let safeOpen = false;
let input = "";



function loadHallway(){
    const window = new GameObject(150,10,'window', hallway, 2);
    window.setHighlight();
    window.setOnClick(()=>{
        setRoom(hills);
    });
    const portal = new GameObject(520,480, 'aquariumDoor',hallway, 2);
    portal.setHighlight();
    portal.setOnClick(()=> {
        setRoom(aquarium);
    });
    const hallwayDoor = new GameObject(1193,5, 'hallwayDoor', hallway, 2)
    hallwayDoor.setHighlight();
    hallwayDoor.setOnClick(()=>{
        setRoom(library);
    });

    const bottomHighlight = new GameObject(0,700, 'bottomHighlight', hallway, 2);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(()=>{
        setRoom(bedroom2);
    });

    const poster = new GameObject(700, 110, 'poster', hallway, 2);
    poster.setOnClick(()=>{
        setTextBox("An advertisement for a local aquarium.");
    });


    

}
loadHallway();
function loadHills(){
    const bottomHighlight = new GameObject(0,700, 'bottomHighlight', hills, 2);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(()=>{
        setRoom(hallway);
    });

    const gateL = new GameObject(40, 200, 'gateL', hills, 2);
    gateL.setHighlight();
    gateL.setOnClick(()=>{
        setRoom(gardenL);
    });

    const gateR = new GameObject(1100, 200, 'gateR', hills, 2);
    gateR.setHighlight();
    gateR.setOnClick(()=>{
        setRoom(gardenR);
    });

    const vines = new GameObject(450, 280, 'vines', hills, 2);
    vines.setOnClick(()=>{
        setTextBox("A bunch of strange vines that seem to be concealing something. Almost alien-like.")
    });

    const diary = new GameObject(700, 550, 'letter', hills, 2);
    diary.setOnClick(()=>{
        setText("april13")
    })
    const vase = new GameObject(800, 420, 'vaseBouquet', hills, 2);
    vase.setOnClick(()=>{
        if(flowers < 5 ){
            setTextBox("An empty vase. You believe that a bouquet of about five different flowers would be perfect for them. You need " + (5 - flowers) + " more flowers.");
            return;
        }else{
            let correct = true;

            for(const flower of bouquet){
                if(!inventory.has(flower)){
                    correct = false;
                    break;
                }
            }

            if(!correct && flowers < 5){
                setTextBox("This doesn't seem quite right. You wonder what flowers would suit them best.");
                for(const flower of allFlowers){
                    if(inventory.has(flower)){
                        inventoryRemove(flower);
                    }
                }
                flowers = 0;
            }else{
                correct = true;
                setTextBox("Your bouquet feels complete.");
                vase.setImgState("Full");
                vines.setImgState("Open");
                const key = new GameObject(500, 310, 'key', hills, 3);
                key.setOnClick(()=>{
                    setTextBoxConfirm("Pick up key? Maybe this can unlock that door.", ()=>{
                        inventoryAdd("key");
                        key.remove();
                    });
                })
                for(const flower of allFlowers){
                    if(inventory.has(flower)){
                        inventoryRemove(flower);
                    }
                }
            }
        }
    });

}

loadHills();
let flowers = 0;
function loadGardenL(){
    const jasmines = new GameObject(914, 340, 'jasmines', gardenL, 3);
    jasmines.setOnClick(()=> addFlower("Jasmines are linked to passion, love, purity, and beauty. In many cultures, it also is associated with hidden feelings of affection and mysterious elements.", "jasmine"));

    const roses = new GameObject(945, 80, 'roses', gardenL, 2);
    roses.setOnClick(()=> addFlower("Roses symbolize true love, passion, beauty, and royalty. It is known as the “Queen of the Flowers” with its meaning of divine and deep love. It is a passionate declaration of affection, especially with its rich red color.", "rose"));

    const zinnias = new GameObject(0, 290, 'zinnias', gardenL, 3);
    zinnias.setOnClick(()=> addFlower("Zinnias are usually associated with endurance, remembrance, and lasting affection. These flowers are resilient and continue their bloom despite any harsh conditions. They are known for their extensive seasons as their bloom can last for months.", "zinnia"));

    const tulips = new GameObject(0, 65, 'tulips', gardenL, 2);
    tulips.setOnClick(()=> addFlower("Tulips, specefically those of purple color, represent admiration, respect, and elegance. Purple has always been associated with royalty due to the rarity of its dye. For this reason, they are often used to express adoration.", "tulip"));

    const pathL = new GameObject(1200, 690, 'pathL', gardenL, 2);
    pathL.setHighlight();
    pathL.setOnClick(()=> setRoom(hills));

    
}



function addFlower(description, flowerName){
    if(flowers < 5 && !inventory.has(flowerName)){
        setTextBoxConfirm(description + " Take one?", ()=>{
        inventoryAdd(flowerName, ()=>{setTextBox("A " + flowerName)});
        flowers++;
    })
    }else{
        setTextBox(description);
    }
    
}
loadGardenL();

function loadGardenR(){
    const pathR = new GameObject(0, 690, 'pathR', gardenR, 2);
    pathR.setHighlight();
    pathR.setOnClick(()=> setRoom(hills));

    const lilacs = new GameObject(1064, 120, 'lilacs', gardenR, 3);
    lilacs.setOnClick(()=> addFlower("Lilacs symbolize remembrance, youthful innocence, intense love, and renewal. It is connected with young love and tender beginnings, unbothered by complications.", "lilac"));

    const clematiss = new GameObject(925, 20, 'clematiss', gardenR, 2);
    clematiss.setOnClick(()=> addFlower("Clematis represent ingenuity, wisdom, ambition, and mental beauty. It is a climbing flower and its upward growth communicates the desire of working towards greater success as well as self improvement.", "clematis"));

    const daisies = new GameObject(2, 295, 'daisies', gardenR, 3);
    daisies.setOnClick(()=> addFlower("Daisies symbolize innocence, simpleness, new beginnings and joy. Their appearance is often compared to cheerfulness and optimism.", "daisy"));

    const camellias = new GameObject(0, 30, 'camellias', gardenR, 2);
    camellias.setOnClick(()=> addFlower("Camellias are associated with longing, love, and gentle affection. It’s is expressed with gracefulness and lacks boldness.", "camellia"));
}

loadGardenR();


function loadStairwell(){
    
    
    let unlock = false;
    const bottomHighlight = new GameObject(0, 700, 'bottomHighlight', stairwell, 2);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(()=>{
        setRoom(aquarium);
    });

    const doorsR = new GameObject(940, 10, 'doorsR', stairwell, 3);
    doorsR.setHighlight();
    doorsR.setOnClick(()=>{
        setRoom(paintingWall);
    });

    const doorsL = new GameObject(250, 10, 'doorsL', stairwell,3);
    doorsL.setHighlight();
    doorsL.setOnClick(()=>{
        if(!unlock){
                if(inventory.has("key")){
                    setTextBoxConfirm("Unlock the doors?",()=>{
                    unlock = true;
                    inventoryRemove("key");
                    unlocked.play();
            })
        }else{
            setTextBox("A pair of locked doors. You need to find a key somewhere..")
        }
        }else{
            setRoom(stairwell2);
        }
    });

    const window = new GameObject(550, 250, 'eyeWindow', stairwell, 2);
    window.setOnClick(()=>{setTextBox("You feel very uncomfortable in here.");});

    const fishTubeL = new GameObject(2,117, 'fishTubeL', stairwell, 2);
    fishTubeL.setOnClick(()=>{setTextBox("You look at the fish in attempt to initiate any movement.");});
    const fishTubeR = new GameObject(1230,117, 'fishTubeR', stairwell, 2)
    fishTubeR.setOnClick(()=>{setTextBox("The fish are still and unmoving.");});

    const diary = new GameObject(410, 400, 'letter', stairwell, 3);
    diary.setOnClick(()=>{
        setText("june10");
    });

    const pupil = new GameObject(695,330, 'pupil', stairwell, 4);

}
loadStairwell();

function loadStairwell2(){
    const stairs = new GameObject(80,0,"staircase", stairwell2, 2);
    stairs.setHighlight();
    stairs.setOnClick(()=>{
        setRoom(spaceView);
    });
    const bottomHighlight = new GameObject(0, 700, 'bottomHighlight', stairwell2, 3);

    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(()=>{
        setRoom(stairwell);
    });

   
}
let stars =[];

function loadSpace(){
    function checkTri(){
        if(stars.length >= 3){
        const summerTri = new GameObject(0,100, 'summerTri', space, 4);
        summerTri.setTransparent(0);
        let opacity = 0;

            function fade() {
                opacity += 0.01;

                if (opacity <= 1) {
                    summerTri.setTransparent(opacity);
                    requestAnimationFrame(fade);
                }
                }
                fade();
        setTextBox("You recognize this asterism, the Summer Triangle! You hear a loud thud next to you.")
        summerTri.setOnClick(()=>{
            setTextBox("The Summer Triangle is formed by the stars Vega, Altair, and Deneb. It conveys the story of two lovers who are separated.")
        });
        boom.play();
        loadSpaceView();
    }
    }
    const bottomHighlight = new GameObject(0, 710, 'bottomHighlight', space, 5);

    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(()=>{
        setRoom(spaceView);
    });

    
    
    const deneb = new GameObject(260,335,"deneb", space, 3);
    deneb.setTransparent(0);
    deneb.setOnClick(()=>{
    if(!stars.includes("d")){
        stars.push("d");
        deneb.setTransparent(1);
        checkTri();
    }
        
    })
    const vega = new GameObject(765,127,"vega", space, 3);
    vega.setTransparent(0);
    vega.setOnClick(()=>{
        if(!stars.includes("v")){
        stars.push("v")
        vega.setTransparent(1);
        checkTri();
        }
        

    })
    const altair = new GameObject(950,640,"altair", space, 3);
    altair.setTransparent(0);
    altair.setOnClick(()=>{
        if(!stars.includes("a")){
             stars.push("a");
        altair.setTransparent(1);
        checkTri();
            
        }
       

    })




    // const tri = new GameObject(0,100, "summerTri", space, 1);

    const aquila = new GameObject(950,480,"aquila", space, 2);
    aquila.setLight();
    
    const cygnus = new GameObject(270,215,"cygnus", space, 2);
    cygnus.setLight();

    const lyra = new GameObject(730,140,"lyra", space, 2);
    lyra.setLight();


}
loadSpace();

loadStairwell2();
let debrisClear = false;
function loadSpaceView(){
    const telescope = new GameObject(350, 280, 'telescope', spaceView, 2);
    telescope.setOnClick(()=>{
        setTextBoxConfirm("You look around and admire the stars. It reminds you of a certain time. You can get a closer look with this. Take a peek?", ()=>{
            setRoom(space);
        });
    })

    const diary = new GameObject(700, 600, 'letter', spaceView, 2);
    diary.setOnClick(()=>{
        setText("dec21");
    })

    const bottomHighlight = new GameObject(0, 700, 'bottomHighlight', spaceView, 2);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(()=>{
        setRoom(stairwell2);
    });

    if(stars.length >= 3){
        const debris = new GameObject(600, 480, 'debris', spaceView, 2);
        debris.setOnClick(()=>{
            if(!debrisClear){
                setTextBoxConfirm("Pick up painting? Did it fall from the sky?.. Strange.", ()=>{
                inventoryAdd("painting2", ()=>{
                    setTextBox("A painting that fell from space?")
                })
                debris.setImgState("none");
                debrisClear = true;
            });
            }
            
        })
    }
}
loadSpaceView();
function loadPaintingWall(){
    const bottomHighlight = new GameObject(0, 700, 'bottomHighlight', paintingWall, 2);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(()=>{
        setRoom(stairwell);
    });


    const pedestal = new GameObject(560, 200, 'pedestalGlass', paintingWall, 3);
    pedestal.setOnClick(()=>{
        if(!inventory.has("pearl")){
            setTextBox("A pedestal containing a painting. You need to insert something in order to open it.");

        }else{
            setTextBoxConfirm("A pedestal cointaining a paining. Insert the pearl?", ()=>{
            pedestal.setImgState("None");
            pedestal.setLocation(560, 420);
            inventoryRemove("pearl");
            
        });
    }
});
        

        

    const painting = new GameObject(605, 250, 'painting', paintingWall, 2);
    painting.setOnClick(()=>{
        setTextBoxConfirm("An empty painting. You feel the urge to fill it. Take it?", ()=>{
            inventoryAdd("painting", () => {setTextBox("A painting.")});
            painting.hide();

        });
    });

}

loadPaintingWall();
function loadAquarium(){
    const bottomHighlight = new GameObject(0, 700, 'bottomHighlight', aquarium, 2);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(()=>{
        setRoom(hallway);
    });

    const doorL = new GameObject(300, 150, 'doorL', aquarium, 2);
    doorL.setHighlight();
    doorL.setOnClick(()=>{
        setRoom(beach);
    });

    const doorR = new GameObject(955, 150, 'doorR', aquarium, 2);
    doorR.setHighlight();
    doorR.setOnClick(()=>{
        setRoom(stairwell);
    });

    let getPaint = false;

    const vendingMachine = new GameObject(640, 202, 'vendingMachine', aquarium,2);
    vendingMachine.setOnClick(()=>{
        

        if(inventory.has("money") && !getPaint){
           setTextBoxConfirm("Insert money into the vending machine? Aw man, you didn't plan on using your savings this early.", ()=>{
            vendingMachine.setImgState("Empty");
            inventoryRemove("money");
            inventoryAdd("paint", ()=>{setTextBox("A box of paint. You've been looking for some for a while.")});
            getPaint = true;
        }); 
        }else if(getPaint){
            setTextBox("A vending machine. You remember buying a snack from here the last time you visited the aquarium.");

        }else{
            setTextBox("A vending machine. You remember buying a snack from here the last time you visited the aquarium. There seems to be a box of paint inside? Maybe you can use that for your wall.");

        }
    });
}

loadAquarium();

// const note1 = null; //c
// const note2 = null; //dflat
// const note3 = null; //f
// const note4 = null; //b
// serenade = [note1, note2, note1, note3, note4, note1, note4, note3];


let tides = null;
let clam = null;
let pearl = null;

function loadBeach(){
    const bottomHighlight = new GameObject(0, 700, 'bottomHighlight', beach, 3);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(()=>{
        setRoom(aquarium);
    });

    const shell1 = new GameObject(270,595,'shell1', beach,4);
    shell1.setOnClick(()=>{
        playNote("note1");
        
    });
    const shell2 = new GameObject(490,645,'shell2', beach,4);
    shell2.setOnClick(()=>{
        //note2.play();
        playNote("note2");
    });
    const shell3 = new GameObject(710,545,'shell3', beach,4);
     shell3.setOnClick(()=>{
        //note3.play();
        playNote("note3");
    });
    const shell4 = new GameObject(970,595,'shell4', beach,4);
    shell4.setOnClick(()=>{
        //note4.play();
        playNote("note4");
    });

    pearl = new GameObject(160, 555, 'pearl', beach, 7);
    pearl.hide();
    clam = new GameObject(120, 550, 'clam', beach, 4);
    clam.hide();
    clam.setOnClick(()=>{
            clam.setImgState('OpenWP');
            clam.setLocation(113,500);
            pearl.show();
            pearl.setOnClick(()=>{
                setTextBoxConfirm("A very shiny pearl. Take it?", ()=>{
                        inventoryAdd("pearl", () => {setTextBox("A pearl.")});
                        pearl.hide();

                    });
            });
    
        
        
    });

    const moon = new GameObject(10, 10, 'moon', beach, 2);
    moon.setOnClick(()=>{setTextBox("A full moon. It looks beautiful.")});

    
    
    const diary = new GameObject(1180, 630, 'diary', beach, 4);
    diary.setOnClick(()=>{
        setText("july22");
    });
    
    tides = new GameObject(0,310, 'tides', beach, 3);
    tides.setOnClick(()=>{setTextBox("The ocean. It is vert still and quiet.")});
    // if(shellPuzzle){
    // }

    
}
function playNote(note){
    //note.play();
    // if(count == serenade.length){
    //     return;
    // }
    // if(!shellPuzzle){
    //     return;
    // }
    notesPlayed.push(note);
    count++;

    if(note === "note1"){
        note1.play();

    }else if(note === "note2"){
        note2.play();
    }else if(note === "note3"){
        note3.play();
    }else{
        note4.play();
    }


    if(count == serenade.length){
        const correct = notesPlayed.every((note, i) => note === serenade[i]);
        if(correct){
            //setRoom(aquarium);
            ocean.play();
            tides.setImgState('Back');
            clam.show();
            shellPuzzle = true;
        }else{
            notesPlayed = [];
            count = 0;
            setTextBox("Nothing seemed to happen. Maybe a note was off..");
        }
    }
}
loadBeach();


let finaledoor = false;

let paintings = 0;
function loadLibrary(){
    const door = new GameObject(450,175, 'libraryDoor', library, 2);
    
    const paintingR = new GameObject(910,300, 'paintingR', library, 2);
    const paintingL = new GameObject(360,300, 'paintingL', library,2);

    const diary = new GameObject(320, 600, 'letter', library, 2);
    diary.setOnClick(()=>{
        setText("june10");
    });
    const diary2 = new GameObject(420, 610, 'letter2', library, 2);
    diary2.setOnClick(()=>{
        setText("feb16");
    });
    const diary3 = new GameObject(940, 600, 'letter3', library, 2);
     diary3.setOnClick(()=>{
        setText("nov12");
    });
    paintingR.setOnClick(()=>{
        if(inventory.has("painting")){
            setTextBoxConfirm("Insert the painting?", ()=>{
                paintings++;
                paintingR.setImgState("Full");
                inventoryRemove("painting");
            });
            
        }else{
            setTextBox("A slot that fits a painting.");
        }
    })
    paintingL.setOnClick(()=>{
        if(inventory.has("painting2")){
            setTextBoxConfirm("Insert the painting?", ()=>{
                                paintings++;

                paintingL.setImgState("Full");
                inventoryRemove("painting2");
            });
            
        }else{
            setTextBox("A slot that fits a painting. Maybe its in one of these rooms.");
        }
    })
    door.setOnClick(()=>{
        if(paintings >= 2){
            setTextBoxConfirm("The doors are now unlocked. Enter?", ()=>{
                finaledoor = true;
                setRoom(finale);
            })
        }else{
            setTextBox("The door is locked. It appears that you must do something first.");

        }
    });
    const bottomHighlight = new GameObject(0, 700, 'bottomHighlight', library, 2);
    bottomHighlight.setInvisibleHighlight();
    bottomHighlight.setOnClick(()=>{
        setRoom(hallway);
    });
    
}
loadLibrary();
function loadBedroom(){
    // let paint = false;
    const waves = new GameObject(983, 340, 'waves', bedroom2, 2)
    waves.setOnClick(()=>{
        

        if(inventory.has("paint") && inventory.has("brush") ){
            setTextBoxConfirm("Paint over it?", ()=>{
                inventoryRemove("paint");
                inventoryRemove("brush");
                waves.remove();
            });
        }else{
            setTextBox("A painting you made on the wall a while ago. You need to remove it before you move. Once you get that paint..");

        }
    })
    const bed = new GameObject(963, 452, 'bed', bedroom2, 3);
    bed.setOnClick(() => {
        if (bed.state !== 'SafeOut') {
            setTextBoxConfirm(
                "A messy, yet comforting bed. There seems to be something underneath. Pull it out?",
                () => {
                    bed.setImgState('SafeOut');
                     safe = new GameObject(965, 622, 'safe', bedroom2, 3);
                    safe.hide();

                    // Set up click for safe
                    safe.setOnClick(() => {
                        keypadEnable = true;
                        keypad.style.display = "block";
                        display.style.display = "block";
                        setZoom(safe); // show safe in zoom
                    });

                    // Now show the safe in the room visually
                    safe.show();
                }
            );
        } else {
            setTextBox("A messy, yet comforting bed.");
        }
    });
        

    

    const door2 = new GameObject(200, 220, 'door2', bedroom2, 2);
    door2.setOnClick(() => {
        if (!letterTaken) {
            setTextBox("A door. You still need to get something before you leave.");
            return;
        }

        setTextBoxConfirm(
            "You feel something drawing you towards the door. Do you want to leave?",
            () => setRoom(hallway)
        );
    });
    // door2.setOnClick(() => (setTextBox("A door. You still need to get something before you leave.")))

    keys.addEventListener('click', (e) => {
        if(!keypadEnable)return;
        if(e.target.tagName != "BUTTON") return;

        const val = e.target.textContent;
        if(val == "EXIT"){
            keypadEnable = false;
            zoom.style.display = 'none';
            keypad.style.display = 'none';
        }else if(val == "X"){
            input = input.slice(0, -1);
        }else if(val== "✓"){
            if(code == input){
                keypadEnable = false;
                safeOpen = true;
                zoom.style.display = 'none';
                keypad.style.display = 'none';
                safe.setImgState('Open');
                 letter = new GameObject(820, 670, 'letter', bedroom2, 3);
                const money = new GameObject(800, 650, 'money', bedroom2, 4);

                money.setOnClick(() => {
                    setTextBoxConfirm("A stash of your savings. Take some money?", ()=>{
                        inventoryAdd("money", () => {setTextBox("Some of your money.")});
                        money.hide();

                    });
                });

                letter.setOnClick(()=>{
                    // letter.hide();
                    pause();
                    letterTaken = true;
                    handMove();
                    
                });
                //change safe state
            }else{
                input = "";
            }
        }else if(input.length < 4){
            input += val;
        }
        display.textContent = input.padEnd(4, "-");
    })






    const drawerL = new GameObject(640,488, 'drawerLeft', bedroom2, 3);
    drawerL.setOnClick(() => {
        if(!brushTaken){
            setTextBoxConfirm("There is a set of your art supplies. You still need to get more paint. Take a paintbrush?", ()=>{
                brushTaken = true;
                inventoryAdd("brush", () => {setTextBox("A paintbrush.")});
            });

        }else{
            setTextBox("A drawer filled with some of your art supplies");
        }

    })

    const drawerR = new GameObject(790,488,'drawerRight', bedroom2, 3);
    drawerR.setOnClick(()=> (setTextBox("An empty drawer. One less thing to worry about.")));


        

    const easel2 = new GameObject(430, 350, 'easel2', bedroom2, 2);
    easel2.setOnClick(() => (setTextBox("An empty canvas. Nothing seems to come to mind when doing art these days.")))

    const shelf2 = new GameObject(550, 250, 'shelf2', bedroom2, 2);
    shelf2.setOnClick(() => (setTextBox("A shelf with a few books. There is a vase with a withered flower.")))

    const photo2 = new GameObject(1080, 230, 'photos2', bedroom2, 2);
    photo2.setOnClick(() => (setTextBox("An old photo with one of your close companions. You miss those times.")))

    const boxes = new GameObject(120, 600, 'boxes', bedroom2, 2);
    boxes.setOnClick(() => (setTextBox("A few moving boxes that you still need to pack. This is the last room that you need to clear.")))

    const clock = new GameObject(450, 200, 'clock', bedroom2, 2);
    clock.setOnClick(()=>(setTextBox("A clock that reads 14:21 p.m. You check your phone and it is currently 7:00 a.m. Your clock has been stuck like this for a while.")))

    const postIts = new GameObject(860, 320, 'postIts', bedroom2, 2);
    postIts.setOnClick(() => {
        keypad.style.display = "none";
        display.style.display = "none";
        setZoom(postIts);

    })

    const poster = new GameObject(1120, 210, 'poster', bedroom2, 2)
    poster.setOnClick(() => (setTextBox("A poster from one of your favorite movies.")))

    const desk = new GameObject(580, 465, 'desk', bedroom2, 2);
    desk.setOnClick(() => (setTextBox("A desk.")))

}

loadBedroom();


function loadFinale(){
    // const letter = new GameObject(0,0, 'letter', finale, 5);
    
    const envelope = new GameObject(0,0, 'envelope', finale, 4);
    if(finaledoor){
        setTextBox("You sigh in relief, there it is. But something feels off. You decide to open the envelope.");

    }

    envelope.setOnClick(()=>{

        pause();
        envelope.setImgState("Back");
        const envelopeF = new GameObject(0,0, 'envelopeFront', finale, 6);
        letterMove();
    });

    function letterMove(){
        const letter = new GameObject(0,200, 'letter', finale, 5);

        const upKF = [
            { top: '600' },
            { top: '0' }
        ];
        const upOpt = {
            duration: 1500,
            easing: 'ease-in-out',
            fill: 'forwards'
        };

        const upAnim = letter.img.animate(upKF, upOpt);
        upAnim.pause();

        upAnim.onfinish = () => {
            unpause();
            letter.setImgState("Open");
            setTextBox("Your eyes gaze across the first few words and you realize something. This letter is addressed to you.")
                            const fadeIn = new GameObject(0, 0, "fade", finale, 30);
                            fadeIn.setTransparent(0);

           let opacity = 0;

            function fade() {
                opacity += 0.003;

                if (opacity <= 1) {
                    fadeIn.setTransparent(opacity);
                    requestAnimationFrame(fade);
                }
                }

                fade();

                    };

                
                    upAnim.play();
                }
}
loadFinale();