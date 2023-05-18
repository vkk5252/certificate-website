import fs from "fs";
import _ from "lodash";
import ddb_User from "../ddb_User.js";
import { v4 as uuidv4 } from "uuid";
import { getProbabilityDistribution, randomFromProbabilityDistribution } from "./addressNumbers.js";
import states from "./states.js";

const paths = {
  male: "/Users/vkk/challenges/certificate-website/server/src/ddb/seeding/male_names.txt",
  female: "/Users/vkk/challenges/certificate-website/server/src/ddb/seeding/female_names.txt",
  surnames: "/Users/vkk/challenges/certificate-website/server/src/ddb/seeding/surnames.txt",
  streets: "/Users/vkk/challenges/certificate-website/server/src/ddb/seeding/street_names.txt",
  cities: "/Users/vkk/challenges/certificate-website/server/src/ddb/seeding/city_names.txt",
};
const maleNames = fs.readFileSync(paths.male).toString().split("\n");
const femaleNames = fs.readFileSync(paths.female).toString().split("\n");
const names = maleNames.concat(femaleNames);
const surnames = fs.readFileSync(paths.surnames).toString().split("\n");
const streets = fs.readFileSync(paths.streets).toString().split("\n");
const cities = fs.readFileSync(paths.cities).toString().split("\n");
const statuses = [
  "Waiting for candidate to register",
  "Candidate registered",
  "Candidate completed information",
  "Verifying information",
  "Verified"
];

const row = {
  userEmail: 'business@gmail.com',
  lastName: '',
  proof: '',
  status: '',
  emailSent: '',
  address: '',
  email: '',
  id: uuidv4(),
  verified: '',
  firstName: '',
  created: 0
}

const addressSigmoid = x => (2 / (1 + (2.7182818 ** ((x - 40) / 40)))) + 0.01;
const addressProbDist = getProbabilityDistribution(addressSigmoid, 3000);
const dateSigmoid = x => 1 / (1 + (2.7182818 ** (2 - x)));
let daysAgo = 0;
let statusAdvanceProbability = 0;
const weightedCoinFlip = (oddsTrue) => Math.random() < oddsTrue; 

for (let i = 0; i < 200; i++) {
  row.firstName = _.sample(names);
  row.lastName = _.sample(surnames);
  row.email = `${row.firstName.toLowerCase()}.${row.lastName.toLowerCase()}@gmail.com`
  row.id = uuidv4();
  row.address = `${randomFromProbabilityDistribution(addressProbDist)} ${_.sample(streets)}, ${_.sample(cities)}, ${_.sample(states)} ${`${Math.round(Math.random() * 100000)}`.padStart(5, "0")}`;
  
  daysAgo = Math.ceil(Math.random() * 14);
  statusAdvanceProbability = dateSigmoid(daysAgo);
  for (const status of statuses) {
    row.status = status;
    if (!weightedCoinFlip(statusAdvanceProbability)) {
      break;
    }
  }
  row.created = Date.now() - (daysAgo * 24 * 60 * 60 * 1000);

  console.log(i);
  await ddb_User.writeGrid(row);
  // console.log(row);
}