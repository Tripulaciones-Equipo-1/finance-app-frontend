const letters = [
  "T",
  "R",
  "W",
  "A",
  "G",
  "M",
  "Y",
  "F",
  "P",
  "D",
  "X",
  "B",
  "N",
  "J",
  "Z",
  "S",
  "Q",
  "V",
  "H",
  "L",
  "C",
  "K",
  "E",
];
const nie = ["X", "Y", "Z"];

export const validDNI = (dni) => {
  let copy = dni.split("");
  const nieNum = nie.indexOf(dni[0]);
  if (nieNum !== -1) copy[0] = nieNum;
  copy = copy.join("");
  console.log(copy);

  const num = Number(copy.slice(0, 8));
  const letter = copy.slice(8, 9);
  const remainder = num % 23;

  return letters[remainder] === letter;
};
