const Sequelize = require("sequelize");
const path = require("path");
const { dbURL } = require(path.resolve(__dirname, "./env/config"));
const {
  User,
  Shop,
  Car,
  HistoryEntry,
  Review,
  Appointment,
  Favorite,
  Message
} = require(path.resolve(__dirname, "./db/index"));

const db = new Sequelize(dbURL, {
  dialect: "postgres",
  pool: { max: 5, min: 0, idle: 20000, aqquire: 20000 }
});

db
  .authenticate()
  .then(() => console.log("opening connection to database to seed data"))
  .then(() => console.log("syncing users"))
  .then(() => User.sync({ force: true }))
  .then(() =>
    User.bulkCreate([
      {
        name: "Test-Name",
        email: "Email@test.com",
        phone: "(555) 555-5555",
        profilePic: "https://goo.gl/images/4StBwJ"
      },
      {
        name: "Test-Name-2",
        email: "Email2@test.com",
        phone: "(555) 555-5555",
        profilePic: "https://goo.gl/images/4StBwJ"
      },
      {
        name: "Test-Name-3",
        email: "Email3@test.com",
        phone: "(555) 555-5555",
        profilePic: "https://goo.gl/images/4StBwJ"
      },
      {
        name: "Test-Name-4",
        email: "Email4@test.com",
        phone: "(555) 555-5555",
        profilePic: "https://goo.gl/images/4StBwJ"
      }
    ])
  )
  .then(() => console.log("created users, syncing shops"))
  .then(() => Shop.sync({ force: true }))
  .then(() =>
    Shop.bulkCreate([
      {
        address: "Test1 St Pasadena, CA 91106",
        email: "shop@testEmail.com",
        phone: "(626) 795-7018",
        pickup: false,
        picture:
          "https://s3-media4.fl.yelpcdn.com/bphoto/WrtUFUssbokGmNW6BG-BMQ/o.jpg"
      },
      {
        address: "Test2 Address Ave. Glendale, CA 11111",
        email: "shop2@testEmail.com",
        phone: "(626) 555-7585",
        pickup: true,
        picture:
          "https://s3-media4.fl.yelpcdn.com/bphoto/WrtUFUssbokGmNW6BG-BMQ/o.jpg"
      },
      {
        address: "Test3 Blvd. Pasadena, CA 91106",
        email: "shop@testEmail.com",
        phone: "(626) 795-7018",
        pickup: false,
        picture:
          "https://s3-media4.fl.yelpcdn.com/bphoto/WrtUFUssbokGmNW6BG-BMQ/o.jpg"
      },
      {
        address: "Test4 Ave. Glendale, CA 11111",
        email: "shop2@testEmail.com",
        phone: "(626) 555-7585",
        pickup: true,
        picture:
          "https://s3-media4.fl.yelpcdn.com/bphoto/WrtUFUssbokGmNW6BG-BMQ/o.jpg"
      }
    ])
  )
  .then(() => console.log("created shops, syncing cars"))
  .then(() => Car.sync({ force: true }))
  .then(() =>
    Car.bulkCreate([
      {
        make: "test Make",
        model: "test model",
        nextService: ["test service 1", "test service 2"],
        picture: "https://goo.gl/images/JS3xgR",
        vin: "test vin",
        year: 2020
      },
      {
        make: "test2 Make",
        model: "test2 model",
        nextService: ["test service 1", "test service 2"],
        picture: "https://goo.gl/images/JS3xgR",
        vin: "test2 vin",
        year: 2021
      },
      {
        make: "test3 Make",
        model: "test3 model",
        nextService: ["test service 1", "test service 2"],
        picture: "https://goo.gl/images/JS3xgR",
        vin: "test3 vin",
        year: 2022
      },
      {
        make: "test4 Make",
        model: "test4 model",
        nextService: ["test service 1", "test service 2"],
        picture: "https://goo.gl/images/JS3xgR",
        vin: "test4 vin",
        year: 2023
      }
    ])
  )
  .then(() => console.log("created cars, syncing history entries"))
  .then(() => HistoryEntry.sync({ force: true }))
  .then(() =>
    HistoryEntry.bulkCreate([
      {
        date: new Date(),
        description: "Test description",
        mileage: 3000000,
        notes: "test note",
        service: "test service"
      },
      {
        date: new Date(),
        description: "Test2 description",
        mileage: 3000000,
        notes: "test note",
        service: "test service"
      },
      {
        date: new Date(),
        description: "Test3 description",
        mileage: 3000000,
        notes: "test note",
        service: "test service"
      },
      {
        date: new Date(),
        description: "Test4 description",
        mileage: 3000000,
        notes: "test note",
        service: "test service"
      }
    ])
  )
  .then(() => console.log("created history entries, syncing reviews"))
  .then(() => Review.sync({ force: true }))
  .then(() =>
    Review.bulkCreate([
      {
        rating: 1,
        response: "response test1",
        review: "review test1",
        userId: 1,
        shopId: 2
      },
      {
        rating: 2,
        response: "response test2",
        review: "review test2",
        userId: 3,
        shopId: 1
      },
      {
        rating: 3,
        response: "response test3",
        review: "review test3",
        userId: 2,
        shopId: 2
      }
    ])
  )
  .then(() => console.log("created reviews, syncing appointments"))
  .then(() => Appointment.sync({ force: true }))
  .then(() =>
    Appointment.bulkCreate([
      {
        date: new Date(2017, 8, 30),
        service: "service test 1",
        time: "time test 1.  I am a string",
        userId: 2,
        shopId: 1
      },
      {
        date: new Date(2017, 8, 24),
        service: "service test 2",
        time: "time test 2",
        userId: 1,
        shopId: 3
      },
      {
        date: new Date(),
        service: "service test 3",
        time: "time test 3",
        userId: 4,
        shopId: 4
      }
    ])
  )
  .then(() => console.log("created appointments, syncing favorites"))
  .then(() => Favorite.sync({ force: true }))
  .then(() =>
    Favorite.bulkCreate([
      {
        userId: 1,
        shopId: 2
      },
      {
        userId: 3,
        shopId: 2
      },
      {
        userId: 4,
        shopId: 3
      }
    ])
  )
  .then(() => console.log("created favorites, syncing messages"))
  .then(() => Message.sync({ force: true }))
  .then(() =>
    Message.bulkCreate([
      {
        from: "test from 1",
        message: "message test 1",
        userId: 1,
        shopId: 2
      },
      {
        from: "test from 2",
        message: "message tes 2",
        userId: 3,
        shopId: 2
      }
    ])
  )
  .then(() => console.log("database seeded, please disconnect"))
  .catch(err => console.log("could not connect to db: ", err));