export const getIntensityColor = (condition: number | null = 0): string => {
  const conditionObj = {
    5: '#D6441D',
    4: '#F8991B',
    3: '#FCE50B',
    2: '#80BD00',
    1: '#12A04A',
    0: '#D2D2D0',
  };
  return conditionObj[condition as keyof typeof conditionObj];
};
