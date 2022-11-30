var readlineSync = require("readline-sync");
const { exit } = require("process");
// run "npm install cli-color" beforehand!
let clc = require("cli-color");

// run "npm install play-sound" if you want to add sounds.
var player = require("play-sound")((opts = {}));
// player.play("./assets/ManyPunches-SoundBiblecom-1623072177.mp3");

// current date for scene 12
let date = new Date();

// stores entire scenes
let textNode;

// default attacks
const attacksArr = [
  { name: "Ohrfeige", damage: 10 },
  { name: "Faustschlag", damage: 20 },
  { name: "Tritt gegen das Knie", damage: 30 },
];

// first enemy
const enemyOne = {
  name: "Napoleon Dynamite",
  life: 100,
  attacks: attacksArr,
};

// boss enemy
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

// class for main character
class Character {
  // class constructor for character creation
  constructor(name) {
    this.name = name;
    this.life = 100;
    this.inventory = [
      { nameInv: "Zettel", content: "Eine liederlich geschriebene Adresse" },
      { nameInv: "Gold", content: 0 },
    ];
    this.attacks = attacksArr;
  }

  // inventory-function for item-display, -addition and -removal
  printInventory() {
    console.clear();
    console.log(
      `Du hast \n ${this.inventory[0].nameInv} mit ${this.inventory[0].content}\n ${this.inventory[1].content} Stück ${this.inventory[1].nameInv}`
    );
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

// congratulatory message after player completes the game
Character.prototype.printCertificate = function () {
  // prototype of character class
  console.log(`
  \n    ::::::::::::::::::::::::::::::::::::::::::::::::\n    ::::::::::::::::::::::::::::::::::::::::::::::::\n    :::::::::::      Glückwunsch! Du     :::::::::::\n    :::::::::::: hast dieses Abenteuer :::::::::::::\n    :::::::::::::::  ~~~~~ von ~~~  ::::::::::::::::\n    :::::::::::::::::   DRUNK GUY  :::::::::::::::::\n    ::::::::::::::::::     BOB    ::::::::::::::::::\n    ::::::::::::::::::  erledigt! ::::::::::::::::::\n    ::::::::::::::::::::::::::::::::::::::::::::::::\n    ::::::::::::::::::::::::::::::::::::::::::::::::`);
};

// default character
const char = new Character(
  readlineSync.question(`  Wie heißt du? (Max. 10 Buchstaben)    `)
);

// starts the game
function startGame() {
  showTextNode(0);
}

// all scenes:
// note: every death-trigger should take player to a special pre-death scene and initiate death afterwards.
const textNodes = [
  // scene - 00 - start
  {
    id: 0,
    text: `                      
    \n       :::::::::::::    :::::  %%%%  ------------------------------  %%%%  :::::    ::::::::::::\n       ::::::::::::::      :::  %%%%  ○○○○○○○○○○○○○○○○○○○○○○○○○○○○  %%%%  :::      :::::::::::::\n       :::::::::::::::    :::::  %%%%  ○○○○------------------○○○○  %%%%  :::::    ::::::::::::::\n       ::::::::::::::::      :::  %%%%  ○○                    ○○  %%%%  :::      :::::::::::::::\n       ::::::::::::::::     :::::  %%%%  ○○ THE EPIC JOURNEY ○○  %%%%  :::::     :::::::::::::::\n       :::::::::::::::         :::  %%%%  ○○  ~~~~ OF ~~~~  ○○  %%%%  :::         ::::::::::::::\n       ::::::::::::::   ::    :::::  %%%%  ○○   DRUNK GUY  ○○  %%%%  :::::    ::   :::::::::::::\n       :::::::::::::   ::::      :::  %%%%  ○○${` `.repeat(
      Math.abs(6 - Math.floor(char.name.length / 2))
    )}${char.name.toUpperCase()}${" ".repeat(
      Math.abs(6 - Math.floor(char.name.length / 2))
    )} ○○  %%%%  :::      ::::   ::::::::::::\n       ::::::::::::   ::::::    :::::  %%%%  ○○○        ○○○  %%%%  :::::    ::::::   :::::::::::\n       :::::::::::   :::  :::      :::  %%%%  ○○○------○○○  %%%%  :::      :::  :::   ::::::::::\n       ::::::::::   :::    :::    :::::  %%%%  ○○○○○○○○○○  %%%%  :::::    :::    :::   :::::::::\n       :::::::::   :::      :::      :::  %%%%  --------  %%%%  :::      :::      :::   ::::::::`,
    options: [
      {
        text: `\n\n   Press any ${clc.greenBright(`key`)} to start the game.`,
        nextText: 1,
      },
    ],
  },
  // scene - 01 - intro
  {
    id: 1,
    text: `\n\n   An einem Tisch in einer Taverne, wachst du auf. Dein Kopf dröhnt vor Schmerzen. Wo bist du?\n   Was ist passiert? Dir an den Kopf fassend, atmest du tief ein. Die Luft ist feucht, warm und\n   stinkt nach einer bittersüßlichen Mischung verschiedenster Körpergerüche. Deine Hand greift\n   nach deinem Mund, fast hättest du dich übergeben. Ein unerträglicher Durst erfasst dich. Wasser.\n   Du brauchst Wasser. Zum Glück steht ein Glas kristallklares, eiskaltes Wasser direkt vor dir.
    \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // scene - 01 - options
    options: [
      //  option - 01
      {
        text: `\n        1. Ohne nachzudenken nach dem Glas schnappen und es deinen gierigen, vertrockneten Schlund hinunter kippen!\n`,

        // initiates: pre-death - 02
        nextText: 2,
      },

      //  option - 02
      {
        text: `\n        2. Ignoriere das Glas, wer weiß was diese durchsichtige Flüssigkeit wirklich ist? Du schaust dich um.\n`,

        // initiates: scene - 03
        nextText: 3,
      },
    ],
  },
  // scene - 02 - pre-death: wasser
  {
    id: 2,
    text: `\n   Ahh, ein süßes, die Kehle befeuchtendes, eiskaltes Glas Wass... Wa... Was? Das ist kein Wasser!\n   Das ist Rum! Purer Rum! Du stirbst innerlich als das dir der Alkohol den Hals hinunter brennt.\n   Uh-oh, du fühlst, wie sich dein Magen dreht und krümmt, fast so als würde es protestieren.\n`,

    // scene - 02 - options
    options: [
      {
        text: clc.redBright(`\n        Du hälst es nicht mehr aus! Deine Augen suchen panisch nach einer Ecke, einem Eimer, irgendwas worin du dich\n        übergeben kannst, doch es ist zu spät. Ein blubberndes, gurgelndes Geräusch entfleucht deinen trockenen Lippen,\n        während dir dein Mageninhalt hochgeschossen kommt. Für einen kurzen Moment wirkst du, wie ein majestätischer\n        Vulkan, der sich in Lava ergießt. Tränend, rollen sich deine Augen nach hinten, du besudelst dich und den\n        unschuldigen Tisch mit deinem Erbrochenen.\n\n        Du verlierst dein Bewusstsein. Majestätisch sah das jetzt nicht aus...
        `),

        // initiates: death
        nextText: 99,
      },
    ],
  },
  // scene - 03 - taverne
  {
    id: 3,
    text: `\n   Du befindest dich in einer dreckigen, heruntergekommenen Taverne. Um dich herum allerlei Menschen,\n   beschäftigt sich zu betrinken oder verwickelt in lautstarkem Suffgeschwätz. Dazu noch die\n   Lautstärke der Musik und dir ist sofort bewusst, woher die Kopfschmerzen kommen. Zumindest zum Teil,\n   schließlich hast du auch ordentlich einen im Tee, mein Bester.
\n   Links hinter dir öffnet sich eine Tür und ein Mann tritt herein. Er nickt einigen Gästen zu\n   und wendet sich, seine Jacke aufknöpfend, dem Kleiderhaken zu.\n   Das muss der Ausgang sein, denkst du dir.
\n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // scene - 03 - options
    options: [
      //  option - 01
      {
        text: "\n        1. Gehe zum Wirt und frage ihn, ob er weiß was mit dir passiert ist.\n",

        // initiates: scene - 04
        nextText: 4,
      },

      // option - 02
      {
        text: "\n        2. Warte bis der Mann sich von der Tür entfernt, pack' deine Habseligkeiten und fliehe sofort aus der Taverne!\n",

        // initiates: scene - 05
        nextText: 5,
      },

      // option - 03
      {
        text: "\n        3. Das Glas Wasser flirtet dich die ganze Zeit schon an, du kannst der Versuchung nicht länger widerstehen! \n",

        // initiates: pre-death - 02
        nextText: 2,
      },
    ],
  },
  // scene - 04 - wirt
  {
    id: 4,
    text: `\n   Der Wirt nickt dir zu, als er dich am Tresen empfängt. Er wirft einen, kurzen, durchdringenden Blick\n   auf dich und schnauft. Ehe du dich versiehst, steht ein großer, durchsichtiger Krug vor dir. Du siehst\n   trockener aus, als meine Frau nachts im Bett, mein Freund, posaunt er laut und klopft dir dabei lachend\n   auf die Schulter. Das Wasser hier geht auf's Haus, lang zu bevor du mir hier noch umkippst, fügt er hinzu.\n   Bevor er zu Ende reden kann, hängst du mit deinen gierigen Lippen schon am Krug.\n\n   Erfrischend, kaltes Wasser fließt dir angenehm kühlend den Hals hinunter.\n   Was kann ich für dich tun Kleiner? Fragt er dich, erstaunt darüber, wie schnell du den Krug geleert hast.
    \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // scene - 04 - options
    options: [
      //  option - 01
      {
        text: "\n        1. Danke ihm und falle über den Krug her. Wasser, Wasser... An was anderes kannst du nicht mehr denken.\n",

        // INITIATES: SCENE - 05
        nextText: 5,
      },

      //  OPTION - 02
      {
        text: "\n        2. Lehne sein Angebot dankend ab. Du hast dein eigenes Glas Wasser, vom Tisch an dem du eben noch warst, dabei. \n",

        // INITIATES: PRE-DEATH - 02
        nextText: 2,
      },

      //  OPTION - 03
      {
        text: "\n        3. Greife nach seinem Kragen und ziehe ihn zu dir herunter:\n           Hör' zu Arschloch! Nochmal falle ich auf deine KO-Drinks nicht herein! \n",

        // INITIATES: PRE-DEATH - 06
        nextText: 6,
      },

      //  OPTION - 04
      {
        text: "\n        4. Schau ihn leicht genervt an, dann den Krug. Wer weiß, was dir dieser Mann andrehen will.\n           Lehne sein Angebot dankend an und verlasse die Taverne. \n",

        // INITIATES: SCENE - 05
        nextText: 5,
      },
    ],
  },
  // SCENE - 05 - DRAUßEN
  {
    id: 5,
    text: `\n   Du verlässt die Taverne und stehst auf einer offenen Straße. Es ist kalt. Saukalt. Die Art von alles\n   durchdringender Kälte, die selbst dein bestes Stück, wie einen verschrumpelten Pickel aussehen lässt.\n   Oder sah der schon vorher so aus? Hey, hey. Sorry. Ich bin zu weit gegangen, sei nicht traurig.\n   Auf die Größe kommt es schließlich nicht an, oder irgendwie sowas.\n\n   Eine Kutsche steht keine zehn Meter von dir entfernt und eine untersetzte Person auf dem\n   gegenüberliegenden Bordstein, die dich unverhohlen anstarrt.
  \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // SCENE - 05 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: "\n        1. Dich der Person zuwenden, die dich seltsam beäugelt und sie ansprechen.\n",

        // INITIATES: SCENE - 10
        nextText: 10,
      },

      //  OPTION - 02
      {
        text: "\n        2. Den Kutscher ansprechen. Es ist verdammt kalt und du willst schleunigst nach Haus!\n",

        // INITIATES: SCENE - 08
        nextText: 8,
      },

      //  OPTION - 03
      {
        text: "\n        3. Umfallen. Liegen bleiben. Scheißtag.\n",

        // INITIATES: PRE-DEATH - 07
        nextText: 7,
      },

      //  OPTION - 04
      {
        text: "\n        4. Gott anbeten!\n",

        // INITIATES: SCENE - 13
        nextText: 13,
      },
    ],
  },
  // SCENE - 06 - PRE-DEATH: WIRT
  {
    id: 6,
    text: `\n   Mit einer Hand haut der Wirt laut auf den Tresen und mit der anderen greift er nach deiner Babyhand.\n   Spielen willst du, ja? Flüstert er dir berdrohlich zu, sich über dich beugend. Jetzt erst bemerkst du,\n   wie gewaltig groß der Wirt ist, deine Hand ist gar komplett in seiner Bärenpranse verschwunden.\n   Du stammelst unverständliches Zeug, ehe deine wirren Gedanken von einem stechenden Schmerz in deiner\n   Hand unterbrochen werden.`,

    // SCENE - 06 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: clc.redBright(`\n        Du schaust auf deine Hand. Deine Finger zeigen in unterschiedliche Richtungen. Du kannst dich\n        nicht erinnern, dass sie sich jemals hätten so drehen können. Der Wirt hat dir wohl einhändig\n        deine gesamte Hand zertrümmert. Viel Zeit mit den Schmerzen bleibt dir nicht, denn als nächstes\n        siehst du aus dem Augenwinkel eine gewaltige Faust, gleich einem allesvernichtenden Meteors,\n        auf dein Gesicht herunterdonnern.\n\n        Poof, dir gehen die Lichter aus. Was hast du Wicht dir nur dabei gedacht?
        `),

        // INITIATES: DEATH
        nextText: 99,
      },
    ],
  },
  // SCENE - 07 - PRE-DEATH: KÄLTE
  {
    id: 7,
    text: `
   Du rutschst auf einer gefrorenen Pfütze aus und landest flach auf dem Boden.
   Du willst dich gerade hochraffen, da hälst du kurz still, denkst nach und nickst
   dir selbst zu. Es scheint, als hättest du deine Entscheidung getroffen. Du bleibst liegen.`,

    // SCENE - 07 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: clc.redBright(`        
        
        Die Kälte nimmt sich deiner sofort an. Sie siecht in deine Gliedmaßen ein, kriecht dein Torso
        hoch und legt sich sanft über deine Brust. Ihr eisiger Griff jedoch, umklammert dein Herz.
        Sie raubt dir den Schmerz, du fühlst nichts mehr, leise flüstert sie dich in den Schlaf.

        Auch wenn sie grässlich klingt, so ist sie doch ein gnadenvoller Tod. Zufrieden schläfst
        du ein, dein Gesicht bleich und blau. Aufwachen wirst du sicherlich nicht mehr.
        `),

        // INITIATES: DEATH
        nextText: 99,
      },
    ],
  },
  // SCENE - 08 - KUTSCHER: ERSTES TREFFEN I
  {
    id: 8,
    text: `
   Der Kutscher schaut dich besorgt an. Ist Ihnen nicht kalt? Sie haben nicht einmal eine Jacke an.
   Soll ich Sie irgendwohin fahren?
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // SCENE - 08 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
        1. Ihm sagen, dass du keine Ahnung hast, wie du hier gelandet bist und nach Hause willst.
        `,

        // INITIATES: SCENE - 09
        nextText: 9,
      },

      //  OPTION - 02
      {
        text: `
        2. Dich wieder von ihm abwenden. Die Person, die dich anstarrt ist doch interessanter.
        `,

        // INITIATES: SCENE - 10
        nextText: 10,
      },

      //  OPTION - 03
      {
        text: `
        3. Eine transzendente Stimme flüstert dir zu. Dir wird ganz warm in der Brust.
        `,

        // INITIATES: SCENE - 13
        nextText: 13,
      },
    ],
  },
  // SCENE - 09 - KUTSCHER: ERSTES TREFFEN II
  {
    id: 9,
    text: `
   Hahaha, wollen wir das nicht alle? Lacht er dir zu und ergänzt: Ich kann Sie gerne nach Hause
   fahren. Eine Fahrt innerhalb der Stadt, würde Sie ${clc.yellowBright(
     `10 Goldmünzen`
   )} kosten.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // SCENE - 09 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
        1. ${clc.yellowBright(
          `10 Goldmünzen`
        )}?! Sieht dieser Mann nicht, wie elend es dir geht? Du schnellst nach vorne um nach seiner Jacke zu greifen, fast blind vor Wut.
        `,

        // INITIATES: PRE-DEATH - 07
        nextText: 7,
      },

      //  OPTION - 02
      {
        text: `        
        2. Den Kopf schütteln und sein Angebot ablehnen. Geld hast du keins. Vielleicht kann dir die untergesetzte Person weiterhelfen?
           Schließlich starrt sie dich schon die ganze Zeit an.
        `,

        // INITIATES: SCENE - 10
        nextText: 10,
      },

      //  OPTION - 03
      {
        text: `
        3. Eine transzendente Stimme flüstert dir zu. Die Stimme ist überwältigend...
        `,

        // INITIATES: SCENE - 13
        nextText: 13,
      },
    ],
  },
  // SCENE - 10 - PERSON: ERSTES TREFFEN I
  {
    id: 10,
    text: `
   Leicht taumelnd, gehst du auf die Person zu. Sie mustert dich mit ihren Augen von oben bis unten ab.
   Als du sie erreichst, raunt sie dir entgegen: Ich habe Leichen gesehen, die lebendiger aussehen als du.
   Brauchst du Hilfe?
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
   `,

    // SCENE - 10 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        1. Nach Geld fragen.
        `,

        // INITIATES: SCENE - 11
        nextText: 11,
      },

