const textNode4 = {
  id: 4,
  text: `Du verlässt die Kneipe und stehst auf der offenen Straße. Es ist kalt. Saukalt. Eine Kutsche steht keine 10 Meter von dir entfernt und eine Person starrt dich unverholen an.
    \n
   Was willst du tun?\n`,
  options: [
    {
      text: "\n1. Die Person ansprechen!\n",
      nextText: 5,
    },

    {
      text: "\n2. Die Kutsche ansprechen\n",
      nextText: 6,
    },
    {
      text: "\n1. Umfallen und liegen bleiben. -scheiß tag\n",
      nextText: 7,
    },
    {
      text: "\n1. Gott anbeten!\n",
      nextText: 8,
    },
  ],
};

const textNode5 = {
  id: 5,
  text: `Du sprichst die Person an.
    \n
   Dann sagt er zu dir: -Ich habe Leichen gesehen, die lebendiger aussehen als du. Brauchst du Hilfe??\n`,
  options: [
    {
      text: "\n1. Die Person nach der Adresse auf dem Schnipsel fragen.\n",
      nextText: 9,
    },

    {
      text: "\n2. Die Person nach Geld fragen\n",
      nextText: 10,
    },
    {
      text: "\n1. Die Person nach Datum fragen\n",
      nextText: 11,
    },
    {
      text: "\n1. Die Person beleidigen and sagen: -Hackts bei dir du Arschgeige\n",
      nextText: 12,
    },
  ],
};

const textNode6 = {
  id: 6,
  text: `Du sprichst die Kutsche an. Eine junge Frau sieht schon in der Kutsche. Du findest die so 
    schön und fragst dich, ob du mit ihr ein parr Minute reden kanst.
    \n 
    Der Kutscher sagt: -Wo solls denn higehen???\n`,
  options: [
    {
      text: "\n1. -Ich fahre zu diese Adresse (Die Adresse auf dem Zettel sagen)\n",
      nextText: 13,
    },

    {
      text: "\n2. -Ich fahre in die gleiche Richtung wie die schöne Dame \n",
      nextText: 14,
    },
    {
      text: "\n1. -Geh weg mit deiner hässlichen Kutsche\n",
      nextText: 15,
    },
    {
      text: "\n1.  -Danke aber ich habe nicht genug Geld\n",
      nextText: 16,
    },
  ],
};

const textNode7 = {
  id: 7,
  text: `Du fällst um, und bleibst liegen. -scheiß tag.
    \n
Im selben Moment fährt dich um\n`,
  options: [
    {
      text: "\n1. Game over!\n",
      nextText: 0,
    },
  ],
};

const textNode8 = {
  id: 8,
  text: `Du betest Gott an.
      \n
     Er ist dir Gnädig and schickt dir einen Engel der dir sagt: -\n`,
  options: [
    {
      text: "\n1. Die Person nach der Adresse auf dem Schnipsel fragen.\n",
      nextText: 0,
    },

    {
      text: "\n2. Die Person nach Geld fragen\n",
      nextText: 0,
    },
    {
      text: "\n1. Die Person nach Datum fragen\n",
      nextText: 0,
    },
    {
      text: "\n1. Die Person beleidigen and sagen: -Hackts bei dir du Arschgeige\n",
      nextText: 0,
    },
  ],
};

const textNode9 = {
  id: 9,
  text: `Nachdem du die Person nach der Adresse gefragt hast, sagt er zu dir: 
      \n
     -Das ist keine 5 Minuten von hier, du erkennst es an der Bäckerei im Erdgeschoss\n`,
  options: [
    {
      text: "\n1. Zur Bäckerei gehen ???\n",
      nextText: 10,
    },

    {
      text: "\n2. Sich wenden und die Kutsche ansprechen\n",
      nextText: 6,
    },
  ],
};

//   const textNode = {
//     id: ,
//     text: `Nachdem du die Person nach der Adresse gefragt hast, sagt er zu dir:
//       \n
//      -Das ist keine 5 Minuten von hier, du erkennst es an der Bäckerei im Erdgeschoss\n`,
//     options: [
//       {
//         text: "\n1. Zur Bäckerei gehen ???\n",
//         nextText: 10,
//       },

//       {
//         text: "\n2. Sich wenden und die Kutsche ansprechen\n",
//         nextText: 6,
//       }]}
