var readlineSync = require("readline-sync");
const { exit } = require("process");
// run "npm install cli-color" beforehand!
let clc = require("cli-color");

// run "npm install play-sound" if you want to add sounds.
let player = require("play-sound")((opts = {}));
// player.play("./assets/ManyPunches-SoundBiblecom-1623072177.mp3");

// plays this sound once, at the start of the game
const beginn = () => player.play("assets/Movie_Start_Music-KP-241927993.mp3");

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
      `Du hast: \n ${this.inventory[0].nameInv} mit ${this.inventory[0].content}\n ${this.inventory[1].content} Stück ${this.inventory[1].nameInv}`
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
};

// congratulatory message after player completes the game
Character.prototype.printCertificate = function () {
  // prototype of character class
  console.log(`
  \n    ::::::::::::::::::::::::::::::::::::::::::::::::\n    ::::::::::::::::::::::::::::::::::::::::::::::::\n    :::::::::::      Glückwunsch! Du     :::::::::::\n    :::::::::::: hast dieses Abenteuer :::::::::::::\n    :::::::::::::::  ~~~~~ von ~~~  ::::::::::::::::\n    :::::::::::::::::   DRUNK GUY  :::::::::::::::::\n    ::::::::::::::::::     BOB    ::::::::::::::::::\n    ::::::::::::::::::  erledigt! ::::::::::::::::::\n    ::::::::::::::::::::::::::::::::::::::::::::::::\n    ::::::::::::::::::::::::::::::::::::::::::::::::`);
};

// default character
const char = new Character(
  readlineSync.question(`  Wie ist dein Name? (Max. 10 Buchstaben)    `)
);