      //  OPTION - 02
      {
        text: `        2. Nach dem aktuellen Datum fragen.
        `,

        // INITIATES: SCENE - 12
        nextText: 12,
      },

      // OPTION - 03
      {
        text: `        3. Die Person beleidigen: Deine Hässlichkeit brennt mir die Augen aus meinem Schädel!`,

        // INITIATES: FIGHT
        nextText: 9999,
      },
    ],
  },
  // SCENE - 11 - PERSON: ERSTES TREFFEN II
  {
    id: 11,
    text: `
   Die Person schaut dich bemitleidenswert an. Du siehst auch so aus als bräuchtest du Geld, mein Lieber.
   Hier hast du ${clc.yellowBright(
     `2 Goldmünzen`
   )}. Kauf dir damit was Warmes, ehe du noch erfrierst, ja?
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
   `,

    // SCENE - 11 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        1. Nach dem aktuellen Datum fragen.
        `,

        // INITIATES: SCENE - 12
        nextText: 12,
      },

      // OPTION - 02
      {
        text: `        2. Die Person angreifen: Her mit deinem Geldbeutel, du dreckiger Geizkragen!
        `,

        // INITIATES: FIGHT
        nextText: 9999,
      },
    ],
  },
  // SCENE - 12 - PERSON: ERSTES TREFFEN III
  {
    id: 12,
    text: `
   Sie schaut dich kurz verwirrt an, dann schüttelt sie lächelnd den Kopf, wirft einen flüchtigen Blick
   auf ihre futuristisch aussehende Armbanduhr und widmet sich dir wieder zu:

   Es ist ${clc.blueBright(date)}, beep, boop.

   Der Pfosten hat doch gerade Robotergeräusche von sich gegeben, oder?!
   Und was war das bitte für eine Art dir das Datum zu nennen?!
   
   Deine maximale Verwirrung lässt du dir mit einem nervösen Nicken, nicht anmerken.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
   `,

    // SCENE - 12 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        1. Ihr danken und dich von ihr abwenden. Du vernimmst ein transzendentes Flüstern: Bete mich an und ich helfe dir...
          `,

        // INITIATES: SCENE - 13
        nextText: 13,
      },

      // OPTION - 02
      {
        text: `        2. Die Person beleidigen: Meine Faust schickt dich gleich in's vergangene Jahrhundert, du Blechbirne!`,

        // INITIATES: FIGHT
        nextText: 9999,
      },
    ],
  },
  // SCENE - 13 - ENGEL
  {
    id: 13,
    text: `
   Du kniest dich in der Kälte auf die Straße und fängst an zu beten. Wen auch immer
   du versuchst zu erreichen, angesichts deiner Lage, würdest du jeden Gott nehmen.
   Deine Hände zitternd zusammengefaltet, deine Arme schräg gen Luft gestreckt.
   Deine Augen versunken vor Verzweiflung.

   Für einen Moment passiert nichts.
  
   Dann trifft dich ein gleißendes Licht. Eine sonnenhelle Gestalt schwebt zu dir herab,
   legt dir sanft die Hand auf die Schulter und erinnert dich daran, dass du den
   ${clc.yellowBright(`Zettel mit der Adresse`)} in der Tasche hast.\n
   Eine Fügung Gottes? Wer weiß, aber immerhin hast du jetzt einen Anhaltspunkt.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)},
   `,

    // SCENE - 11 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        1. Zur Person von vorhin zurück gehen.
          `,

        // INITIATES: SCENE - 15
        nextText: 15,
      },

      //  OPTION - 02
      {
        text: `        2. Zum Kutscher gehen.
          `,

        // INITIATES: SCENE - 14
        nextText: 14,
      },

      //  OPTION - 03
      {
        text: `        3. Zurück in die Taverne gehen. Du brauchst jetzt Alkohol. Ganz viel Alkohol!
          `,

        // INITIATES: PRE-DEATH - 16
        nextText: 16,
      },
    ],
  },
  // SCENE - 14 - KUTSCHER: NACH ENGEL I
  {
    id: 14,
    text: `
   Du gehst auf den Kutscher zu, der dich herablassend anschaut. Kein Wunder, nach deiner
   aufmerksamkeiterregenden Aktion vorhin, würde dich selbst deine eigene Mutter herablassend anschauen.
   Eine schöne Dame sitzt bereits in der Kutsche. Ihr Anlitz liebkost deine Äuglein, du Perversling.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // SCENE - 14 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
        1. Dem Kutscher sagen, dass du zu der Adresse auf dem Zettel willst.
          `,

        // INITIATES: SCENE - 17
        nextText: 17,
      },

      //  OPTION - 02
      {
        text: `        
        2. Deine Meinung ändern und doch lieber zur untergesetzten Person von eben gehen.
          `,

        // INITIATES: SCENE - 15
        nextText: 15,
      },

      //  OPTION - 03
      {
        text: `        
        3. Sagen, dass du in die gleiche Richtung, wie die schöne Dame fährst. (Du Perversling.)
          `,

        // INITIATES: PRE-DEATH - 20
        nextText: 20,
      },
    ],
  },
  // SCENE 15 - PERSON: NACH ENGEL I
  {
    id: 15,
    text: `
   Die Person von eben steht nach wie vor am selben Ort und drückt gerade eine Zigarette aus, als du bei ihr ankommst.
   Almosen hab ich keine mehr, falls du nach Geld fragen willst. Sagt sie dir im ruhigen Ton.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
   `,

    // SCENE - 15 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
        1. Der untergesetzten Person nuschelnd die Adresse auf dem Zettel zeigen.
            `,

        // INITIATES: SCENE - 18
        nextText: 18,
      },

      //  OPTION - 02
      {
        text: `
        2. Doch lieber zurück zum Kutscher gehen.
            `,

        // INITIATES: SCENE - 14
        nextText: 14,
      },
    ],
  },
  // SCENE - 16 - PRE-DEATH: TAVERNE NACH ENGEL
  {
    id: 16,
    text: `
   Kreidebleich stürzt du dich in die Taverne zurück. Was auch immer eben passiert ist, du willst nichts davon wahrhaben.
   Du drückst die Menschen zur Seite und bahnst dir eine Schneise bis zum Tresen durch. Der Wirt hat dich längst gesehen
   und wirft dir ein schiefes Grinsen zu. 'Was darf's sein Bursche?', fragt er dich höhnisch.
   
   'Das stärkste Zeug, was du hast alter Mann!', zischst du zurück. Es scheint als hättest du dich für ein
   One-Way Ticket entschieden.
   `,

    // SCENE - 16 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: clc.redBright(`     
        Der Wirt schnauft und stellt dir eine gewaltige Flasche puren Spiritus hin. Determiniert greifst du nach der Flasche und trinkst diese
        auf der Stelle aus. Das unerträgliche Brennen des Alkohols im Rachen interessiert dich genauso wenig, wie der Preis für so eine große Flasche.
        
        Du grinst den Wirt, der dich nun fassungslos anstarrt, dumm an, hebst den Mittelfinger hoch und streckst sie ihm entgegen, während dein
        Bewusstsein sich von dir verabschiedet.
        
        Bezahlen wirst du nichts mehr.
        `),

        // INITIATES: DEATH
        nextText: 99,
      },
    ],
  },
  // SCENE - 17 - KUTSCHER: NACH ENGEL II
  {
    id: 17,
    text: `
   Der Kutscher schaut sich den Zettel mit Bedacht an. Das ist machbar, sagt er, jedoch kostet Sie eine Fahrt
   innerhalb der Stadt immernoch ${clc.yellowBright(
     `10 Goldmünzen`
   )}, mein Herr.
 \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // SCENE - 17 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
      1. Deine ${clc.yellowBright(
        `Goldmünzen`
      )} reichen vorne und hinten nicht. Du hast ${
          char.inventory[1].content
        }. Zeig den Zettel lieber der Person von eben. 
        `,

        // INITIATES: SCENE - 18
        nextText: 18,
      },

      //  OPTION - 02
      {
        text: `        
      2. Die Dame in der Kutsche anflirten. (War ja klar du Perversling.)
        `,

        // INITIATES: PRE-DEATH - 20
        nextText: 20,
      },

      // Option -03
      {
        text: `        
      3. Ihm von deinen ${char.inventory[1].content} Goldstücken lässig zehn in den Schoß werfen und dich wortlos in die Kutsche setzen. 
        `,

        // leads to bäckerei
        nextText: 21,
      },
    ],
  },
  // SCENE 18 - PERSON: NACH ENGEL II
  {
    id: 18,
    text: `
   Die Person von eben steht nach wie vor am selben Ort und drückt gerade eine Zigarette aus, als du bei ihr ankommst.
   Almosen hab ich keine mehr, falls du nach Geld fragen willst. Sagt sie dir im ruhigen Ton.
\n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
`,

    // SCENE - 18 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
        1. Der untergesetzten Person nuschelnd die Adresse auf dem Zettel zeigen.
        `,

        // INITIATES: SCENE - 19
        nextText: 19,
      },

      //  OPTION - 02
      {
        text: `
        2. Doch lieber zurück zum Kutscher gehen.
        `,

        // INITIATES: SCENE - 14
        nextText: 14,
      },
    ],
  },
  // SCENE 19 - PERSON: NACH ENGEL III
  {
    id: 19,
    text: `
   Du holst den zerknüllten Zettel aus deiner Hosentasche und hältst ihn vor das Gesicht deines Gegenübers.
   Da will ich hin, bringst du noch hervor, Weißt du wo das ist?

   Die Person nimmt dir den Zettel aus der Hand und liest ihn vorsichtig durch. Ihre Augen leuchten auf.
   Sie gibt dir den Zettel zurück und sagt:
    
       'Das ist keine fünf Minuten von hier, du erkennst es an einer Bäckerei im Erdgeschoss.'

   Danach beschreibt sie dir, wo du lang musst.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
`,

    // SCENE - 19 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
        1. Den Anweisungen der Person folgen und dich auf den Weg zur Bäckerei machen.
        `,

        // INITIATES: SCENE - 21
        nextText: 21,
      },

      //  OPTION - 02
      {
        text: `
        2. Doch lieber zurück zum Kutscher gehen. (Kann da einer etwa die hübsche Dame nicht vergessen?)
        `,

        // INITIATES: SCENE - 14
        nextText: 14,
      },
    ],
  },
  // SCENE - 20 - PRE-DEATH: DAME IN DER KUTSCHE
  {
    id: 20,
    text: `
   Du torkelst zur Kutsche und lehnst dich an: Na du süße Maus, darf man dir Gesellschaft leisten?
   Fragst du sie und wirfst ihr einen, in deiner Sicht, heißen, einladenden Blick zu.
   
   Danach versuchst du Strolch dich zu ihr in die Kutsche zu setzen.

   Sie, jedoch findet deinen Blick alles andere als "einladend", und dass du unaufgefordert die Kutsche
   betreten willst, findet der Kutscher genauso wenig amüsant.
   `,

    // SCENE - 20 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: clc.redBright(`     
        ${clc.red("BANG !!")}

        Ein lauter Knall lässt dir fast das Trommelfell platzen. Verwirrt schaust du zum Kutscher. Er sitzt immernoch in der Kutsche.
        Plötzlich geben deine Beine nach, ein stechender Schmerz in deiner Brust macht sich bemerkbar. Dein Blick schießt wieder zur
        Dame zurück und da dämmert's dir. Erschossen hat sie dich.

        Den funkelnden Pistolenlauf erkennst du noch, da schwindet dir bereits das Bewusstsein.
        "Widerlicher Mistkerl.", hörst du sie noch spotten, dann brichst du zusammen.

        Deine Lichter gehen aus und die Welt ist einen Perversling leichter.
        Was hast du hoffnungsloser Jammerlappen auch erwartet?
        `),

        // INITIATES: DEATH
        nextText: 99,
      },
    ],
  },
  // SCENE 21 - BÄCKEREI I
  {
    id: 21,
    text: `
   Du betrittst die Bäckerei. Sie befindet sich an einer Seitenstraße, die zu heruntergekommenen Wohnblocks führt.
   Viel ist in der Bäckerei nicht los. Am hintersten Tisch gönnt sich jemand eine heiße Tasse Kaffee. Links von dir
   vernascht einer gleich drei Bienenstiche aufeinmal. 'Oha, was ein geskillter Dude', denkst du dir noch, da
   begrüßt dich auch schon die Bedienung:

        'Na? Schon wieder zu viel gesoffen, was?' 
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
`,

    // SCENE - 21 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
        1. Woher kennt dich die Trulla?! Frage sie, was sie über dich weiß.
        `,

        // INITIATES: SCENE - 22
        nextText: 22,
      },

      //  OPTION - 02
      {
        text: `
        2. Verlasse sofort die Bäckerei, das wird dir alles zu viel!
        `,

        // INITIATES: PRE-DEATH - 07
        nextText: 7,
      },

      //  OPTION - 03
      {
        text: `
        3. 'Wohl nicht genug, du bist immernoch hässlich!', eschauffierst du dich
            und begibst dich schnurstracks zur Taverne zurück.
        `,

        // INITIATES: PRE-DEATH - 16
        nextText: 16,
      },
    ],
  },
  // SCENE - 22 - BÄCKEREI II
  {
    id: 22,
    text: `
   Sie überreicht dir einen ${clc.greenBright(
     "Schlüsselbund"
   )}, danach erklärt sie dir, dass du gleich über der Bäckerei wohnst und ihr
   jedes Wochenende deine Schlüssel anvertraust, bevor du in die Taverne nebenan gehst. Sie hält dir eine deftige
   Standpauke, und da dämmert's dir so langsam, langsam.

   Du beziehst nämlich seit Jahren schon eine kleine Wohnung im Obergeschoss dieser Bäckerei.
   Und sie begrüßt du jeden Morgen, wenn du dich auf den Weg zur Arbeit machst.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
   `,

    // SCENE - 22 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
        1. Alles dreht sich, du hast Kreislauf! Flüchte nach draußen an die kalte, frische Luft!!
        `,

        // INITIATES: PRE-DEATH - 07
        nextText: 07,
      },

      //  OPTION - 02
      {
        text: `
        2. Nichts macht mehr Sinn! Du verlässt die Bäckerei und rennst zur Taverne zurück.
        `,

        // INITIATES: PRE-DEATH - 16
        nextText: 16,
      },

      // OPTION - 03
      {
        text: `
        3. Danke ihr herzlichst und eile zur Treppe hinter'm Tresen, die hoch zu deine Wohnung führt. 
        `,

        // INITIATES: SCENE - 23
        nextText: 23,
      },
    ],
  },
  // SCENE - 23 - WOHNUNG
  {
    id: 23,
    text: `
   Du betrittst deine Wohnung. Ein fauler Gestank beißt sich an deiner Nase fest. Es haut dich fast um, so schwül
   und dick ist die abgestandene Luft. Es ist zu dunkel, du kannst nichts sehen.
   
   Gerade willst du eine Kerze anzünden, da springt dich etwas aus der Dunkelheit heraus an!
   \n${clc.magentaBright(`   Eine enorme Präsenz erscheint vor dir!`)}
   `,

    // SCENE - 23 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
        1. Reiß' deine Arme hoch und stürz' dich in den Kampf! 
        `,

        // INITIATES: BOSS FIGHT
        nextText: 10003,
      },
    ],
  },
  // SCENE - 99 - DEATH
  // EMPTY TEXT AND EMPTY OPTION TO AVOID "UNDEFINED" RETURNS
  // GAME SHOULD REBOOT WHENEVER THIS SCENE IS READ
  {
    id: 99,
    text: ``,
    options: [{ text: `` }],
  },
  // Node 9999 FIGHT SCENE Enemy 1
  {
    id: 9999,
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
        nextText: 14,
      },
      {
        text: "\n2. Dem Straßenverlauf folgen und die Adresse suchen.\n",
        nextText: 21, // Bäckerei Node einfügen
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
  },
];

