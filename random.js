export function random() {
  let randomize = Math.floor(Math.random() * 100);
  if (randomize <= 25) {
    return `Du kriegst eine Bombe auf dem Kopf und verlierst 
    ${randomize / 2} Lebenspunkte`;
  } else {
    return ``;
  }
}

console.log(random());
