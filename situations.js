// INITIALIZE READLINESYNC TO ENABLE PLAYER INPUT QUERY
let readlineSync = require("readline-sync");

function startGame() {
  // GAME ALWAYS STARTS WITH SCENE 00
  showTextNode(0);
}

// TEXTNODE => AN ENTIRE SCENE
let textNode;

// FUNCTION CONTAINING ALL CONDITIONS FOR SCENE SEQUENCE
function showTextNode(textNodeIndex) {
  // FINDS A SCENE BY ID AND LOGS ITS TEXT FIRST
  textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);

  // ENHANCES VISUAL CLARITY WITH COLOR VARIETY
  // TURNS START SCREEN YELLOW AND OTHER SCENES CYAN
  if (textNodeIndex == 0) console.log(clc.yellow(textNode.text));
  else console.log(clc.cyan(textNode.text));

  // MAPS THROUGH OPTIONS OF A SCENE AND LOGS THEM SECOND
  textNode.options.map((option) => console.log(clc.whiteBright(option.text)));

  // CHECKS FOR BAD CHOICE AND SENDS PLAYER TO DEATH SCENE
  // A BAD CHOICE IS ANY OPTION WITH NEXTTEXT 10
  if (textNode.options[0].nextText === 99) {
    console.log(
      clc.red(
        "\n\n                --x----x----x----x----x----x----x----x----x----x-- \n                        ~~> GAME OVER, MAN! GAME OVER! <~~\n                --x----x----x----x----x----x----x----x----x----x--\n\n\n"
      )
    );

    // REBOOTS GAME AFTER PLAYER MADE BAD CHOICE
    startGame();
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
    if (isNaN(answer) || answer > optionsLength || answer <= 0) {
      console.log(
        clc.red(`\n\n\n                --x----x----x----x----x----x----x----x----x----x-- \n 
      ~~> Faulty Input,  Try Again!! <~~\n
      ~~> Enter One Of The Present Numbers <~~\n 
      ~~> Only Numeric Input Allowed <~~\n
      --x----x----x----x----x----x----x----x----x----x--\n\n\n`)
      );
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

// VARIABLE STORING DATE
let date = new Date();

// ALL SCENES AND OPTIONS
// EVERY DEATH SCENE SHOULD TAKE YOU TO A SPECIAL PRE-DEATH DESCRIBING YOUR DEATH
// AND AFTERWARDS INITIATE DEATH
const textNodes = [
  // SCENE - 00 - START
  {
    id: 0,
    text: `                      
    \n       :::::::::::::    :::::  %%%%  ------------------------------  %%%%  :::::    ::::::::::::\n       ::::::::::::::      :::  %%%%  ????????????????????????????????????????????????????????????????????????????????????  %%%%  :::      :::::::::::::\n       :::::::::::::::    :::::  %%%%  ????????????------------------????????????  %%%%  :::::    ::::::::::::::\n       ::::::::::::::::      :::  %%%%  ??????                    ??????  %%%%  :::      :::::::::::::::\n       ::::::::::::::::     :::::  %%%%  ?????? THE EPIC JOURNEY ??????  %%%%  :::::     :::::::::::::::\n       :::::::::::::::         :::  %%%%  ??????  ~~~~ OF ~~~~  ??????  %%%%  :::         ::::::::::::::\n       ::::::::::::::   ::    :::::  %%%%  ??????   DRUNK GUY  ??????  %%%%  :::::    ::   :::::::::::::\n       :::::::::::::   ::::      :::  %%%%  ??????     BOB    ??????  %%%%  :::      ::::   ::::::::::::\n       ::::::::::::   ::::::    :::::  %%%%  ?????????        ?????????  %%%%  :::::    ::::::   :::::::::::\n       :::::::::::   :::  :::      :::  %%%%  ?????????------?????????  %%%%  :::      :::  :::   ::::::::::\n       ::::::::::   :::    :::    :::::  %%%%  ??????????????????????????????  %%%%  :::::    :::    :::   :::::::::\n       :::::::::   :::      :::      :::  %%%%  --------  %%%%  :::      :::      :::   ::::::::`,
    options: [
      {
        text: `\n\n   Press any ${clc.greenBright(`key`)} to start the game.`,
        nextText: 1,
      },
    ],
  },

  // SCENE - 01 - INTRO
  {
    id: 1,
    text: `\n\n   An einem Tisch in einer Taverne, wachst du auf. Dein Kopf dr??hnt vor Schmerzen. Wo bist du?\n   Was ist passiert? Dir an den Kopf fassend, atmest du tief ein. Die Luft ist feucht, warm und\n   stinkt nach einer bitters????lichen Mischung verschiedenster K??rperger??che. Deine Hand greift\n   nach deinem Mund, fast h??ttest du dich ??bergeben. Ein unertr??glicher Durst erfasst dich. Wasser.\n   Du brauchst Wasser. Zum Gl??ck steht ein Glas kristallklares, eiskaltes Wasser direkt vor dir.
    \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // SCENE - 01 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `\n        1. Ohne nachzudenken nach dem Glas schnappen und es deinen gierigen, vertrockneten Schlund hinunter kippen!\n`,

        // INITIATES: PRE-DEATH - 02
        nextText: 2,
      },

      //  OPTION - 02
      {
        text: `\n        2. Ignoriere das Glas, wer wei?? was diese durchsichtige Fl??ssigkeit wirklich ist? Du schaust dich um.\n`,

        // INITIATES: SCENE - 03
        nextText: 3,
      },
    ],
  },

  // SCENE - 02 - PRE-DEATH: WASSER
  {
    id: 2,
    text: `\n   Ahh, ein s????es, die Kehle befeuchtendes, eiskaltes Glas Wass... Wa... Was? Das ist kein Wasser!\n   Das ist Rum! Purer Rum! Du stirbst innerlich als das dir der Alkohol den Hals hinunter brennt.\n   Uh-oh, du f??hlst, wie sich dein Magen dreht und kr??mmt, fast so als w??rde es protestieren.\n`,

    // SCENE - 02 - OPTIONS
    options: [
      {
        text: clc.redBright(`\n        Du h??lst es nicht mehr aus! Deine Augen suchen panisch nach einer Ecke, einem Eimer, irgendwas worin du dich\n        ??bergeben kannst, doch es ist zu sp??t. Ein blubberndes, gurgelndes Ger??usch entfleucht deinen trockenen Lippen,\n        w??hrend dir dein Mageninhalt hochgeschossen kommt. F??r einen kurzen Moment wirkst du, wie ein majest??tischer\n        Vulkan, der sich in Lava ergie??t. Tr??nend, rollen sich deine Augen nach hinten, du besudelst dich und den\n        unschuldigen Tisch mit deinem Erbrochenen.\n\n        Du verlierst dein Bewusstsein. Majest??tisch sah das jetzt nicht aus...
        `),

        // INITIATES: DEATH
        nextText: 99,
      },
    ],
  },

  // SCENE - 03 - TAVERNE
  {
    id: 3,
    text: `\n   Du befindest dich in einer dreckigen, heruntergekommenen Taverne. Um dich herum allerlei Menschen,\n   besch??ftigt sich zu betrinken oder verwickelt in lautstarkem Suffgeschw??tz. Dazu noch die\n   Lautst??rke der Musik und dir ist sofort bewusst, woher die Kopfschmerzen kommen. Zumindest zum Teil,\n   schlie??lich hast du auch ordentlich einen im Tee, mein Bester.
\n   Links hinter dir ??ffnet sich eine T??r und ein Mann tritt herein. Er nickt einigen G??sten zu\n   und wendet sich, seine Jacke aufkn??pfend, dem Kleiderhaken zu.\n   Das muss der Ausgang sein, denkst du dir.
\n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // SCENE - 03 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: "\n        1. Gehe zum Wirt und frage ihn, ob er wei?? was mit dir passiert ist.\n",

        // INITIATES: SCENE - 04
        nextText: 4,
      },

      //  OPTION - 02
      {
        text: "\n        2. Warte bis der Mann sich von der T??r entfernt, pack' deine Habseligkeiten und fliehe sofort aus der Taverne!\n",

        // INITIATES: SCENE - 05
        nextText: 5,
      },

      //  OPTION - 03
      {
        text: "\n        3. Das Glas Wasser flirtet dich die ganze Zeit schon an, du kannst der Versuchung nicht l??nger widerstehen! \n",

        // INITIATES: PRE-DEATH - 02
        nextText: 2,
      },
    ],
  },

  // SCENE - 04 - WIRT
  {
    id: 4,
    text: `\n   Der Wirt nickt dir zu, als er dich am Tresen empf??ngt. Er wirft einen, kurzen, durchdringenden Blick\n   auf dich und schnauft. Ehe du dich versiehst, steht ein gro??er, durchsichtiger Krug vor dir. Du siehst\n   trockener aus, als meine Frau nachts im Bett, mein Freund, posaunt er laut und klopft dir dabei lachend\n   auf die Schulter. Das Wasser hier geht auf's Haus, lang zu bevor du mir hier noch umkippst, f??gt er hinzu.\n   Bevor er zu Ende reden kann, h??ngst du mit deinen gierigen Lippen schon am Krug.\n\n   Erfrischend, kaltes Wasser flie??t dir angenehm k??hlend den Hals hinunter.\n   Was kann ich f??r dich tun Kleiner? Fragt er dich, erstaunt dar??ber, wie schnell du den Krug geleert hast.
    \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // SCENE - 04 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: "\n        1. Danke ihm und falle ??ber den Krug her. Wasser, Wasser... An was anderes kannst du nicht mehr denken.\n",

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
        text: "\n        3. Greife nach seinem Kragen und ziehe ihn zu dir herunter:\n           H??r' zu Arschloch! Nochmal falle ich auf deine KO-Drinks nicht herein! \n",

        // INITIATES: PRE-DEATH - 06
        nextText: 6,
      },

      //  OPTION - 04
      {
        text: "\n        4. Schau ihn leicht genervt an, dann den Krug. Wer wei??, was dir dieser Mann andrehen will.\n           Lehne sein Angebot dankend an und verlasse die Taverne. \n",

        // INITIATES: SCENE - 05
        nextText: 5,
      },
    ],
  },

  // SCENE - 05 - DRAU??EN
  {
    id: 5,
    text: `\n   Du verl??sst die Taverne und stehst auf einer offenen Stra??e. Es ist kalt. Saukalt. Die Art von alles\n   durchdringender K??lte, die selbst dein bestes St??ck, wie einen verschrumpelten Pickel aussehen l??sst.\n   Oder sah der schon vorher so aus? Hey, hey. Sorry. Ich bin zu weit gegangen, sei nicht traurig.\n   Auf die Gr????e kommt es schlie??lich nicht an, oder irgendwie sowas.\n\n   Eine Kutsche steht keine zehn Meter von dir entfernt und eine untersetzte Person auf dem\n   gegen??berliegenden Bordstein, die dich unverhohlen anstarrt.
  \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // SCENE - 05 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: "\n        1. Dich der Person zuwenden, die dich seltsam be??ugelt und sie ansprechen.\n",

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
        text: "\n        3. Umfallen. Liegen bleiben. Schei??tag.\n",

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
    text: `\n   Mit einer Hand haut der Wirt laut auf den Tresen und mit der anderen greift er nach deiner Babyhand.\n   Spielen willst du, ja? Fl??stert er dir berdrohlich zu, sich ??ber dich beugend. Jetzt erst bemerkst du,\n   wie gewaltig gro?? der Wirt ist, deine Hand ist gar komplett in seiner B??renpranse verschwunden.\n   Du stammelst unverst??ndliches Zeug, ehe deine wirren Gedanken von einem stechenden Schmerz in deiner\n   Hand unterbrochen werden.`,

    // SCENE - 06 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: clc.redBright(`\n        Du schaust auf deine Hand. Deine Finger zeigen in unterschiedliche Richtungen. Du kannst dich\n        nicht erinnern, dass sie sich jemals h??tten so drehen k??nnen. Der Wirt hat dir wohl einh??ndig\n        deine gesamte Hand zertr??mmert. Viel Zeit mit den Schmerzen bleibt dir nicht, denn als n??chstes\n        siehst du aus dem Augenwinkel eine gewaltige Faust, gleich einem allesvernichtenden Meteors,\n        auf dein Gesicht herunterdonnern.\n\n        Poof, dir gehen die Lichter aus. Was hast du Wicht dir nur dabei gedacht?
        `),

        // INITIATES: DEATH
        nextText: 99,
      },
    ],
  },

  // SCENE - 07 - PRE-DEATH: K??LTE
  {
    id: 7,
    text: `
   Du rutschst auf einer gefrorenen Pf??tze aus und landest flach auf dem Boden.
   Du willst dich gerade hochraffen, da h??lst du kurz still, denkst nach und nickst
   dir selbst zu. Es scheint, als h??ttest du deine Entscheidung getroffen. Du bleibst liegen.`,

    // SCENE - 07 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: clc.redBright(`        
        
        Die K??lte nimmt sich deiner sofort an. Sie siecht in deine Gliedma??en ein, kriecht dein Torso
        hoch und legt sich sanft ??ber deine Brust. Ihr eisiger Griff jedoch, umklammert dein Herz.
        Sie raubt dir den Schmerz, du f??hlst nichts mehr, leise fl??stert sie dich in den Schlaf.

        Auch wenn sie gr??sslich klingt, so ist sie doch ein gnadenvoller Tod. Zufrieden schl??fst
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
        3. Eine transzendente Stimme fl??stert dir zu. Dir wird ganz warm in der Brust.
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
   Hahaha, wollen wir das nicht alle? Lacht er dir zu und erg??nzt: Ich kann Sie gerne nach Hause
   fahren. Eine Fahrt innerhalb der Stadt, w??rde Sie ${clc.yellowBright(
     `10 Goldm??nzen`
   )} kosten.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // SCENE - 09 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
        1. ${clc.yellowBright(
          `10 Goldm??nzen`
        )}?! Sieht dieser Mann nicht, wie elend es dir geht? Du schnellst nach vorne um nach seiner Jacke zu greifen, fast blind vor Wut.
        `,

        // INITIATES: PRE-DEATH - 07
        nextText: 7,
      },

      //  OPTION - 02
      {
        text: `        
        2. Den Kopf sch??tteln und sein Angebot ablehnen. Geld hast du keins. Vielleicht kann dir die untergesetzte Person weiterhelfen?
           Schlie??lich starrt sie dich schon die ganze Zeit an.
        `,

        // INITIATES: SCENE - 10
        nextText: 10,
      },

      //  OPTION - 03
      {
        text: `
        3. Eine transzendente Stimme fl??stert dir zu. Die Stimme ist ??berw??ltigend...
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
        text: `        3. Die Person beleidigen: Deine H??sslichkeit brennt mir die Augen aus meinem Sch??del!`,

        // INITIATES: FIGHT
        nextText: 666,
      },
    ],
  },

  // SCENE - 11 - PERSON: ERSTES TREFFEN II
  {
    id: 11,
    text: `
   Die Person schaut dich bemitleidenswert an. Du siehst auch so aus als br??uchtest du Geld, mein Lieber.
   Hier hast du ${clc.yellowBright(
     `2 Goldm??nzen`
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
        nextText: 666,
      },
    ],
  },

  // SCENE - 12 - PERSON: ERSTES TREFFEN III
  {
    id: 12,
    text: `
   Sie schaut dich kurz verwirrt an, dann sch??ttelt sie l??chelnd den Kopf, wirft einen fl??chtigen Blick
   auf ihre futuristisch aussehende Armbanduhr und widmet sich dir wieder zu:

   Es ist ${clc.blueBright(date)}, beep, boop.

   Der Pfosten hat doch gerade Roboterger??usche von sich gegeben, oder?!
   Und was war das bitte f??r eine Art dir das Datum zu nennen?!
   
   Deine maximale Verwirrung l??sst du dir mit einem nerv??sen Nicken, nicht anmerken.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
   `,

    // SCENE - 12 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        1. Ihr danken und dich von ihr abwenden. Du vernimmst ein transzendentes Fl??stern: Bete mich an und ich helfe dir...
          `,

        // INITIATES: SCENE - 13
        nextText: 13,
      },

      // OPTION - 02
      {
        text: `        2. Die Person beleidigen: Meine Faust schickt dich gleich in's vergangene Jahrhundert, du Blechbirne!`,

        // INITIATES: FIGHT
        nextText: 666,
      },
    ],
  },

  // SCENE - 13 - ENGEL
  {
    id: 13,
    text: `
   Du kniest dich in der K??lte auf die Stra??e und f??ngst an zu beten. Wen auch immer
   du versuchst zu erreichen, angesichts deiner Lage, w??rdest du jeden Gott nehmen.
   Deine H??nde zitternd zusammengefaltet, deine Arme schr??g gen Luft gestreckt.
   Deine Augen versunken vor Verzweiflung.

   F??r einen Moment passiert nichts.
  
   Dann trifft dich ein glei??endes Licht. Eine sonnenhelle Gestalt schwebt zu dir herab,
   legt dir sanft die Hand auf die Schulter und erinnert dich daran, dass du den
   ${clc.yellowBright(`Zettel mit der Adresse`)} in der Tasche hast.\n
   Eine F??gung Gottes? Wer wei??, aber immerhin hast du jetzt einen Anhaltspunkt.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)},
   `,

    // SCENE - 11 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        1. Zur Person von vorhin zur??ck gehen.
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
        text: `        3. Zur??ck in die Taverne gehen. Du brauchst jetzt Alkohol. Ganz viel Alkohol!
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
   aufmerksamkeiterregenden Aktion vorhin, w??rde dich selbst deine eigene Mutter herablassend anschauen.
   Eine sch??ne Dame sitzt bereits in der Kutsche. Ihr Anlitz liebkost deine ??uglein, du Perversling.
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
        2. Deine Meinung ??ndern und doch lieber zur untergesetzten Person von eben gehen.
          `,

        // INITIATES: SCENE - 15
        nextText: 15,
      },

      //  OPTION - 03
      {
        text: `        
        3. Sagen, dass du in die gleiche Richtung, wie die sch??ne Dame f??hrst. (Du Perversling.)
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
   Die Person von eben steht nach wie vor am selben Ort und dr??ckt gerade eine Zigarette aus, als du bei ihr ankommst.
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
        2. Doch lieber zur??ck zum Kutscher gehen.
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
   Kreidebleich st??rzt du dich in die Taverne zur??ck. Was auch immer eben passiert ist, du willst nichts davon wahrhaben.
   Du dr??ckst die Menschen zur Seite und bahnst dir eine Schneise bis zum Tresen durch. Der Wirt hat dich l??ngst gesehen
   und wirft dir ein schiefes Grinsen zu. 'Was darf's sein Bursche?', fragt er dich h??hnisch.
   
   'Das st??rkste Zeug, was du hast alter Mann!', zischst du zur??ck. Es scheint als h??ttest du dich f??r ein
   One-Way Ticket entschieden.
   `,

    // SCENE - 16 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: clc.redBright(`     
        Der Wirt schnauft und stellt dir eine gewaltige Flasche puren Spiritus hin. Determiniert greifst du nach der Flasche und trinkst diese
        auf der Stelle aus. Das unertr??gliche Brennen des Alkohols im Rachen interessiert dich genauso wenig, wie der Preis f??r so eine gro??e Flasche.
        
        Du grinst den Wirt, der dich nun fassungslos anstarrt, dumm an, hebst den Mittelfinger hoch und streckst sie ihm entgegen, w??hrend dein
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
     `10 Goldm??nzen`
   )}, mein Herr.
 \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}`,

    // SCENE - 14 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
      1. Deine ${clc.yellowBright(
        `Goldm??nzen`
      )} reichen vorne und hinten nicht. Zeig den Zettel lieber der Person von eben. 
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
    ],
  },

  // SCENE 18 - PERSON: NACH ENGEL II
  {
    id: 18,
    text: `
   Die Person von eben steht nach wie vor am selben Ort und dr??ckt gerade eine Zigarette aus, als du bei ihr ankommst.
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
        2. Doch lieber zur??ck zum Kutscher gehen.
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
   Du holst den zerkn??llten Zettel aus deiner Hosentasche und h??ltst ihn vor das Gesicht deines Gegen??bers.
   Da will ich hin, bringst du noch hervor, Wei??t du wo das ist?

   Die Person nimmt dir den Zettel aus der Hand und liest ihn vorsichtig durch. Ihre Augen leuchten auf.
   Sie gibt dir den Zettel zur??ck und sagt:
    
       'Das ist keine f??nf Minuten von hier, du erkennst es an einer B??ckerei im Erdgeschoss.'

   Danach beschreibt sie dir, wo du lang musst.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