/////////// Functions for the game

/**  Function that enables user to put in their own charactername.*/
function characterCreation() {
  console.clear();
  let fighterName = readlineSync.question(`  Wie heißt du?    `);
  char.name = fighterName;
  console.log(fighterName);
  console.log(char.name);
}
/**starts the game */

/**runs the story line and makes it interactive */
function showTextNode(textNodeIndex) {
  console.log(textNodeIndex);
  //random event
  random(textNodeIndex);

  // FINDS A SCENE BY ID AND LOGS ITS TEXT FIRST
  textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);

  // ENHANCES VISUAL CLARITY WITH COLOR VARIETY
  // TURNS START SCREEN YELLOW AND OTHER SCENES CYAN
  if (textNodeIndex == 0) console.log(clc.yellow(textNode.text));
  else console.log(clc.cyan(textNode.text));

  // MAPS THROUGH OPTIONS OF A SCENE AND LOGS THEM SECOND
  textNode.options.map((option) => console.log(clc.whiteBright(option.text)));

  if (textNodeIndex == 11) {
    char.inventory.forEach((obj) => {
      if (obj.nameInv == "Gold") {
        return (obj.content += 2);
      } else {
        return obj;
      }
    });
  }
  // CHECKS FOR BAD CHOICE AND SENDS PLAYER TO DEATH SCENE
  // A BAD CHOICE IS ANY OPTION WITH NEXTTEXT 10
  if (textNode.options[0].nextText === 99) {
    console.log(
      clc.red(
        "\n\n                --x----x----x----x----x----x----x----x----x----x-- \n                        ~~> GAME OVER, MAN! GAME OVER! <~~\n                --x----x----x----x----x----x----x----x----x----x--\n\n\n"
      )
    );

    // REBOOTS GAME AFTER PLAYER MADE BAD CHOICE
    reboot();
  }
  /** initiates fight agains napoleon dynamite */
  if (textNode.options[0].nextText === 666) {
    let y = fight(enemyOne);
    if (y) {
      char.life = 100;
      showTextNode(10001);
    } else {
      reboot();
    }
  }
  /** initiates bossfight */
  if (textNode.options[0].nextText === 667) {
    let x = fightBoss(boss);
    if (x) {
      showTextNode(10004);
    } else {
      reboot();
    }
  }

  /**leads to end screen after victory */
  if (textNode.options[0].nextText === 1337) {
    readlineSync.question("Taste drücken um fortzufahren");
    victory();
    char.printCertificate();
    readlineSync.question("Taste drücken um fortzufahren");
    reboot();
  }
  // ASKS PLAYER TO CHOOSE FROM MAX 4 OPTIONS
  let answer = readlineSync.question();

  // VARIABLE STORING OPTION LENGTHS
  let optionsLength = textNode.options.length;

  // ALLOWS ANY KEY INPUT TO START THE GAME
  let nextText = 1;
  if (textNodeIndex == 0) {
    showTextNode(nextText);
  } else {
    // CHECKS FOR CORRECT PLAYER INPUT:
    // REPLAYS CURRENT SCENE UPON FAULTY INPUT
    if (
      (isNaN(answer) || answer > optionsLength || answer <= 0) &&
      answer !== "inventar"
    ) {
      console.log(
        clc.red(`\n\n\n                --x----x----x----x----x----x----x----x----x----x-- \n 
      ~~> Faulty Input,  Try Again!! <~~\n
      ~~> Enter One Of The Present Numbers <~~\n 
      ~~> Only Numeric Input Allowed <~~\n
      --x----x----x----x----x----x----x----x----x----x--\n\n\n`)
      );
      showTextNode(textNodeIndex);
    } else if (answer === "inventar") {
      /** prints inventory upon request */
      char.printInventory();
      showTextNode(textNodeIndex);
    } else {
      // INITIATES NEXT SCENE UPON CORRECT INPUT
      nextText = textNode.options[answer - 1].nextText;

      // CLEARS CURRENT SCENE OFF THE WINDOW AFTER INPUT
      console.clear();
      showTextNode(nextText);
    }
  }
}

