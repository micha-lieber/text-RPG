// Node 4
{
  id: 4,
  text: `Du verlässt die Kneipe und stehst auf der offenen Straße. Es ist kalt. Saukalt. Eine Kutsche steht keine 10 Meter von dir entfernt und eine untersetzte Person auf dem gegenüberliegenden Bordstein, die dich unverholen anstarrt.
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
      text: "\n3. Umfallen und liegen bleiben. Scheiß tag.\n",
      nextText: 10,
    },
    {
      text: "\n4. Gott anbeten!\n",
      nextText: 8,
    },
  ],
},
//Node 5
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
// Node 6
 {
  id: 6,
  text: `Du gehst auf den Kutscher zu, der dich herablassend anschaut. Eine junge Frau sitzt schon in der Kutsche. Du findest sie so 
    schön und fragst dich, ob du mit ihr ein paar Minuten reden kanst.
    \n 
    Der Kutscher sieht deinen Blick und fragt: 'Wo solls denn higehen?'\n#
    Was willst du tun?\n`,
    
  options: [
    {
      text: "\n1. Ihm nuscheln die Adresse auf dem Zettel zeigen.\n",
      nextText: 13,
    },

    {
      text: "\n2. Sagen, dass du in die gleiche Richtung wie die schöne Dame fährst.\n",
      nextText: 14,
    },
    {
      text: "\n3. Fragen wieviel eine Fahrt kostet.\n",
      nextText: 15,
    },
    {
      text: "\n4. Dankend ablehnen, du hast kein Geld bei dir.\n",
      nextText: 4,
    },
  ],
},

// Node 8
{
  id: 8,
  text: `Du kniest dich in der Kälte auf die Straße und fängst an zu beten.
      \n
     Eine sonnenhelle Gestalt schwebt zu dir herab, legt dir sanft die Hand auf die Schulter und erinnert dich daran, dass du den Zettel mit der Adresse in der Tasche hast.\n
     Was willst du tun?\n`,
  options: [
    {
      text: "\n1. Die Person nach der Adresse auf dem Schnipsel fragen.\n",
      nextText: 9,
    },

    {
      text: "\n2. Dem Kutscher sagen, dass du zu der Adresse auf dem Zettel willst.\n",
      nextText: 13,
    },
    {
      text: "\n3. Die Person nach dem aktuellen Datum fragen\n",
      nextText: 11,
    },
    {
      text: "\n4. Zurück in die Kneipe gehen und dich erstmal aufwärmen.\n",
      nextText: 10,
    },
  ],
};
//Node 9
 {
  id: 9,
  text: `Du holst den zerknüllten Zettel aus deiner Hosentasche und hälst ihn vor das Gesicht deines Gegenübers. 'Da will ich hin', bringst du noch hervor. 
      \n
     'Das ist keine 5 Minuten von hier, du erkennst es an einer Bäckerei im Erdgeschoss.', antwortet dein Gegenüber, und beschreibt dir den Weg.\n
     Was willst du tun?\n`,
  options: [
    {
      text: "\n1. Zur Bäckerei gehen ?\n",
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
