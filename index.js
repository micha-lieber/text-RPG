var readlineSync = require("readline-sync");
/////// Variables for the Game

/**Default attacks*/
const attacksArr = [
  { name: "Ohrfeige", damage: 10 },
  { name: "Faustschlag", damage: 20 },
  { name: "Tritt gegen das Knie", damage: 30 },
];

/**Character class for main hero */
class Character {
  // this is the class constructor for character creation
  constructor(fighterName) {
    this.name = fighterName;
    this.life = 100;
    this.inventory = [
      { name: "zettel", content: "eine liederlich geschriebene Adresse" },
      { name: "Gold", content: 0 },
    ];
    this.attacks = attacksArr;
  }
  printCertificate() {
    let certificate = `You are ${this.name} won the competition and deserve to receive this certificate
                           
    
    `;
    return certificate;
  }
  printInventory() {
    return `You have \n ${this.inventory[0].content} pcs ${this.inventory[0].name}\n ${this.inventory[2].content} pcs ${this.inventory[2].name}`;
  }
  incrementInventory(name, num) {
    this.inventory.forEach((obj) => {
      if (obj.name == name) {
        obj.content += num;
      }
    });
  }
  decrementInventory(name, num) {
    this.inventory.forEach((obj) => {
      if (obj.name == name) {
        obj.content -= num;
      }
    });
  }
}

/**Default character */
const char = new Character("test");

/**enemy number one*/

const enemyOne = {
  name: "Napoleon Dynamite",
  life: 100,
  attacks: attacksArr,
};

/** BOSS enemy */
const boss = {
  name: "Chaooos",
  life: 999,
  attacks: [
    { name: "Du stolperst über einen Stapel Bücher!", damage: 20 },
    {
      name: "Deine Füße verheddern sich in einem herumliegenden Pullover!",
      damage: 20,
    },
    {
      name: "Du schlitterst über deine nassen Badfließen. Wasserschaden!",
      damage: 20,
    },
    {
      name: "Du hälst dich an einem Regal fest und ringst nach Atem. Es löst sich von der Wand und der Inhalt begräbt dich unter sich.",
      damage: 20,
    },
  ],
};

/////////// Functions for the game

/**  Function that enables user to put in their own charactername.*/
function characterCreation() {
  console.clear();
  let fighterName = readlineSync.question(`  Wie heißt du?    `);
  char.name = fighterName;
}

/**  Funktion soll die einzelnen Situationen aufrufen --> ALI*/
function situation() {
  // fight(); // bei Kampf
  // random(); // zufällige Begegnung
}

/** restarts the game after gameOver */
function reboot() {
  let reboot = readlineSync.question(
    `--------------\n Spiel erneut starten? (y = ja, n = nein)------------------\n`
  );
  if (reboot == "y") {
    console.clear();
    startGame();
  } else {
    console.clear();
    console.log("Tschüssikowski!");
  }
}

/** starts Battle with non-Boss enemy*/
function fight(enemy) {
  while (enemy.life > 0 && char.life > 0) {
    // player attack
    let answer = readlineSync.question(
      `Was willst du tun? (0 = Ohrfeige, 1 = Faustschlag, 2 = Tritt gegen das Knie, 3 = warten)\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n`
    );

    if (answer < 3) {
      console.log(
        `Du greifst ${enemy.name} mit ${char.attacks[answer].name} an und verursachst ${char.attacks[answer].damage} Schaden.\n`
      );
      enemy.life -= char.attacks[answer].damage;

      // enemy dead
      if (enemy.life < 1) {
        console.log(
          `\n${enemy.name} geht zu Boden. Adrenalin rauscht durch deinen Körper. Es ist vorbei. Du hast gewonnen!\n`
        );
        loot();
        break;
        // hier kommt RETURN TRUE
      }
    } else if (answer >= 3) {
      console.log(
        "Du tust nichts. 'Halte die andere Wange hin', haben sie gesagt.\n"
      );
    } else {
      console.log(`Glückwunsch, du hast das Spiel zerstört!`);
    }
    // enemy attack
    let enemyAttack = Math.floor(Math.random() * enemy.attacks.length);

    console.log(
      `---------${enemy.name} greift dich mit ${enemy.attacks[enemyAttack].name} an und verursacht ${enemy.attacks[enemyAttack].damage} Schaden\n`
    );

    char.life -= enemy.attacks[enemyAttack].damage;

    // player dead

    if (char.life < 1) {
      console.clear();
      console.log(
        `Du spürst wie dein Körper auf den harten Boden der Realität aufschlägt. Du schließt deine Augen. Erstmal 'ne Pause. GameOver.`
      );
      reboot();
      break;
      //// MUSS HIER NOCH RETURN FALSE?
    }

    fight_status(enemy);
    readlineSync.question(`Taste drücken um fortzufahren`);
    console.clear();
  }
}

