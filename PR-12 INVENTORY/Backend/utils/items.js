const csvParser = require("csv-parser");

const { Readable } = require("stream");

const importCsv = async (buffer, model) => {
  let records = [];
  return new Promise((resolve, reject) => {
    const stream = Readable.from(buffer.toString());
    stream
      .pipe(csvParser())
      .on("data", (row) => records.push(row))
      .on("end", () => {
        model
          .insertMany(records)
          .then(() => resolve())
          .catch(reject);
      });
  });
};

module.exports = { importCsv };
