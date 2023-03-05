const models = [
  'Zotty',
  'Ferrari',
  'Porsche',
  'Geely',
  'MTZ',
  'Volvo',
  'Opel',
  'Lacetti',
  'Infinity',
  'Aston Martin',
  'Haval',
  'BMV',
  'Mercedes',
  'Lamborghini',
  'Audi',
  'Volkswagen',
  'Renault ',
  'Citroën',
  'Toyota',
  'Lexus',
];
const names = [
  'T600',
  '488',
  'Panamera Turbo',
  'Atlas',
  '82',
  'XC-90',
  'Astra',
  'Gentra',
  'Vantage',
  'Drago',
  'm8',
  'w140',
  'Huracan',
  'RS8',
  'Lupo',
  'QX70',
];
export const carsNameGenerator = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return `${model} ${name}`;
};
