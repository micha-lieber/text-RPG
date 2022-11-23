export function loot() {
  let Belohnung = [5, 7, 15, 20];
  let stufe = Math.floor(Math.random() * 3);
  char.inventory.map((obj) => {
    if (obj.name == "Gold") {
      return (obj.content = obj.content + Belohnung[stufe]);
    } else {
      return obj;
    }
  });
  return `Herzlichen glückwunsch du hast ${Belohnung[stufe]} Gold stücke als bekommen`;
}