`,

    // SCENE - 19 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
        1. Den Anweisungen der Person folgen und dich auf den Weg zur B??ckerei machen.
        `,

        // INITIATES: SCENE - 21
        nextText: 21,
      },

      //  OPTION - 02
      {
        text: `
        2. Doch lieber zur??ck zum Kutscher gehen. (Kann da einer etwa die h??bsche Dame nicht vergessen?)
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
   Du torkelst zur Kutsche und lehnst dich an: Na du s????e Maus, darf man dir Gesellschaft leisten?
   Fragst du sie und wirfst ihr einen, in deiner Sicht, hei??en, einladenden Blick zu.
   
   Danach versuchst du Strolch dich zu ihr in die Kutsche zu setzen.

   Sie, jedoch findet deinen Blick alles andere als "einladend", und dass du unaufgefordert die Kutsche
   betreten willst, findet der Kutscher genauso wenig am??sant.
   `,

    // SCENE - 20 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: clc.redBright(`     
        ${clc.red("BANG !!")}

        Ein lauter Knall l??sst dir fast das Trommelfell platzen. Verwirrt schaust du zum Kutscher. Er sitzt immernoch in der Kutsche.
        Pl??tzlich geben deine Beine nach, ein stechender Schmerz in deiner Brust macht sich bemerkbar. Dein Blick schie??t wieder zur
        Dame zur??ck und da d??mmert's dir. Erschossen hat sie dich.

        Den funkelnden Pistolenlauf erkennst du noch, da schwindet dir bereits das Bewusstsein.
        "Widerlicher Mistkerl.", h??rst du sie noch spotten, dann brichst du zusammen.

        Deine Lichter gehen aus und die Welt ist einen Perversling leichter.
        Was hast du hoffnungsloser Jammerlappen auch erwartet?
        `),

        // INITIATES: DEATH
        nextText: 99,
      },
    ],
  },

  // SCENE 21 - B??CKEREI I
  {
    id: 21,
    text: `
   Du betrittst die B??ckerei. Sie befindet sich an einer Seitenstra??e, die zu heruntergekommenen Wohnblocks f??hrt.
   Viel ist in der B??ckerei nicht los. Am hintersten Tisch g??nnt sich jemand eine hei??e Tasse Kaffee. Links von dir
   vernascht einer gleich drei Bienenstiche aufeinmal. 'Oha, was ein geskillter Dude', denkst du dir noch, da
   begr????t dich auch schon die Bedienung:

        'Na? Schon wieder zu viel gesoffen, was?' 
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
`,

    // SCENE - 21 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
        1. Woher kennt dich die Trulla?! Frage sie, was sie ??ber dich wei??.
        `,

        // INITIATES: SCENE - 22
        nextText: 22,
      },

      //  OPTION - 02
      {
        text: `
        2. Verlasse sofort die B??ckerei, das wird dir alles zu viel!
        `,

        // INITIATES: PRE-DEATH - 07
        nextText: 7,
      },

      //  OPTION - 03
      {
        text: `
        3. 'Wohl nicht genug, du bist immernoch h??sslich!', eschauffierst du dich
            und begibst dich schnurstracks zur Taverne zur??ck.
        `,

        // INITIATES: PRE-DEATH - 16
        nextText: 16,
      },
    ],
  },

  // SCENE - 22 - B??CKEREI II
  {
    id: 22,
    text: `
   Sie ??berreicht dir einen ${clc.greenBright(
     "Schl??sselbund"
   )}, danach erkl??rt sie dir, dass du gleich ??ber der B??ckerei wohnst und ihr
   jedes Wochenende deine Schl??ssel anvertraust, bevor du in die Taverne nebenan gehst. Sie h??lt dir eine deftige
   Standpauke, und da d??mmert's dir so langsam, langsam.

   Du beziehst n??mlich seit Jahren schon eine kleine Wohnung im Obergeschoss dieser B??ckerei.
   Und sie begr????t du jeden Morgen, wenn du dich auf den Weg zur Arbeit machst.
   \n${clc.magentaBright(`   Was wirst du tun? (Press a number to contine)`)}
   `,

    // SCENE - 22 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
        1. Alles dreht sich, du hast Kreislauf! Fl??chte nach drau??en an die kalte, frische Luft!!
        `,

        // INITIATES: PRE-DEATH - 07
        nextText: 07,
      },

      //  OPTION - 02
      {
        text: `
        2. Nichts macht mehr Sinn! Du verl??sst die B??ckerei und rennst zur Taverne zur??ck.
        `,

        // INITIATES: PRE-DEATH - 16
        nextText: 16,
      },

      // OPTION - 03
      {
        text: `
        3. Danke ihr herzlichst und eile zur Treppe hinter'm Tresen, die hoch zu deine Wohnung f??hrt. 
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
   Du betrittst deine Wohnung. Ein fauler Gestank bei??t sich an deiner Nase fest. Es haut dich fast um, so schw??l
   und dick ist die abgestandene Luft. Es ist zu dunkel, du kannst nichts sehen.
   
   Gerade willst du eine Kerze anz??nden, da springt dich etwas aus der Dunkelheit heraus an!
   \n${clc.magentaBright(`   Eine enorme Pr??senz erscheint vor dir!`)}
   `,

    // SCENE - 23 - OPTIONS
    options: [
      //  OPTION - 01
      {
        text: `        
        1. Rei??' deine Arme hoch und st??rz' dich in den Kampf! 
        `,

        // INITIATES: BOSS FIGHT
        nextText: 667,
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
];

// INITIATE GAME
startGame();
