var readlineSync = require("readline-sync");

class Character {
  constructor(name, life, inventory) {
    this.name = name;
    this.life = life;
    this.inventory = inventory;
  }
}

const test = new Character("test", 100, [{ name: "Messer", damage: 30 }]);
const attacksArr = [
  { name: "Ohrfeige", damage: 10 },
  { name: "Faustschlag", damage: 20 },
  { name: "Tritt gegen dein Knie", damage: 30 },
];

const person = {
  name: "Donnie Darko",
  life: 100,
  attacks: attacksArr,
};
// ReferenceError: require is not defined in ES module scope, you can use import instead
// This file is being treated as an ES module because it has a '.js' file extension and '/home/user/Desktop/WebDev/Extra/games/text-RPG/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
function fight(enemy) {
  //   while (enemy.life > 0 && char.life > 0) {
  let x = Math.floor(Math.random() * attacksArr.length);
  console.log(
    `${enemy.name} greift dich mit ${enemy.attacks[x].name} an und verursacht ${enemy.attacks[x].damage} Schaden\n`
  );
  test.life -= enemy.attacks[x].damage;

  let answer = Number(
    readlineSync.question(`Was willst du tun?(0 = "attack", 1 = "wait")`)
  );
  if (answer === 0) {
    console.log(`Du schlägst ${enemy.name}`);
  } else if (answer === 1) {
    console.log("wait");
  }
  //   }
}

fight(person);
