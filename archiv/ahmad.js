const textNode5 = {
  id: 5,
  text: `Hier ist die Musik lauter. Eine Rampe führt hinauf zur Yacht. Sieht aus, als gäbe es eine Party an Deck und ein Skelett-DJ dreht Vinyl mit Sonnenbrille auf..
    \n
   Was willst du tun?\n`,
  options: [
    {
      text: "\n1. zur Yacht gehen und Gold gewinnen!\n",
      nextText: 5,
    },

    {
      text: "\n2. Nicht auf Musik achten und weitermachen!\n",
      nextText: 1,
    },
    {
      text: "\n1. ins Wasser fallen. -scheiß tag\n",
      nextText: 100,
    },
  ],
};

{
  id: 100;
}
if (id == 100) {
  console.log("gameover my friend");
  reboot();
}
