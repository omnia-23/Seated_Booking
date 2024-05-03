import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { catchError } from "./errorHandler.js";

export const parseFile = catchError(function parseFile(req, res, next) {
  const records = [];
  var parser = parse({
    delimiter: ",",
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });

  for (let i = 0; i < req.files.length; i++) {
    var source = createReadStream(req.files[i].path);
    console.log(req.files[i].path);

    parser.on("readable", function () {
      let record;
      while ((record = parser.read()) !== null) {
        console.log(record["Meeting ID"]);
        records.push(record);
      }
    });

    parser.on("end", function () {
      console.log("length ", records.length);
    });

    source.pipe(parser);
  }
});
