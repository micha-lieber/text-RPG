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
        text: `\n    1. Pick up the glass of water and chug it down, you are dying of thirst!\n`,

        // INITIATES: SCENE - 02
        nextText: 2,
      },

      //  OPTION - 02
      {
        text: "\n    2. Ignore the glass of water, who knows if it's really water, after all.\n       Look around and try to get your bearing straight.\n",

        // INITIATES: SCENE - 03
        nextText: 3,
      },
    ],
  },

  // SCENE - 02
  {
    id: 2,
    text: `\nAhh a delicious glass of ice col... Wha.. what?! This isn't water! This is rum! \nPure rum! You die inside as the liquor burns its way down your esophagus. \nUh-oh, you feel your stomach churning in protest.\n`,

    // SCENE - 02 - OPTIONS
    options: [
      {
        text: `You can't keep it in. Your eyes frantically look for a spot to let it all out, \nbut alas it's too late. A blubbering, gargling sound emits from your mouth as you \nvomit all over yourself and the table. You pass out.`,

        // INITIATES: DEATH SCENE
        nextText: 10,
      },
    ],
  },

  // SCENE - 03
  {
    id: 3,
    text: `\nYou are in a rather rowdy tavern. The loudness of the chatter and the music is \nalmost deafening to your sensitive ears. The air is humid and stinks of a \nconcoction of various bodily odors. The door is to your back. You need to leave this place.`,

    // SCENE - 03 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: "\n    1. Rush for the door, jank it open and leave the tavern.\n",

        // INITIATES: SCENE - 04
        nextText: 4,
      },

      //  OPTION - 02
      {
        text: "\n    2. Go to the bartender and inquire him about your situation.\n",

        // INITIATES: SCENE - 05
        nextText: 5,
      },

      //  OPTION - 03
      {
        text: "\n    3. Stay in your seat and accept your fate.\n",

        // INITIATES: DEATH SCENE
        nextText: 2,
      },

      //  OPTION - 04
      {
        text: "\n    4. Change your mind and drink that glass of water. \n",

        // INITIATES: SCENE - 02
        nextText: 2,
      },
    ],
  },

  // SCENE - 04
  {
    id: 4,
    text: `\nThe streets are cold but the air is refreshing. \nYou take a deep breath and the cold air rushing through your lungs alleviates your drunkeness a bit. \nYou feel as if you can think more clearly now. Your blurry vision is also returning to normal.`,

    // SCENE - 04 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: "\n    1. Go to Scene 5.\n",

        // INITIATES: SCENE - 05
        nextText: 5,
      },

      //  OPTION - 02
      {
        text: "\n    2. Go to Scene 6.\n",

        // INITIATES: SCENE - 06
        nextText: 6,
      },

      //  OPTION - 03
      {
        text: "\n    3. Die.\n",

        // INITIATES: DEATH SCENE
        nextText: 2,
      },

      //  OPTION - 04
      {
        text: "\n    4. Go to Scene 7. \n",

        // INITIATES: SCENE - 07
        nextText: 7,
      },
    ],
  },

  // SCENE - 05
  {
    id: 5,
    text: `\nBla bla bla bla bla bla bla bla bla bla bla. \nAnd some more bla bla bla bla bla bla bla bla bla.`,

    // SCENE - 05 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: "\n    1. Die.\n",

        // INITIATES: DEATH SCENE
        nextText: 2,
      },

      //  OPTION - 02
      {
        text: "\n    2. Do thing B.\n",

        // INITIATES: SCENE - 06
        nextText: 6,
      },

      //  OPTION - 03
      {
        text: "\n    3. Die.\n",

        // INITIATES: DEATH SCENE
        nextText: 2,
      },

      //  OPTION - 04
      {
        text: "\n    4. Do thing D. \n",

        // INITIATES: SCENE - 07
        nextText: 7,
      },
    ],
  },

  // SCENE - 06
  {
    id: 6,
    text: `\nYadedadedadedadeadadeadadeeade Blabla this and that I am very ghey.`,

    // SCENE - 06 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: "\n    1. Die.\n",

        // INITIATES: DEATH SCENE
        nextText: 2,
      },

      //  OPTION - 02
      {
        text: "\n    2. Die.\n",

        // INITIATES: DEATH SCENE
        nextText: 2,
      },

      //  OPTION - 03
      {
        text: "\n    3. Die\n",

        // INITIATES: DEATH SCENE
        nextText: 2,
      },

      //  OPTION - 04
      {
        text: "\n    4. Do thing D. \n",

        // INITIATES: SCENE - 07
        nextText: 7,
      },
    ],
  },

  // SCENE - 07
  {
    id: 7,
    text: `\nYadedadedadedadeadadeadadeeade Blabla this and that I am very ghey.`,

    // SCENE - 07 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: "\n    1. Go to Scene 6.\n",

        // INITIATES: DEATH SCENE
        nextText: 6,
      },

      //  OPTION - 02
      {
        text: "\n    2. Die.\n",

        // INITIATES: DEATH SCENE
        nextText: 2,
      },

      //  OPTION - 03
      {
        text: "\n    3. Die.\n",

        // INITIATES: DEATH SCENE
        nextText: 2,
      },

      //  OPTION - 04
      {
        text: "\n    4. Die. \n",

        // INITIATES: DEATH SCENE
        nextText: 2,
      },
    ],
  },

  // SCENE - 10 - DEATH
  // EMPTY TEXT AND EMPTY OPTION TO AVOID "UNDEFINED" RETURNS
  // GAME SHOULD REBOOT WHENEVER THIS SCENE IS READ.
  {
    id: 10,
    text: ``,
    options: [{ text: `` }],
  },

  // SCENE - 11 - WRONG INPUT
  {
    id: 11,
    text: `You've put in a wrong number. Try again!`,
    options: [{ text: `` }],
  },
];

// INITIATE GAME
startGame();

// EVERY DEATH SCENE SHOULD TAKE YOU TO A SPECIAL SCENE DESCRIBING YOUR DEATH
// AND AFTERWARDS INITIATE DEATH SCENE

// IGNORE
// readLineSync.keyInSelect example:
/* animals = ['Lion', 'Elephant', 'Crocodile', 'Giraffe', 'Hippo'],
index = readlineSync.keyInSelect(animals, 'Which animal?');
console.log('Ok, ' + animals[index] + ' goes to your room.'); */
