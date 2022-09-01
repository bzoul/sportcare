export const getPercentageColor = (percent: number) => {
  if (percent && percent > 80) {
    return '#12A04A';
  } else if (percent > 60) {
    return '#80BD00';
  } else if (percent > 40) {
    return '#FCE50B';
  } else if (percent > 20) {
    return '#F8991B';
  } else {
    return '#D6441D';
  }
};