// starts the game
function startGame() {
  beginn();
  showTextNode(0);
};

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

        // initiates: scene - 05
        nextText: 5,
      },

      //  option - 02
      {
        text: "\n        2. Lehne sein Angebot dankend ab. Du hast dein eigenes Glas Wasser, vom Tisch an dem du eben noch warst, dabei. \n",

        // initiates: pre-death - 02
        nextText: 2,
      },

      //  option - 03
      {
        text: "\n        3. Greife nach seinem Kragen und ziehe ihn zu dir herunter:\n           Hör' zu Arschloch! Nochmal falle ich auf deine KO-Drinks nicht herein! \n",

        // initiates: pre-death - 06
        nextText: 6,
      },

      //  option - 04
      {
        text: "\n        4. Schau ihn leicht genervt an, dann den Krug. Wer weiß, was dir dieser Mann andrehen will.\n           Lehne sein Angebot dankend an und verlasse die Taverne. \n",

        // initiates: scene - 05
        nextText: 5,
      },
    ],
  },

  // scene - 05 - draussen
  {
    id: 5,
    text: `\n   Du verlässt die Taverne und stehst auf einer offenen Straße. Es ist kalt. Saukalt. Die Art von alles\n   durchdringender Kälte, die selbst dein bestes Stück, wie einen verschrumpelten Pickel aussehen lässt.\n   Oder sah der schon vorher so aus? Hey, hey. Sorry. Ich bin zu weit gegangen, sei nicht traurig.\n   Auf die Größe kommt es schließlich nicht an, oder irgendwie sowas.\n\n   Eine Kutsche steht keine zehn Meter von dir entfernt und eine untersetzte Person auf dem\n   gegenüberliegenden Bordstein, die dich unverhohlen anstarrt.
  \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // scene - 05 - options
    options: [
      //  option - 01
      {
        text: "\n        1. Dich der Person zuwenden, die dich seltsam beäugelt und sie ansprechen.\n",

        // initiates: scene - 10
        nextText: 10,
      },

      //  option - 02
      {
        text: "\n        2. Den Kutscher ansprechen. Es ist verdammt kalt und du willst schleunigst nach Haus!\n",

        // initiates: scene - 08
        nextText: 8,
      },

      //  option - 03
      {
        text: "\n        3. Umfallen. Liegen bleiben. Scheißtag.\n",

        // initiates: pre-death - 07
        nextText: 7,
      },

      //  option - 04
      {
        text: "\n        4. Gott anbeten!\n",

        // initiates: scene - 13
        nextText: 13,
      },
    ],
  },

  // scene - 06 - pre-death: wirt
  {
    id: 6,
    text: `\n   Mit einer Hand haut der Wirt laut auf den Tresen und mit der anderen greift er nach deiner Babyhand.\n   Spielen willst du, ja? Flüstert er dir berdrohlich zu, sich über dich beugend. Jetzt erst bemerkst du,\n   wie gewaltig groß der Wirt ist, deine Hand ist gar komplett in seiner Bärenpranse verschwunden.\n   Du stammelst unverständliches Zeug, ehe deine wirren Gedanken von einem stechenden Schmerz in deiner\n   Hand unterbrochen werden.`,

    // scene - 06 - options
    options: [
      //  option - 01
      {
        text: clc.redBright(`\n        Du schaust auf deine Hand. Deine Finger zeigen in unterschiedliche Richtungen. Du kannst dich\n        nicht erinnern, dass sie sich jemals hätten so drehen können. Der Wirt hat dir wohl einhändig\n        deine gesamte Hand zertrümmert. Viel Zeit mit den Schmerzen bleibt dir nicht, denn als nächstes\n        siehst du aus dem Augenwinkel eine gewaltige Faust, gleich einem allesvernichtenden Meteors,\n        auf dein Gesicht herunterdonnern.\n\n        Poof, dir gehen die Lichter aus. Was hast du Wicht dir nur dabei gedacht?
        `),

        // initiates: death
        nextText: 99,
      },
    ],
  },

  // scene - 07 - pre-death: kälte
  {
    id: 7,
    text: `
   Du rutschst auf einer gefrorenen Pfütze aus und landest flach auf dem Boden.
   Du willst dich gerade hochraffen, da hälst du kurz still, denkst nach und nickst
   dir selbst zu. Es scheint, als hättest du deine Entscheidung getroffen. Du bleibst liegen.`,

    // scene - 07 - options
    options: [
      //  option - 01
      {
        text: clc.redBright(`        
        
        Die Kälte nimmt sich deiner sofort an. Sie siecht in deine Gliedmaßen ein, kriecht dein Torso
        hoch und legt sich sanft über deine Brust. Ihr eisiger Griff jedoch, umklammert dein Herz.
        Sie raubt dir den Schmerz, du fühlst nichts mehr, leise flüstert sie dich in den Schlaf.

        Auch wenn sie grässlich klingt, so ist sie doch ein gnadenvoller Tod. Zufrieden schläfst
        du ein, dein Gesicht bleich und blau. Aufwachen wirst du sicherlich nicht mehr.
        `),

        // initiates: death
        nextText: 99,
      },
    ],
  },

  // scene - 08 - kutscher: erstes treffen I
  {
    id: 8,
    text: `
   Der Kutscher schaut dich besorgt an. Ist Ihnen nicht kalt? Sie haben nicht einmal eine Jacke an.
   Soll ich Sie irgendwohin fahren?
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // scene - 08 - options
    options: [
      //  option - 01
      {
        text: `        
        1. Ihm sagen, dass du keine Ahnung hast, wie du hier gelandet bist und nach Hause willst.
        `,

        // initiates: scene - 09
        nextText: 9,
      },

      //  option - 02
      {
        text: `
        2. Dich wieder von ihm abwenden. Die Person, die dich anstarrt ist doch interessanter.
        `,

        // initiates: scene - 10
        nextText: 10,
      },

      //  option - 03
      {
        text: `
        3. Eine transzendente Stimme flüstert dir zu. Dir wird ganz warm in der Brust.
        `,

        // initiates: scene - 13
        nextText: 13,
      },
    ],
  },

  // scene - 09 - kutscher: erstes treffen II
  {
    id: 9,
    text: `
   Hahaha, wollen wir das nicht alle? Lacht er dir zu und ergänzt: Ich kann Sie gerne nach Hause
   fahren. Eine Fahrt innerhalb der Stadt, würde Sie ${clc.yellowBright(
     `10 Goldmünzen`
   )} kosten.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // scene - 09 - options
    options: [
      //  option - 01
      {
        text: `        
        1. ${clc.yellowBright(
          `10 Goldmünzen`
        )}?! Sieht dieser Mann nicht, wie elend es dir geht? Du schnellst nach vorne um nach seiner Jacke zu greifen, fast blind vor Wut.
        `,

        // initiates: pre-death - 07
        nextText: 7,
      },

      //  option - 02
      {
        text: `        
        2. Den Kopf schütteln und sein Angebot ablehnen. Geld hast du keins. Vielleicht kann dir die untergesetzte Person weiterhelfen?
           Schließlich starrt sie dich schon die ganze Zeit an.
        `,

        // initiates: scene - 10
        nextText: 10,
      },

      //  option - 03
      {
        text: `
        3. Eine transzendente Stimme flüstert dir zu. Die Stimme ist überwältigend...
        `,

        // initiates: scene - 13
        nextText: 13,
      },
    ],
  },

  // scene - 10 - person: erstes treffen I
  {
    id: 10,
    text: `
   Leicht taumelnd, gehst du auf die Person zu. Sie mustert dich mit ihren Augen von oben bis unten ab.
   Als du sie erreichst, raunt sie dir entgegen: Ich habe Leichen gesehen, die lebendiger aussehen als du.
   Brauchst du Hilfe?
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
   `,

    // scene - 10 - options
    options: [
      //  option - 01
      {
        text: `        1. Nach Geld fragen.
        `,

        // initiates: scene - 11
        nextText: 11,
      },

      //  option - 02
      {
        text: `        2. Nach dem aktuellen Datum fragen.
        `,

        // initiates: scene - 12
        nextText: 12,
      },

      // option - 03
      {
        text: `        3. Die Person beleidigen: Deine Hässlichkeit brennt mir die Augen aus meinem Schädel!`,

        // initiates: FIGHT
        nextText: 9999,
      },
    ],
  },

  // scene - 11 - person: erstes treffen II
  {
    id: 11,
    text: `
   Die Person schaut dich bemitleidenswert an. Du siehst auch so aus als bräuchtest du Geld, mein Lieber.
   Hier hast du ${clc.yellowBright(
     `2 Goldmünzen`
   )}. Kauf dir damit was Warmes, ehe du noch erfrierst, ja?
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
   `,

    // scene - 11 - options
    options: [
      //  option - 01
      {
        text: `        1. Nach dem aktuellen Datum fragen.
        `,

        // initiates: scene - 12
        nextText: 12,
      },

      // option - 02
      {
        text: `        2. Die Person angreifen: Her mit deinem Geldbeutel, du dreckiger Geizkragen!
        `,

        // initiates: FIGHT
        nextText: 9999,
      },
    ],
  },

  // scene - 12 - person: erstes treffen III
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

    // scene - 12 - options
    options: [
      //  option - 01
      {
        text: `        1. Ihr danken und dich von ihr abwenden. Du vernimmst ein transzendentes Flüstern: Bete mich an und ich helfe dir...
          `,

        // initiates: scene - 13
        nextText: 13,
      },

      // option - 02
      {
        text: `        2. Die Person beleidigen: Meine Faust schickt dich gleich in's vergangene Jahrhundert, du Blechbirne!`,

        // initiates: fight
        nextText: 9999,
      },
    ],
  },

  // scene - 13 - engel
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

    // scene - 11 - options
    options: [
      //  option - 01
      {
        text: `        1. Zur Person von vorhin zurück gehen.
          `,

        // initiates: scene - 15
        nextText: 15,
      },

      //  option - 02
      {
        text: `        2. Zum Kutscher gehen.
          `,

        // initiates: scene - 14
        nextText: 14,
      },

      //  option - 03
      {
        text: `        3. Zurück in die Taverne gehen. Du brauchst jetzt Alkohol. Ganz viel Alkohol!
          `,

        // initiates: pre-death - 16
        nextText: 16,
      },
    ],
  },

  // scene - 14 - kutscher: nach engel I
  {
    id: 14,
    text: `
   Du gehst auf den Kutscher zu, der dich herablassend anschaut. Kein Wunder, nach deiner
   aufmerksamkeiterregenden Aktion vorhin, würde dich selbst deine eigene Mutter herablassend anschauen.
   Eine schöne Dame sitzt bereits in der Kutsche. Ihr Anlitz liebkost deine Äuglein, du Perversling.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // scene - 14 - options
    options: [
      //  option - 01
      {
        text: `        
        1. Dem Kutscher sagen, dass du zu der Adresse auf dem Zettel willst.
          `,

        // initiates: scene - 17
        nextText: 17,
      },

      //  option - 02
      {
        text: `        
        2. Deine Meinung ändern und doch lieber zur untergesetzten Person von eben gehen.
          `,

        // initiates: scene - 15
        nextText: 15,
      },

      //  option - 03
      {
        text: `        
        3. Sagen, dass du in die gleiche Richtung, wie die schöne Dame fährst. (Du Perversling.)
          `,

        // initiates: pre-death - 20
        nextText: 20,
      },
    ],
  },

  // scene 15 - person: nach engel I
  {
    id: 15,
    text: `
   Die Person von eben steht nach wie vor am selben Ort und drückt gerade eine Zigarette aus, als du bei ihr ankommst.
   Almosen hab ich keine mehr, falls du nach Geld fragen willst. Sagt sie dir im ruhigen Ton.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
   `,

    // scene - 15 - options
    options: [
      //  option - 01
      {
        text: `        
        1. Der untergesetzten Person nuschelnd die Adresse auf dem Zettel zeigen.
            `,

        // initiates: scene - 18
        nextText: 18,
      },

      //  option - 02
      {
        text: `
        2. Doch lieber zurück zum Kutscher gehen.
            `,

        // initiates: scene - 14
        nextText: 14,
      },
    ],
  },

  // scene - 16 - pre-death: taverne nach engel
  {
    id: 16,
    text: `
   Kreidebleich stürzt du dich in die Taverne zurück. Was auch immer eben passiert ist, du willst nichts davon wahrhaben.
   Du drückst die Menschen zur Seite und bahnst dir eine Schneise bis zum Tresen durch. Der Wirt hat dich längst gesehen
   und wirft dir ein schiefes Grinsen zu. 'Was darf's sein Bursche?', fragt er dich höhnisch.
   
   'Das stärkste Zeug, was du hast alter Mann!', zischst du zurück. Es scheint als hättest du dich für ein
   One-Way Ticket entschieden.
   `,

    // scene - 16 - options
    options: [
      //  option - 01
      {
        text: clc.redBright(`     
        Der Wirt schnauft und stellt dir eine gewaltige Flasche puren Spiritus hin. Determiniert greifst du nach der Flasche und trinkst diese
        auf der Stelle aus. Das unerträgliche Brennen des Alkohols im Rachen interessiert dich genauso wenig, wie der Preis für so eine große Flasche.
        
        Du grinst den Wirt, der dich nun fassungslos anstarrt, dumm an, hebst den Mittelfinger hoch und streckst sie ihm entgegen, während dein
        Bewusstsein sich von dir verabschiedet.
        
        Bezahlen wirst du nichts mehr.
        `),

        // initiates: death
        nextText: 99,
      },
    ],
  },

  // scene - 17 - kutscher: nach engel II
  {
    id: 17,
    text: `
   Der Kutscher schaut sich den Zettel mit Bedacht an. Das ist machbar, sagt er, jedoch kostet Sie eine Fahrt
   innerhalb der Stadt immernoch ${clc.yellowBright(
     `10 Goldmünzen`
   )}, mein Herr.
 \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // scene - 17 - options
    options: [
      //  option - 01
      {
        text: `        
      1. Deine ${clc.yellowBright(
        `Goldmünzen`
      )} reichen vorne und hinten nicht. Du hast ${
          char.inventory[1].content
        }. Zeig den Zettel lieber der Person von eben. 
        `,

        // initiates: scene - 18
        nextText: 18,
      },

      //  option - 02
      {
        text: `        
      2. Die Dame in der Kutsche anflirten. (War ja klar du Perversling.)
        `,

        // initiates: pre-death - 20
        nextText: 20,
      },

      // option - 03
      {
        text: `        
      3. Ihm von deinen ${char.inventory[1].content} Goldstücken lässig zehn in den Schoß werfen und dich wortlos in die Kutsche setzen. 
        `,

        // leads to bäckerei
        nextText: 21,
      },
    ],
  },

  // scene 18 - person: nach engel II
  {
    id: 18,
    text: `
   Die Person von eben steht nach wie vor am selben Ort und drückt gerade eine Zigarette aus, als du bei ihr ankommst.
   Almosen hab ich keine mehr, falls du nach Geld fragen willst. Sagt sie dir im ruhigen Ton.
\n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
`,

    // scene - 18 - options
    options: [
      //  option - 01
      {
        text: `        
        1. Der untergesetzten Person nuschelnd die Adresse auf dem Zettel zeigen.
        `,

        // initiates: scene - 19
        nextText: 19,
      },

      //  option - 02
      {
        text: `
        2. Doch lieber zurück zum Kutscher gehen.
        `,

        // initiates: scene - 14
        nextText: 14,
      },
    ],
  },

  // scene 19 - person: nach engel III
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

    // scene - 19 - options
    options: [
      //  option - 01
      {
        text: `        
        1. Den Anweisungen der Person folgen und dich auf den Weg zur Bäckerei machen.
        `,

        // initiates: scene - 21
        nextText: 21,
      },

      //  option - 02
      {
        text: `
        2. Doch lieber zurück zum Kutscher gehen. (Kann da einer etwa die hübsche Dame nicht vergessen?)
        `,

        // initiates: scene - 14
        nextText: 14,
      },
    ],
  },

  // scene - 20 - pre-death: dame in der kutsche
  {
    id: 20,
    text: `
   Du torkelst zur Kutsche und lehnst dich an: Na du süße Maus, darf man dir Gesellschaft leisten?
   Fragst du sie und wirfst ihr einen, in deiner Sicht, heißen, einladenden Blick zu.
   
   Danach versuchst du Strolch dich zu ihr in die Kutsche zu setzen.

   Sie, jedoch findet deinen Blick alles andere als "einladend", und dass du unaufgefordert die Kutsche
   betreten willst, findet der Kutscher genauso wenig amüsant.
   `,

    // scene - 20 - options
    options: [
      //  option - 01
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

        // initiates: death
        nextText: 99,
      },
    ],
  },

  // scene 21 - bäckerei I
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

    // scene - 21 - options
    options: [
      //  option - 01
      {
        text: `        
        1. Woher kennt dich die Trulla?! Frage sie, was sie über dich weiß.
        `,

        // initiates: scene - 22
        nextText: 22,
      },

      //  option - 02
      {
        text: `
        2. Verlasse sofort die Bäckerei, das wird dir alles zu viel!
        `,

        // initiates: pre-death - 07
        nextText: 7,
      },

      //  option - 03
      {
        text: `
        3. 'Wohl nicht genug, du bist immernoch hässlich!', eschauffierst du dich
            und begibst dich schnurstracks zur Taverne zurück.
        `,

        // initiates: pre-death - 16
        nextText: 16,
      },
    ],
  },

  // scene - 22 - bäckerei II
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

    // scene - 22 - options
    options: [
      //  option - 01
      {
        text: `        
        1. Alles dreht sich, du hast Kreislauf! Flüchte nach draußen an die kalte, frische Luft!!
        `,

        // initiates: pre-death - 07
        nextText: 07,
      },

      //  option - 02
      {
        text: `
        2. Nichts macht mehr Sinn! Du verlässt die Bäckerei und rennst zur Taverne zurück.
        `,

        // initiates: pre-death - 16
        nextText: 16,
      },

      // option - 03
      {
        text: `
        3. Danke ihr herzlichst und eile zur Treppe hinter'm Tresen, die hoch zu deine Wohnung führt. 
        `,

        // initiates: scene - 23
        nextText: 23,
      },
    ],
  },

  // scene - 23 - wphnung
  {
    id: 23,
    text: `
   Du betrittst deine Wohnung. Ein fauler Gestank beißt sich an deiner Nase fest. Es haut dich fast um, so schwül
   und dick ist die abgestandene Luft. Es ist zu dunkel, du kannst nichts sehen.
   
   Gerade willst du eine Kerze anzünden, da springt dich etwas aus der Dunkelheit heraus an!
   \n${clc.magentaBright(`   Eine enorme Präsenz erscheint vor dir!`)}
   `,

    // scene - 23 - options
    options: [
      //  option - 01
      {
        text: `        
        1. Reiß' deine Arme hoch und stürz' dich in den Kampf! 
        `,

        // initiates: boss fight
        nextText: 10003,
      },
    ],
  },

  // scene - 99 - death
  // empty text and empty option to avoid "undefined" returns
  // game should reboot whenever this scene is read
  {
    id: 99,
    text: ``,
    options: [{ text: `` }],
  },
  
  // node 9999 fight scene enemy 1
  {
    id: 9999,
    text: "\n:::::: Sie brüllt:'Dir bring ich manieren bei!' und erhebt ihre Fäuste zum Kampf. :::::: \n",
    options: [{ text: "", nextText: 666 }],
  },

  // node 10001 after battle with enemy 1
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
        nextText: 21, // bäckerei node einfügen
      },
      {
        text: "\n3. Zurück in die Kneipe gehen.\n",
        nextText: 10002,
      },
    ],
  },

  // node 10002 / zurück zu kneipe - game over
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

  // node 10003 for boss fight
  {
    id: 10003,
    text: "\n:::::: Chaos wirft sich dir mit aller Kraft entgegen, als du versuchst, dir einen Weg durch die Wohnung zu bahnen. Ihr müsst kämpfen! :::::: \n",
    options: [{ text: "", nextText: 667 }],
  },

  // node 10004 after boss fight
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

