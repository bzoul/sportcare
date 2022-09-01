export const getIMC = (weight: number, height: number): number => {
  return weight / (height * height);
};

export const getIMCColor = (imc: number) => {
  if (imc && imc < 18.5) {
    return '#9ACDFF';
  } else if (imc < 25) {
    return '#0099CC';
  } else if (imc < 30) {
    return '#FD9900';
  } else if (imc < 40) {
    return '#FF6632';
  } else {
    return '#CC0032';
  }
};
