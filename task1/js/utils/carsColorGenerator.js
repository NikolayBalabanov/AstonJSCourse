export const colorGenerator = () => {
  const chars = '0123456789ABCDEF';
  let newColor = '#';
  for (let i = 0; i < 6; i += 1) {
    newColor += chars[Math.floor(Math.random() * chars.length)];
  }
  return newColor;
};
