import axios from '../utils/axios';
import Config from '../config';
import {IDailyReports} from '../interfaces/IDailyReports.types';
import dayjs from 'dayjs';
import {getPercentageColor} from './getPercentageColor';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
require('dayjs/locale/fr');

export async function getLastWeekDailyReports(userId?: string) {
  try {
    const dailyReports = await axios
      .get<IDailyReports[]>(
        `${Config.baseURL}/dailyReports/dateMinus5/${userId}`,
      )
      .then(res => {
        if (res.status === 200) {
          return res.data;
        }
        return [];
      });
    const reportWithoutHour = dailyReports.map(report => {
      const {date, ...rest} = report;
      return {
        date: dayjs(date).format('YYYY-MM-DD'),
        timestamp: dayjs(date).unix(),
        ...rest,
      };
    });
    const sortedReports = reportWithoutHour.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    const dailyReportsWithoutDuplicate = sortedReports.reduce(
      (acc: IDailyReports[], curr) => {
        if (!acc.some(report => report.date === curr.date)) {
          acc.push(curr);
        }
        return acc;
      },
      [],
    ) as IDailyReports[];

    const dailyReportsWithDays = dailyReportsWithoutDuplicate.map(report => {
      const {date, ...rest} = report;
      return {
        day: dayjs(date).locale('fr').format('ddd'),
        date,
        ...rest,
      };
    });

    const MaxRmssd = dailyReportsWithDays.reduce((acc, curr) => {
      if (curr.rmssd > acc) {
        return curr.rmssd;
      }
      return acc;
    }, 0);

    const dailyReportsWithPercentage = dailyReportsWithDays.map(report => {
      const {rmssd, ...rest} = report;
      return {
        ...rest,
        rmssd,
        percentage: (rmssd / MaxRmssd) * 100,
        color: getPercentageColor((rmssd / MaxRmssd) * 100),
      };
    });
    console.log('dailyReportsWithPercentage', dailyReportsWithPercentage);
    let addDayWithoutTraining = [...dailyReportsWithPercentage];

    for (let i = 0; i < 7; i++) {
      const day = dayjs().locale('fr').subtract(i, 'day').format('ddd');
      const dayWithTraining = dailyReportsWithPercentage.find(
        report => report.day === day,
      );
      if (!dayWithTraining) {
        addDayWithoutTraining.push({
          date: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
          timestamp: dayjs().subtract(i, 'day').unix(),
          day,
          percentage: 0,
          color: '#F3F3F2',
        });
      }
    }

    const dataSortedByDate = addDayWithoutTraining.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    return dataSortedByDate;
  } catch (error) {
    console.error(error);
    return [];
  }
}
