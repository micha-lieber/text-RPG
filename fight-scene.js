let readlineSync = require("readline-sync");

function startGame() {
  // GAME ALWAYS STARTS WITH SCENE 1
  showTextNode(0);
}

// TEXTNODE => AN ENTIRE SCENE
let textNode;

function showTextNode(textNodeIndex) {
  // FIND SCENE BY ID AND LOG ITS TEXT FIRST
  textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  console.log(textNode.text);

  // MAP THROUGH OPTIONS OF TEXTNODE AND LOG THEM SECOND
  textNode.options.map((option) => console.log(option.text));

  // CHECKS FOR BAD CHOICE AND SENDS PLAYER TO DEATH SCENE
  // A BAD CHOICE IS ANY OPTION WITH NEXTTEXT 10
  if (textNode.options[0].nextText === 10) {
    console.log("\n\n\nGAME OVER MAN, GAME OVER\n\n\n");

    // console.clear() => ERROR, FIX LATER

    // REBOOT GAME AFTER PLAYER MADE BAD CHOICE
    startGame();
  }

  // ASK PLAYER TO CHOOSE FROM MAX 4 OPTIONS
  let answer = readlineSync.question();

  let nextSceneLen = textNode.options.length;

  // REPLAY SCENE UPON FAULTY PLAYER INPUT
  if (answer > nextSceneLen || answer < 0) {
    showTextNode(textNode.id);
  } else {
    // INITIATE NEXT SCENE UPON CORRECT PLAYER INPUT
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
        text: `\n\n  Press 1 to start game`,
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
    text: `Du gehst leicht schwankend auf die Gestalt zu.
      \n
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

  // FIGHT SCENE
  {
    id: 12,
    text: "Dir bring ich manieren bei!",
    options: [{ text: "Ihr werdet kämpfen müssen!", nextText: 666 }],
  },
];
