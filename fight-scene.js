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

/** shows life of the contestants in each round */
function fight_status(enemy) {
  console.log(
    `                 Your life: ${char.life} ------- Enemy life: ${enemy.life}\n`
  );
}

/** gibt die Belohnung nach dem Kampf aus */
function loot() {
  console.log("LOOOOOOT");
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
  console.log(`Du hast ${bonus} Goldstücke gefunden!`);
  console.log(char.inventory);
}

/**Default character */
const char = new Character("test");

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

function startGame() {
  // GAME ALWAYS STARTS WITH SCENE 1
  showTextNode(0);
}

// TEXTNODE => AN ENTIRE SCENE
let textNode;

function resetHealth() {
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
    resetHealth();
    startGame();
  }
  if (textNode.options[0].nextText === 666) {
    fight(enemyOne);
    showTextNode(10001);
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

  // SCENE - 01
  {
    id: 1,
    text: `\nYou wake up in a tavern with a head-splitting headache. You're at a table. \nThe air is humid and stinks of a concoction of various bodily odors. \nYou are very thirsty. Luckily, there is a glass of water next to you.
    \nWhat will you do? (Press a number to continue)`,

    // SCENE - 01 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `\n    1. go to scene 5\n`,

        // INITIATES: SCENE - 02
        nextText: 5,
      },

      //  OPTION - 02
      {
        text: "\n    2. Ignore the glass of water, who knows if it's really water, after all.\n       Look around and try to get your bearing straight.\n",

        // INITIATES: SCENE - 03
        nextText: 3,
      },
    ],
  },

  // SCENE - 05
  {
    id: 5,
    text: `Du gehst leicht schwankend auf die Gestalt zu.\n
      Als du sie erreichst, raunt sie dir entgegen: Ich habe Leichen gesehen, die lebendiger aussehen als du. Brauchst du Hilfe?\n
      Was willst du tun?\n`,
    options: [
      {
        text: "\n1. Nach der Adresse auf dem Schnipsel fragen.\n",
        nextText: 9,
      },
      {
        text: "\n2. Nach Geld fragen.\n",
        nextText: 10,
      },
      {
        text: "\n3. Nach dem aktuellen Datum fragen\n",
        nextText: 11,
      },
      {
        text: "\n4. Die Person beleidigen\n",
        nextText: 12,
      },
    ],
  },

  // FIGHT SCENE Enemy 1
  {
    id: 12,
    text: "\n:::::: Sie brüllt:'Dir bring ich manieren bei!' und erhebt ihre Fäuste zum Kampf. :::::: \n",
    options: [{ text: "", nextText: 666 }],
  },

  // After Battle with Enemy 1
  {
    id: 10001,
    text: `\nDu blickst dich auf der Straße um.\nVor dir liegt ${enemyOne.name} und atmet schwer.\nDer Kutscher starrt dich irritiert an, du hörst wie Fensterläden geschlossen werden.\nDu bemerkst ein Straßenschild: 'F. - E. - Allee'. Das ist der Name der auf deinem Zettel steht!.\n
    Was willst du tun?\n`,
    options: [
      {
        text: "\n1. Den Kutscher ansprechen.\n",
        nextText: 9, // Kutscher Node einfügen,
      },
      {
        text: "\n2. Dem Straßenverlauf folgen und die Adresse suchen.\n",
        nextText: 11, // Bäckerei Node einfügen
      },
      {
        text: "\n3. Zurück in die Kneipe gehen.\n",
        nextText: 9999,
      },
    ],
  },
  // node 9999 / zurück zu Kneipe - GameOver
  {
    id: 9999,
    text: `Du gehst zurück in die Kneipe, setzte dich an den Tresen und bestellst Vodka.`,
    options: [
      {
        text: "\nEine ganze Flasche",
        nextText: 10, // Kutscher Node einfügen,
      },
    ],
  },

  // node for BOSS FIGHT. REWRITE
  {
    id: 12,
    text: "\n:::::: Sie brüllt:'Dir bring ich manieren bei!' und erhebt ihre Fäuste zum Kampf. :::::: \n",
    options: [{ text: "", nextText: 666 }],
  },

  // node AFTER BOSS FIGHT REWRITE
  {
    id: 10001,
    text: `\nDu blickst dich auf der Straße um.\nVor dir liegt ${enemyOne.name} und atmet schwer.\nDer Kutscher starrt dich irritiert an, du hörst wie Fensterläden geschlossen werden.\nDu bemerkst ein Straßenschild: 'F. - E. - Allee'. Das ist der Name der auf deinem Zettel steht!.\n
    Was willst du tun?\n`,
    options: [
      {
        text: "",
        nextText: 
      },
      {
        text: "",
        nextText: 
      },
      {
        text: "",
        nextText: 
      },
    ],
  },
];

startGame();