/** restarts the game after gameOver */
function reboot() {
  let reboot = readlineSync.question(
    `\n-------------- Spiel erneut starten? (y = ja, n = nein) ------------------\n`
  );
  if (reboot == "y") {
    console.clear();
    reset();
    startGame();
  } else {
    console.clear();
    console.log("Tschüssikowski!");
    exit();
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
  boss.life = 200;
}

const victory = () =>
  player.play("assets/Short_triumphal_fanfare-John_Stracke-815794903.mp3");

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
  let belohnungsPacket = [10, 20, 25, 30];
  let stufe = Math.floor(Math.random() * 4);
  let bonus = belohnungsPacket[stufe];
  char.inventory.forEach((obj) => {
    if (obj.nameInv == "Gold") {
      return (obj.content += bonus);
    } else {
      return obj;
    }
  });
  console.log(`Du hast ${bonus} Goldstücke bei deinem Gegner gefunden!`);
}

/** Random encounter between scenes */
function random(textNodeIndex) {
  let randomize = Math.floor(Math.random() * 100);
  if (randomize <= 10 && textNodeIndex > 5) {
    console.clear();
    char.life -= 3;
    console.log(`Jemand wirft einen Blumentopf nach dir. Du verlierst 
    3 Lebenspunkte`);
    readlineSync.question("Taste drücken um fortzufahren");
  } else {
    return ``;
  }
}

startGame();
