const db = require("../database/connection");

const Gathering = {};

Gathering.create = newGathering => {
  return db.one(
    `INSERT into gatherings
  (title, description, date, time, latitude, longitude)
  VALUES ($<title>, $<description>, $<date>, $<time>, $<latitude>, $<longitude>) RETURNING *`,
    newGathering
  );
};

Gathering.all = () => {
  return db.any("SELECT * FROM gatherings");
};

Gathering.find = id => {
  return db.one("SELECT * FROM gatherings WHERE id = $<id>", { id: id });
};

Gathering.update = UpdateGathering => {
  return db.none(`UPDATE gatherings SET
    title = $<title>,
    description = $<description>,
    date = $<date>,
    time = $<time>,
    latitude = $<latitude>,
    longitude = $<longitude>
    WHERE id = $<id>`, UpdateGathering);
};



Gathering.delete = id => {
  return db.result(`DELETE FROM gatherings WHERE id = $<id>`, { id: id });
};



module.exports = Gathering;
