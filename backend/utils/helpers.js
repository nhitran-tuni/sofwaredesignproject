/* eslint-disable camelcase */
const parseString = require("xml2js").parseString;
const xpath = require("xml2js-xpath");
const moment = require("moment");

const aggregateResponse = (res, fields) => {
  // TODO: synchronize start_time of all response
  const timeMap = {};
  res.forEach((r, i) => {
    r.forEach(item => {
      const time = item.start_time;
      if (!timeMap[time]) {
        timeMap[time] = {};
      }
      timeMap[time][fields[i]] = item.value;
    });
  });
  const result = Object.entries(timeMap).map(([time, value]) => ({
    time,
    ...value
  }));
  result.sort((a, b) => new Date(a.time) - new Date(b.time));
  return result;
};

const returnTotalData = (res, fields) => {
  const result = [];
  const totalProduction = res[3].reduce((acc, cur) => acc + cur.value, 0);
  res.forEach((r, i) => {
    if (i !== 3) {
      const total = r.reduce((acc, cur) => acc + cur.value, 0);
      result.push({
        type: fields[i],
        total: parseFloat(((total * 100) / totalProduction).toFixed(2))
      });
    } else {
      const other = parseFloat(
        (100.0 - result.reduce((acc, cur) => acc + cur.total, 0)).toFixed(2)
      );
      result.push({ type: "others", total: other });
    }
  });
  return result;
};

const parseXML = responses => {
  const readData = [];
  responses.forEach(r => {
    parseString(r.data, { trim: true, explicitArray: false }, (err, result) => {
      if (err) {
        return err;
      }
      readData.push(
        xpath
          .find(result, "//wml2:MeasurementTVP")
          .map(item => ({
            // eslint-disable-next-line camelcase
            start_time: item["wml2:time"],
            value: Number(item["wml2:value"])
          }))
          .filter(item => !Number.isNaN(item.value))
      );
    });
  });

  return readData;
};

const calculateAverageValue = (array = []) =>
  array.reduce((acc, x) => acc + x, 0) / array.length;

const separateIntoTimeIntervals = (start, end, interval, intervalType) => {
  // For intervalType details, please refer to:
  // https://momentjs.com/docs/#/manipulating/add/
  const formatString = "YYYY[-]MM[-]DD[T]HH[:]mm[:]ss[Z]";
  let startTime = moment.utc(start);
  const endTime = moment.utc(end);

  if (endTime.diff(startTime, intervalType, true) <= interval) {
    return [{ startTime: start, endTime: end }];
  }

  const tempEnd = moment(startTime);
  const timeList = [];

  while (tempEnd.add(interval, intervalType).isBefore(endTime)) {
    timeList.push({
      startTime: startTime.format(formatString),
      endTime: tempEnd.format(formatString)
    });
    startTime = moment(tempEnd);
  }
  timeList.push({
    startTime: startTime.format(formatString),
    endTime: endTime.format(formatString)
  });

  return timeList;
};

const contractData = data => {
  if (data.length < 500) return data;

  const step = Math.ceil(data.length / 250);
  const result = [];

  for (let i = 0; i < data.length; i += step) {
    const range = Math.min(data.length - i, step);
    const index = i + Math.floor(range / 2);
    const time = data[index].start_time;
    const value = calculateAverageValue(
      data.slice(i, i + step).map(d => d.value)
    );
    result.push({ start_time: time, value: Math.round(value) });
  }

  return result;
};

const contractMultipleData = (data, numberOfTimeIntervals) => {
  const result = [];
  for (let i = 0; i < data.length; i += numberOfTimeIntervals) {
    const endIdx = i + numberOfTimeIntervals;
    const slicedData = data.slice(i, endIdx).flat();
    result.push(contractData(slicedData));
  }

  return result;
};

module.exports = {
  aggregateResponse,
  parseXML,
  calculateAverageValue,
  returnTotalData,
  separateIntoTimeIntervals,
  contractData,
  contractMultipleData
};
