const express = require("express");
const router = express.Router();
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const fs = require("fs");

const app = express();

app.use(express.json());

const schema = fs.readFileSync(`${__dirname}/schema.graphql`, { encoding: "utf8" });

let fakeDatabase = [];
let carDetailsa = [
  {
    id: 1,
    name: "BMW",
  },
  {
    id: 2,
    name: "Mercedes",
  },
  {
    id: 3,
    name: "Mazda",
  },
];

const root = {
  addCar: ({ car }) => {
    fakeDatabase.push(car);
    return car;
  },
  removeCar: ({ car }) => {
    var filtered = fakeDatabase.filter((value) => {
      return value !== car;
    });
    fakeDatabase = filtered;
    return car;
  },
  cars: () => {
    return fakeDatabase;
  },
  carDetails: ({ id }) => {
    return carDetailsa.filter((el) => el.id === id);
  },
};

// const root = {
//         car: () => {
//           return 'Audi';
//         },
//         cars: () => {
//             return ["Mercedes", "BMW", "Mazda"]
//         },
//         addCar: () => {
//             return  "Volvo";
//         }

//   };

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(schema),
    rootValue: root,
    graphiql: true,
  })
);

app.post("/handle", function (req, res) {
  res.send(11);
});

app.get("/books", (req, res) => {
  console.log("name", req);
  res.send(["Little Prince"]);
});

app.get("/books/:year/:month", (req, res) => {
  console.log(req);
  res.send(req.params);
});

app.listen(4000, () => console.log(`Hello world app listening on port 4000!`));
