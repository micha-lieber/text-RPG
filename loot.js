class Character {
  constructor(name, life, inventory) {
    this.name = name;
    this.life = life;
    this.inventory = inventory;
  }
}

const test = new Character("test", 100, [{ name: "Messer", damage: 30 }]);

console.log(test);

function loot() {
  let belohnungsPacket = [5, 7, 15, 20];
  let stufe = Math.floor(Math.random() * 3);
  let bonus = belohnungsPacket[stufe];
  test.inventory.forEach((obj) => {
    if (obj.name == "Gold") {
      return (obj.amount += bonus);
    } else {
      // test.inventory.push({ name: "Gold", amount: bonus });
      return obj;
    }
  });
  return `Herzlichen glückwunsch du hast ${bonus} Gold stücke als Belohnung bekommen`;
}
console.log(loot());

console.log(test);
