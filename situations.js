let readlineSync = require("readline-sync");

function startGame() {
  showTextNode(1);
  selectOption();
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  console.log(textNode.text);

  let textOptions = textNode.options.map((option) => console.log(option.text));
  //console.log(textOptions);
}

function selectOption() {
  let optionChoice = readlineSync.question(`\n    Choose: (1, 2, 3, 4)`);
  //Indexpos mit -1 entsprechend anpassen.

  if (optionChoice == 3) {
    console.log();
  }
}

const textNodes = [
  {
    id: 1,
    text: `\nYou wake up in a tavern with a head-splitting headache. You're at a table. \nThe air is humid and stinks of a concoction of various bodily odors. \nYou are very thirsty. Luckily, there is a glass of water next to you.\n
    \n
    What will you do?\n`,
    options: [
      {
        text: "\n    1. Pick up the glass of water and chug it down, you are dying of thirst!\n",
        nextText: 2,
      },

      {
        text: "\n    2. Ignore the glass of water, who knows if its really water, after all.\n    Look around and try to get your bearing straight. What's your next move?\n",
        nextText: 3,
      },
    ],
  },

  {
    id: 2,
    text: "Ahh a delicious glass of ice col... Wha.. what?! This isn't water! This is rum! Pure rum! You die inside as the liquor burns its way down your esophagus. Uh-oh, you feel your stomach churning in protest.",
    options: [
      {
        text: "You can't keep it in. Your eyes frantically looking for a spot to let it all out, but alas it's too late. A blubbering, gargling sound emits from your mouth as you vomit all over yourself and the table. You happen to make out a reddish color in your vomit. That can't be good, you think to yourself, as you pass out never to awaken again. End.",
      },
    ],
  },

  {
    id: 3,
    text: "",
    //options: [{}],
  },
];

startGame();