/////////////////// functions for the game ///////////////////

// runs the story line and makes it interactive
function showTextNode(textNodeIndex) {
  // random event
  random(textNodeIndex);

  // finds a scene by id and logs it first
  textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);

  // enhances visual clarity with color variety
  if (textNodeIndex == 0) console.log(clc.yellow(textNode.text));
  else console.log(clc.cyan(textNode.text));

  // maps through options of a scene and logs them second
  textNode.options.map((option) => console.log(clc.whiteBright(option.text)));

  if (textNodeIndex == 11) {
    char.inventory.forEach((obj) => {
      if (obj.nameInv == "Gold") {
        return (obj.content += 2);
      } else {
        return obj;
      }
    });
  };

// plays this sound once, when player dies (scene 99 is displayed)
const death = () => player.play("assets/game-over-man.mp3");

// checks for bad choice and sends player to death
  if (textNode.options[0].nextText === 99) {
    death();
    console.log(
      clc.red(
        "\n\n                --x----x----x----x----x----x----x----x----x----x-- \n                        ~~> GAME OVER, MAN! GAME OVER! <~~\n                --x----x----x----x----x----x----x----x----x----x--\n\n\n"
      )
    );

    // reboots game after player made bad choice (death)
    reboot();
  };

  // initiates fight agains napoleon dynamite
  if (textNode.options[0].nextText === 666) {
    let y = fight(enemyOne);
    if (y) {
      char.life = 100;
      showTextNode(10001);
    } else {
      reboot();
    }
  };

  // initiates bossfight
  if (textNode.options[0].nextText === 667) {
    let x = fightBoss(boss);
    if (x) {
      showTextNode(10004);
    } else {
      reboot();
    }
  };

  // leads to end screen after victory
  if (textNode.options[0].nextText === 1337) {
    readlineSync.question("Taste drücken um fortzufahren");
    victory();
    char.printCertificate();
    readlineSync.question("Taste drücken um fortzufahren");
    reboot();
  };

  // asks player to choose from max 4 options
  let answer = readlineSync.question();

  // varible storing option lengths
  let optionsLength = textNode.options.length;

  // allows any key input to start the game
  let nextText = 1;
  if (textNodeIndex == 0) {
    showTextNode(nextText);
  } else {

    // checks for correct player input:
    // replays current scene upon faulty input
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

      // prints inventory upon request
      char.printInventory();
      showTextNode(textNodeIndex);
    } else {

      // initiates next scene upon correct input
      nextText = textNode.options[answer - 1].nextText;

      // clears current scene off the window after input
      console.clear();
      showTextNode(nextText);
    };
  };
};

