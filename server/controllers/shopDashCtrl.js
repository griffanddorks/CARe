const axios = require("axios");
const timekit = require("timekit-sdk");
const {
  timekitApp,
  timekitEmail,
  timekitPassword
} = require("../../env/config");
const { Shop, User } = require("../../db/index.js");

timekit.configure({
  app: timekitApp,
  inputTimestampFormat: "U",
  outputTimestampFormat: "U"
}); // Timestamps coming and going to timekit sdk must be unicode

//TODO: redefine shop and user relationship to include shooopkeeeeepers

module.exports = {
  getShopId: (req, res) => {
    console.log("received request to get shop id");
    User.findOne({ where: { id: req.query.userId } })
      .then(user => {
        console.log("found userId: ", user.dataValues.shopId);
        res.status(200).send({ shopId: user.dataValues.shopId });
      })
      .catch(err => console.log("could not find user", err));
  },

  getCalendar: (req, res) => {
    console.log("received request to get calendar");
    timekit
      .auth({ email: timekitEmail, password: timekitPassword })
      .then(() => timekit.include("attributes", "calendar").getBookings())
      .then(books => {
        let bookings = [];
        console.log("this is the request", req.query);
        books.data.forEach(booking => {
          if (
            !booking.completed &&
            !!booking.calendar &&
            booking.calendar.id === req.query.id &&
            booking.state === "confirmed"
          ) {
            let { start, end, what } = booking.attributes.event;
            let title = what;
            bookings.push({ start, end, title });
          }
        });
        res.status(200).send(bookings);
      })
      .catch(err => console.log("could not get calendars", err));
  },

  createCalendar: (req, res) => {
    console.log("received request to create calendar");
    timekit
      .auth({ email: timekitEmail, password: timekitPassword })
      .then(() => console.log("authenticated"))
      .then(() =>
        timekit.createCalendar({
          name: "Test-Calendar-8",
          description: "testing this calendar"
        })
      )
      .then(x => Shop.update({ calendar_id: x.data.id }, { where: req.body }))
      .then(() => Shop.findOne({ where: req.body }))
      .then(x => res.status(201).send({ calId: x.dataValues.calendar_id }))
      .then(() => console.log("sent shop calendar_id to front end"))
      .catch(err => res.status(400).send(err));
  },
  storeCalendar: (req, res) => {},
  deleteCalendar: () => {}
};
