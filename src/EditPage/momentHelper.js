import moment from 'moment'

export function moment_run(date) {
  let newDate = moment(date).format("YYYY-MM-DD");
  return newDate;
}