// restarts the game after game over
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
};

// resets life and inventory to start fresh
function reset() {
  char.inventory = [
    { name: "zettel", content: "eine liederlich geschriebene Adresse" },
    { name: "Gold", content: 0 },
  ];
  enemyOne.life = 100;
  char.life = 100;
  boss.life = 200;
};

// plays this sound once, when the game is finished
const victory = () =>
  player.play("assets/Short_triumphal_fanfare-John_Stracke-815794903.mp3");

// plays this sound during normal fight
const fightBGM = () =>
  player.play("assets/Battle.mp3");

// starts battle with non-boss enemy
function fight(enemy) {

  // don't know how to terminate media player post fight yet
  // if (enemy.life != 0) {
  //  fightBGM();
  // }

  while (enemy.life > 0 && char.life > 0) {
    // player attack
    let answer = readlineSync.question(
      `   ${clc.magentaBright("Was willst du tun?")} (1 = Ohrfeige, 2 = Faustschlag, 3 = Tritt gegen das Knie, 4 = warten)\n   ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n`
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
};

// starts battle with boss
function fightBoss(boss) {
  // player-attacks in bossfight
  char.attacks = [
    {
      name: "Du holst dir eine große Mülltüte und stopfst alles was du findest hinein.",
      damage: 50,
    },
    {
      name: "Deine Freund*innen und Nachbar*innen kommen dir zu Hilfe und schrubben was das Zeug hält.",
      damage: 50,
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
        `   ${clc.magentaBright("Was willst du tun?")} (1 = Aufräumen 2 = Um Hilfe rufen, 3 = Alles rauswerfen, 4 = Beten , 5 = Gehen)\n   ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n`
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

      // boss enemy dead
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
    readlineSync.question(`Taste drücken um fortzufahren`);
    console.clear();
  }
};

// shows life of the contestants in each round
function fight_status(enemy) {
  console.log(
    `                 Your life: ${char.life} ------- Enemy life: ${enemy.life}\n`
  );
};

// rewards after a fight
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
};

// random encounter between all scenes
function random(textNodeIndex) {
  let randomize = Math.floor(Math.random() * 100);
  if (randomize <= 10 && textNodeIndex > 5) {
    console.clear();
    char.life -= 3;
    console.log(clc.red("      \nJemand wirft einen Blumentopf nach dir! Du verlierst 3 Lebenspunkte!"));
    readlineSync.question("   Taste druecken um fortzufahren");
  } else {
    return ``;
  }
};

startGame();