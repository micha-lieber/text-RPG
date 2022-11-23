// situations = [{text: "Beschreibung", option1, option2, option3, option4}] --> ALI

//z.B: situations = [{text: "You're sitting in a Tavern. While it is ornately detailed and decorated, it is very cozzy.
// You see Deez, Lord Farquaad, Maddam Grabbahan and Your Liege.
// You see a Table, three chairs, and an Apple", "option1", option2, option3, option4}]

/* // const ETI = {
//     name: "eti",
//     life: 100,
//     inventory: [{name: "messer", content:20}, {name:"zettel", content: "eine liederlich geschriebene Adresse"},{name:'Gold',content:21}]
    
// } */

// Character --> class Character (mit chName, life, inventory ) und characterCreation function

class Character {
  constructor(fighterName) {
    this.name = fighterName;
    this.life = 100;
    this.inventory = [
      { name: "messer", content: 20 },
      { name: "zettel", content: "eine liederlich geschriebene Adresse" },
      { name: "Gold", content: 21 },
    ];
  }
  printCertificate() {
    return `You are ${this.name} won the competition and deserve to receive this certificate`;
  }
  printInventory() {
    `You have \n ${this.inventory[0].content} pcs ${this.inventory[0].name}\n ${this.inventory[2].content} pcs ${this.inventory[2].name}`;
  }
  addRemoveInventory(num) {
    return `${this.inventory[0].content + num}`;
  }
}
const char = new Character("test");
function characterCreation(fighterName) {
  // Nutzer*in soll Namen und Alter von charakter eingeben können
  //  let fighterName = prompt("Wie heißt du?")
  char.name = fighterName;
}
characterCreation("Batmann");

/* Funktion soll die einzelnen Situationen aufrufen --> ALI*/
function situation() {
  fight(); // bei Kampf
  random(); // zufällige Begegnung
  inventory(); // wenn "inventar" eingegeben wird
}

// soll aufgerufen werden wenn ein Kampf startet --> MICHA
// braucht parameter Gegner
function fight() {}

// soll das inventar anzeigen, wenn sie aufgerufen wird. --> ETI
function inventory() {}

// Zufallsbegegnung, kann zu zufäliger Begegnung mit einem charakter führen --> ETI
function random() {}

function loot() {} // soll die Belohnung nach einem Kampf zurückgeben --> MICHA

// startet das Spiel
// function startGame(){

//     function characterCreation()
//     function situation() // ruft Startsetting auf
// }
