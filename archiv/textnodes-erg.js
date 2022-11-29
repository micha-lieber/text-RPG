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


////// F_______________________ight Scenes
// Node 12 FIGHT SCENE Enemy 1
{
  id: 12,
  text: "\n:::::: Sie brüllt:'Dir bring ich manieren bei!' und erhebt ihre Fäuste zum Kampf. :::::: \n",
  options: [{ text: "", nextText: 666 }],
},

//Node 10001 After Battle with Enemy 1
{
  id: 10001,
  text: `\nDu blickst dich auf der Straße um.\nVor dir liegt ${enemyOne.name} und atmet schwer.\nDer Kutscher starrt dich irritiert an, du hörst wie Fensterläden geschlossen werden.\nDu bemerkst ein Straßenschild: 'F. - Eusch - Allee'. Das ist der Name der auf deinem Zettel steht!.\n
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
      nextText: 10002,
    },
  ],
},
// node 10002 / zurück zu Kneipe - GameOver
{
  id: 10002,
  text: `Du gehst zurück in die Kneipe, setzte dich an den Tresen und bestellst Vodka.`,
  options: [
    {
      text: "\nEine ganze Flasche",
      nextText: 10,
    },
  ],
},

// node 10003 for BOSS FIGHT
{
  id: 10003,
  text: "\n:::::: Chaos wirft sich dir mit aller Kraft entgegen, als du versuchst, dir einen Weg durch die Wohnung zu bahnen. Ihr müsst kämpfen! :::::: \n",
  options: [{ text: "", nextText: 667 }],
},

// node 10004 AFTER BOSS FIGHT
{
  id: 10004,
  text: `\n Du fühlst dich ausgezehrt von dem langen Kampf. Die Mittagssonne scheint durch deine geputzten Fenster herein und die in der Luft tanzenden Staubflocken malen Schattenspiele an die Wände. Es ist vorbei. Du hast gewonnen! Zufrieden sinkst du in dein Bett und schließt die Augen.\n`,
  options: [
    {
      text: "",
      nextText: 1337,
    },
  ],
}