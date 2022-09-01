export const getConditionColor = (
  condition: string | null = 'default',
): string => {
  const conditionObj = {
    'very bad': '#D6441D',
    bad: '#F8991B',
    medium: '#FCE50B',
    good: '#80BD00',
    'very good': '#12A04A',
    default: '#D2D2D0',
  };
  return conditionObj[condition as keyof typeof conditionObj];
};
