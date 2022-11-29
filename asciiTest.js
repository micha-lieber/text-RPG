var figlet = require("figlet");
let readlineSync = require("readline-sync");

/**Default attacks*/
const attacksArr = [
  { name: "Ohrfeige", damage: 10 },
  { name: "Faustschlag", damage: 20 },
  { name: "Tritt gegen das Knie", damage: 30 },
];

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
  printCertificate() {
    return figlet.text(
      `  Hay  ${char.name} \n   Du hast \n gewonnen`,
      {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 150,
        whitespaceBreak: true,
      },
      function (err, data) {
        console.log(data);
      }
    );
  }
  decrementInventory(name, num) {
    this.inventory.forEach((obj) => {
      if (obj.name == name) {
        obj.content -= num;
      }
    });
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

/**Default character */
const char = new Character("test");

function fight(enemy) {
  while (enemy.life > 0 && char.life > 0) {
    // player attack
    let answer = readlineSync.question(
      `Was willst du tun? (0 = Ohrfeige, 1 = Faustschlag, 2 = Tritt gegen das Knie, 3 = warten)\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n`
    );

    if (!answer) {
      console.log(
        `Du hebst eine Hand mit Handfläche zu deinem Gegner um zu signalisieren, dass du eine Pause brauchst. Zu deiner Überraschung lässt ${enemy.name} von dir ab. Dann passiert es. Du lehnst dich vor und übergibst dich ausgiebig auf dem Bürgersteig.`
      );
    } else if (answer < 3) {
      console.log(
        `Du greifst ${enemy.name} mit ${char.attacks[answer].name} an und verursachst ${char.attacks[answer].damage} Schaden.\n`
      );
      enemy.life -= char.attacks[answer].damage;

      // enemy dead
      if (enemy.life < 1) {
        console.clear();
        console.log(
          `\n${enemy.name} geht zu Boden. Adrenalin rauscht durch deinen Körper. Es ist vorbei. Du hast gewonnen!\n`
        );
        loot();
        return true;
      }
    } else if (answer >= 3) {
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

function startGame() {
  // GAME ALWAYS STARTS WITH SCENE 1
  showTextNode(0);
}

// TEXTNODE => AN ENTIRE SCENE
let textNode;

function reset() {
  char.inventory = [
    { name: "zettel", content: "eine liederlich geschriebene Adresse" },
    { name: "Gold", content: 0 },
  ];
  enemyOne.life = 100;
  char.life = 100;
  boss.life = 999;
}

function showTextNode(textNodeIndex) {
  // FIND SCENE BY ID AND LOG ITS TEXT FIRST
  textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  console.log(textNode.text);

  // MAP THROUGH OPTIONS OF TEXTNODE AND LOG THEM SECOND
  textNode.options.map((option) => console.log(option.text));

  // CHECKS FOR BAD CHOICE AND SENDS PLAYER TO DEATH SCENE
  // A BAD CHOICE IS ANY OPTION WITH NEXTTEXT 10
  if (textNode.options[0].nextText === 10) {
    console.log("\n\nGAME OVER MAN, GAME OVER\n\n");

    // console.clear() => ERROR, FIX LATER

    // REBOOT GAME AFTER PLAYER MADE BAD CHOICE
    reset();
    startGame();
  }
  if (textNode.options[0].nextText === 666) {
    let y = fight(enemyOne);
    if (y) {
      showTextNode(10001);
    } else {
      reboot();
    }
  }
  if (textNode.options[0].nextText === 667) {
    let x = fightBoss(boss);
    if (x) {
      showTextNode(10004);
    } else {
      reboot();
    }
  }

  if (textNode.options[0].nextText === 1) {
    readlineSync.question("Taste drücken um fortzufahren");
    console.log("1337 schleife");

    console.log(char.printCertificate());
    // reboot();
  }

  // ASK PLAYER TO CHOOSE FROM MAX 4 OPTIONS
  let answer = readlineSync.question();

  let nextSceneLen = textNode.options.length;

  // REPLAY SCENE UPON FAULTY PLAYER INPUT
  if (answer > nextSceneLen || answer < 0) {
    console.clear();
    showTextNode(textNode.id);
  } else {
    // INITIATE NEXT SCENE UPON CORRECT PLAYER INPUT
    console.clear();
    let nextScene = showTextNode(textNode.options[answer - 1].nextText);
  }
}

// ALL SCENES AND OPTIONS
const textNodes = [
  // SCENE - 00 - START
  {
    id: 0,
    text: `                      
    \n    ::::::::::::::::::::::::::::::::::::::::::::::::\n    ::::::::::::::::::::::::::::::::::::::::::::::::\n    ::::::::::::::                    ::::::::::::::\n    ::::::::::::::: THE EPIC JOURNEY :::::::::::::::\n    ::::::::::::::::  ~~~~~ OF ~~~  ::::::::::::::::\n    :::::::::::::::::   DRUNK GUY  :::::::::::::::::\n    ::::::::::::::::::     BOB    ::::::::::::::::::\n    ::::::::::::::::::::::    ::::::::::::::::::::::\n    ::::::::::::::::::::::::::::::::::::::::::::::::\n    ::::::::::::::::::::::::::::::::::::::::::::::::`,
    options: [
      {
        text: `\n Press 1 to start game`,
        nextText: 1,
      },
    ],
  },
];

startGame();
// console.log(char.printCertificate("Ali"));
