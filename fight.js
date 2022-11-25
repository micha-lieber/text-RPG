var readlineSync = require("readline-sync");
console.clear();
// class Character {
//   constructor(name, life, inventory) {
//     this.name = name;
//     this.life = life;
//     this.inventory = inventory;
//   }
// }

// /** Testchar */
// const test = new Character("test", 100, [{ name: "Messer", damage: 30 }]);
// const attacksArr = [
//   { name: "Ohrfeige", damage: 10 },
//   { name: "Faustschlag", damage: 20 },
//   { name: "Tritt gegen das Knie", damage: 30 },
// ];

// /** Testperson */
// const person = {
//   name: "Donnie Darko",
//   life: 100,
//   attacks: attacksArr,
// };

/** boss */
// const disaster = {
//   name: "Chaooos",
//   life: 999,
//   attacks: [
//     { name: "Du stolperst über einen Stapel Bücher!", damage: 20 },
//     {
//       name: "Deine Füße verheddern sich in einem herumliegenden Pullover!",
//       damage: 20,
//     },
//     {
//       name: "Du schlitterst über deine nassen Badfließen. Wasserschaden!",
//       damage: 20,
//     },
//     {
//       name: "Du hälst dich an einem Regal fest und ringst nach Atem. Es löst sich von der Wand und der Inhalt begräbt dich unter sich.",
//       damage: 20,
//     },
//   ],
// };

/** function for bossfight */
function fight_desaster(enemy) {
  /** Playerattacks in bossfight */
  test.attacks = [
    {
      name: "Du holst dir eine große Mülltüte und stopfst alles was du findest hinein.",
      damage: 1000,
    },
    {
      name: "Deine Freund*innen und Nachbar*innen kommen dir zu Hilfe und putzen was das Zeug hält.",
      damage: 100,
    },
    {
      name: "Du wirfst alles was dir im Weg liegt aus dem Fenster. Nasse Klamotten, fauliges Obst, ungelesene Zeitungen, egal.",
      damage: 50,
    },
    {
      name: "Du sinkst verzweifelt auf die Knie und hoffst, dass dir jemand zu Hilfe kommt. Nichts passiert. Surprise.",
      damage: 0,
    },
    {
      name: `Du gehst wieder in die Kneipe und bestellst einen Vodka. Game Over.`,
      damage: 0,
    },
  ];

  while (enemy.life > 0 && test.life > 0) {
    // enemy attack

    let x = Math.floor(Math.random() * disaster.attacks.length);

    console.log(
      `---------${enemy.attacks[x].name} - ${enemy.attacks[x].damage} Schaden\n`
    );

    test.life -= enemy.attacks[x].damage;

    // player dead

    if (test.life < 1) {
      console.clear();
      console.log(
        `Du versinkst im Chaos. Es verschlingt dich und deine nächsten Wochen, während du versuchst dich zu sortieren. Game Over`
      );
      reboot(enemy, test);
      break;
    }

    // player attack
    let answer = Number(
      readlineSync.question(
        `Was willst du tun? (0 = Aufräumen 1 = Um Hilfe rufen, 2 = Alles rauswerfen, 3 = Beten , 4 = Gehen)\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n`
      )
    );

    if (answer < test.attacks.length - 2) {
      console.log(
        `\n${test.attacks[answer].name} - ${test.attacks[answer].damage} Schaden.\n`
      );
      enemy.life -= test.attacks[answer].damage;

      // enemy dead
    } else if (answer == 3) {
      console.log(`\n${test.attacks[answer].name}\n`);
    } else if (answer == 4) {
      console.clear();
      console.log(`\n${test.attacks[answer].name}\n`);
      reboot(enemy, test);
      break;
    } else {
      console.log(
        `\n Du tust nichts. Es ist sinnlos. Du patschst durch das Wasser auf deinem Küchenboden, machst dir ein Müsli und legst dich zu den Chips von gestern Abend ins Bett.`
      );
      reboot(enemy, test);
      break;
    }
    if (enemy.life < 1) {
      console.log(
        `\n${enemy.name} ist besiegt. Du fühlst dich ausgezehrt von dem langen Kampf. Die Mittagssonne scheint durch deine geputzten Fenster herein und die in der Luft tanzenden Staubflocken malen Schattenspiele an die Wände. Es ist vorbei. Du hast gewonnen! Zufrieden sinkst du in dein Bett und schließt die Augen.\n`
      );
      // loot();
      reboot(enemy, test);
      break;
    }
    fight_status(enemy);
  }
}

/** shows life of the contestants in each round */
function fight_status(enemy) {
  console.log(
    `                 Your life: ${test.life} ------- Enemy life: ${enemy.life}\n`
  );
}
/** restarts the game after gameOver */
function reboot(enemy, test) {
  let reboot = readlineSync.question(
    `--------------\n Spiel erneut starten? (y = ja, n = nein)------------------\n`
  );
  if (reboot == "y") {
    enemy.life = 100;
    test.life = 100;
    console.clear();
    // fight_desaster(enemy);
    fight(enemy);
  } else {
    console.clear();
    console.log("Tschüssikowski!");
  }
}

/** This function starts the battle sequence.*/
function fight(enemy) {
  while (enemy.life > 0 && test.life > 0) {
    // player attack

    let answer = Number(
      readlineSync.question(
        `Was willst du tun? (0 = Ohrfeige, 1 = Faustschlag, 2 = Tritt gegen das Knie, 3 = warten)\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n`
      )
    );

    if (answer < 3) {
      console.log(
        `Du greifst ${enemy.name} mit ${attacksArr[answer].name} an und verursachst ${attacksArr[answer].damage} Schaden.\n`
      );
      enemy.life -= attacksArr[answer].damage;

      // enemy dead
      if (enemy.life < 1) {
        console.log(
          `\n${enemy.name} geht zu Boden. Adrenalin rauscht durch deinen Körper. Es ist vorbei. Du hast gewonnen!\n`
        );
        // loot();
        break;
      }
    } else if (answer >= 3) {
      console.log(
        "Du tust nichts. 'Halte die andere Wange hin', haben sie gesagt.\n"
      );
    } else {
      console.log(`Glückwunsch, du hast das Spiel zerstört!`);
    }
    // enemy attack
    let x = Math.floor(Math.random() * attacksArr.length);

    console.log(
      `---------${enemy.name} greift dich mit ${enemy.attacks[x].name} an und verursacht ${enemy.attacks[x].damage} Schaden\n`
    );

    test.life -= enemy.attacks[x].damage;

    // player dead

    if (test.life < 1) {
      console.clear();
      console.log(
        `Du spürst wie dein Körper auf dem harten Boden der Realität aufschlägt. Du schließt deine Augen. Erstmal 'ne Pause. GameOver.`
      );
      reboot(enemy, test);
      break;
    }

    fight_status(enemy);
    readlineSync.question(`Taste drücken um fortzufahren`);
    console.clear();
  }
}

fight(person);
// fight_desaster(disaster);
