var readlineSync = require("readline-sync");
var figlet = require("figlet");
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
  // printCertificate() {
  //   return figlet.text(
  //     `  Hay  ${this.name} \n   Du hast \n gewonnen`,
  //     {
  //       font: "Ghost",
  //       horizontalLayout: "default",
  //       verticalLayout: "default",
  //       width: 150,
  //       whitespaceBreak: true,
  //     },
  //     function (err, data) {
  //       console.log(data);
  //     }
  //   );
  // }
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

Character.prototype.printCertificate = function () {
  // prototype of Character class
  return `
  \n    ::::::::::::::::::::::::::::::::::::::::::::::::\n    ::::::::::::::::::::::::::::::::::::::::::::::::\n    :::::::::::      Glückwunsch! Du     :::::::::::\n    :::::::::::: hast dieses Abenteuer :::::::::::::\n    :::::::::::::::  ~~~~~ von ~~~  ::::::::::::::::\n    :::::::::::::::::   DRUNK GUY  :::::::::::::::::\n    ::::::::::::::::::     BOB    ::::::::::::::::::\n    ::::::::::::::::::  erledigt! ::::::::::::::::::\n    ::::::::::::::::::::::::::::::::::::::::::::::::\n    ::::::::::::::::::::::::::::::::::::::::::::::::`;
};

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
  life: 200,
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
  // random(); // zufällige Begegnung
}

/** restarts the game after gameOver */
function reboot() {
  let reboot = readlineSync.question(
    `--------------\n Spiel erneut starten? (y = ja, n = nein)------------------\n`
  );
  if (reboot == "y") {
    console.clear();
    reset();
    startGame();
  } else {
    console.clear();
    console.log("Tschüssikowski!");
  }
}
/**function resets life and inventory to start fresh */
function reset() {
  char.inventory = [
    { name: "zettel", content: "eine liederlich geschriebene Adresse" },
    { name: "Gold", content: 0 },
  ];
  enemyOne.life = 100;
  char.life = 100;
  boss.life = 999;
}

/** starts Battle with non-Boss enemy*/
function fight(enemy) {
  while (enemy.life > 0 && char.life > 0) {
    // player attack
    let answer = readlineSync.question(
      `Was willst du tun? (1 = Ohrfeige, 2 = Faustschlag, 3 = Tritt gegen das Knie, 4 = warten)\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n`
    );

    if (!answer) {
      console.log(
        `Du hebst eine Hand mit Handfläche zu deinem Gegner um zu signalisieren, dass du eine Pause brauchst. Zu deiner Überraschung lässt ${enemy.name} von dir ab. Dann passiert es. Du lehnst dich vor und übergibst dich ausgiebig auf dem Bürgersteig.`
      );
    } else if (answer - 1 < 3) {
      console.log(
        `Du greifst ${enemy.name} mit ${
          char.attacks[answer - 1].name
        } an und verursachst ${char.attacks[answer - 1].damage} Schaden.\n`
      );
      enemy.life -= char.attacks[answer - 1].damage;

      // enemy dead
      if (enemy.life < 1) {
        console.clear();
        console.log(
          `\n${enemy.name} geht zu Boden. Adrenalin rauscht durch deinen Körper. Es ist vorbei. Du hast gewonnen!\n`
        );
        loot();
        return true;
      }
    } else if (answer - 1 >= 3) {
      console.log(
        "Du tust nichts. 'Halte die andere Wange hin', haben sie gesagt.\n"
      );
    } else {
      console.log(
        `Du hebst eine Hand mit Handfläche zu deinem Gegner um zu signalisieren, dass du eine Pause brauchst. Zu deiner Überraschung lässt ${enemy.name} von dir ab. Dann passiert es. Du lehnst dich vor und übergibst dich ausgiebig auf dem Bürgersteig.`
      );
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

      return false;
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
        `Was willst du tun? (1 = Aufräumen 2 = Um Hilfe rufen, 3 = Alles rauswerfen, 4 = Beten , 5 = Gehen)\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n`
      )
    );

    if (!answer) {
      console.log(
        "Du versuchst die Wände hochzuklettern und deine Wohnung buchstäblich auf den Kopf zu stellen. Denn an der Decke siehst du kein Chaos. Du musst feststellen, dass deine Füße und Hände nicht an der Wand kleben und schlägst steinhart auf deinem Fußboden auf."
      );
    } else if (answer < char.attacks.length - 1) {
      console.log(
        `\n${char.attacks[answer - 1].name} - ${
          char.attacks[answer - 1].damage
        } Schaden.\n`
      );
      boss.life -= char.attacks[answer - 1].damage;

      // BOSS enemy dead
      if (boss.life < 1) {
        console.log(`\n${boss.name} ist besiegt.\n`);
        return true;
      }
    } else if (answer - 1 === 3) {
      console.log(`\n${char.attacks[answer - 1].name}\n`);
    } else if (answer - 1 === 4) {
      console.clear();
      console.log(`\n${char.attacks[answer - 1].name}\n`);

      return false;
    }
    // BOSS enemy attack

    let x = Math.floor(Math.random() * boss.attacks.length);

    console.log(
      `---------${boss.attacks[x].name} - ${boss.attacks[x].damage} Schaden\n`
    );

    char.life -= boss.attacks[x].damage;

    // player dead

    if (char.life < 1) {
      console.clear();
      console.log(
        `Du versinkst im Chaos. Es verschlingt dich und deine nächsten Wochen, während du versuchst dich zu sortieren. Game Over`
      );
      return false;
    }

    fight_status(boss);
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
  let stufe = Math.floor(Math.random() * 4);
  let bonus = belohnungsPacket[stufe];
  char.inventory.forEach((obj) => {
    if (obj.name == "Gold") {
      return (obj.content += bonus);
    } else {
      return obj;
    }
  });
  console.log(`Du hast ${bonus} Goldstücke bei deinem Gegner gefunden!`);
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
// console.log(char.printCertificate());

startGame();