/** starts Battle with BOSS enemy */
function fightBoss(boss) {
  /** Playerattacks in bossfight */
  char.attacks = [
    {
      name: "Du holst dir eine große Mülltüte und stopfst alles was du findest hinein.",
      damage: 100,
    },
    {
      name: "Deine Freund*innen und Nachbar*innen kommen dir zu Hilfe und schrubben was das Zeug hält.",
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
      name: `Du gehst wieder in die Kneipe und bestellst Vodka. Eine Flasche. Game Over.`,
      damage: 0,
    },
  ];

  while (boss.life > 0 && char.life > 0) {
    // player attack
    let answer = Number(
      readlineSync.question(
        `Was willst du tun? (0 = Aufräumen 1 = Um Hilfe rufen, 2 = Alles rauswerfen, 3 = Beten , 4 = Gehen)\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n`
      )
    );

    if (answer < char.attacks.length - 2) {
      console.log(
        `\n${char.attacks[answer].name} - ${char.attacks[answer].damage} Schaden.\n`
      );
      boss.life -= char.attacks[answer].damage;

      // BOSS enemy dead
      if (boss.life < 1) {
        console.log(
          `\n${boss.name} ist besiegt. Du fühlst dich ausgezehrt von dem langen Kampf. Die Mittagssonne scheint durch deine geputzten Fenster herein und die in der Luft tanzenden Staubflocken malen Schattenspiele an die Wände. Es ist vorbei. Du hast gewonnen! Zufrieden sinkst du in dein Bett und schließt die Augen.\n`
        );
        reboot();
        break;
        // RETURN TRUE UM WEITERZUMACHEN?
      }
    } else if (answer == 3) {
      console.log(`\n${char.attacks[answer].name}\n`);
    } else if (answer == 4) {
      console.clear();
      console.log(`\n${char.attacks[answer].name}\n`);
      reboot();
      break;
    } else {
      console.log(
        `\n Du tust nichts. Es ist sinnlos. Du patschst durch das Wasser auf deinem Küchenboden, machst dir ein Müsli und legst dich zu den Chips von gestern Abend ins Bett.`
      );
      reboot();
      break;
    }
    // BOSS enemy attack

    let x = Math.floor(Math.random() * boss.attacks.length);

    console.log(
      `---------${boss.attacks[x].name} - ${boss.attacks[x].damage} Schaden\n`
    );

    char.life -= boss.attacks[x].damage;

    // player dead

    if (test.life < 1) {
      console.clear();
      console.log(
        `Du versinkst im Chaos. Es verschlingt dich und deine nächsten Wochen, während du versuchst dich zu sortieren. Game Over`
      );
      reboot(enemy, test);
      break;
    }

    fight_status(enemy);
  }
}
/** shows life of the contestants in each round */
function fight_status(enemy) {
  console.log(
    `                 Your life: ${char.life} ------- Enemy life: ${enemy.life}\n`
  );
}

/** gibt die Belohnung nach dem Kampf aus */
function loot() {
  let belohnungsPacket = [2, 4, 8, 10];
  let stufe = Math.floor(Math.random() * 3);
  let bonus = belohnungsPacket[stufe];
  char.inventory.forEach((obj) => {
    if (obj.name == "Gold") {
      return (obj.amount += bonus);
    } else {
      return obj;
    }
  });
  return `Du hast ${bonus} Goldstücke gefunden!`;
}

/** Random encounter between scenes */
function random() {
  let randomize = Math.floor(Math.random() * 100);
  if (randomize <= 25) {
    char.life -= 3;
    return `Jemand wirft einen Blumentopf nach dir. Du verlierst 
    3 Lebenspunkte`;
  } else {
    return ``;
  }
}

// startet das Spiel
// function startGame(){
// char.life = 100
// enemyOne.life = 100
// boss.life = 999

//     characterCreation(); // creates custom named character
//     situation() // ruft Startsetting auf
// }
