import axios from 'axios';

export async function heartDateGenerator(shape: number, tiredness: number) {
  const data: number[] = [];
  const avgMinHr = 25;
  const avgMaxHr = 90;

  const originalAvgHR = Math.round(
    (avgMinHr + (avgMaxHr - avgMinHr) * (1 - shape)) * (1 + tiredness * 0.2),
  );

  const originalRR = Math.round((60 / originalAvgHR) * 1000);

  for (let index = 0; index < 70000; index++) {
    const rr = (60 / originalAvgHR) * 1000;
    const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    const variability = Math.round(
      plusOrMinus * rr * Math.random() * 0.2 * (1 - tiredness),
    );
    const total = rr + variability;

    data.push(Math.round(total));
  }

  let total = data.reduce(function (acc, val) {
    return acc + val;
  }, 0);

  const simulatedRR = Math.round(total / data.length);
  const simulatedAvgHR = Math.round(60000 / simulatedRR);

  const RrToHr = (RRdata: number[]) => {
    const heartRate: number[] = [];
    let count = 0;
    RRdata.reduce((prev, current) => {
      const rest = (prev + current) % 6000;
      if (prev + current >= 6000) {
        heartRate.push(Math.floor((count - rest / current) * 10 * 100) / 100);
        count = 0;
        return rest;
      } else {
        count++;
        return prev + current;
      }
    });
    return heartRate;
  };

  const dataForIA = data.map((rr, i) => {
    return {ms: i, heartrate: rr};
  });
  interface IIA {
    data: number;
  }

  let IaResult = 0;
  try {
    IaResult = await axios
      .post<IIA>('https://ia.sport-care.net/rmssd', dataForIA)
      .then(res => {
        if (res.status === 200) {
          return res.data.data;
        }
        return 0;
      });
  } catch (error) {
    console.log(error);
  }

  const dataHR = {
    shape,
    tiredness,
    originalAvgHR,
    originalRR,
    simulatedAvgHR,
    simulatedRR,
    data,
    hr: RrToHr(data),
    mhr: Math.max(...RrToHr(data)),
    rmssdFromIA: IaResult,
  };
  console.log('max', Math.max(...RrToHr(data)));

  return dataHR;
}
