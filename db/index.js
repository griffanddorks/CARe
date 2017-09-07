const db = require("./config");
const Sequelize = require("sequelize");

const User = db.define("user", {
  email: { type: Sequelize.TEXT, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: true },
  phone: { type: Sequelize.STRING, allowNull: true },
  profilePic: { type: Sequelize.STRING, allowNull: true }
});

const Shop = db.define("shop", {
  address: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.TEXT, allowNull: false },
  mobile: { type: Sequelize.BOOLEAN, allowNull: true },
  phone: { type: Sequelize.STRING, allowNull: false },
  pickup: { type: Sequelize.BOOLEAN, allowNull: false },
  picture: { type: Sequelize.TEXT, allowNull: true },
  calendar_id: { type: Sequelize.TEXT, allowNull: true },
  yelp_id: { type: Sequelize.TEXT, allowNull: true }
});

const Car = db.define("car", {
  license: { type: Sequelize.STRING, allowNull: true },
  make: { type: Sequelize.STRING, allowNull: false },
  mileage: { type: Sequelize.INTEGER, allowNull: false },
  model: { type: Sequelize.STRING, allowNull: false },
  nextService: { type: Sequelize.ARRAY(Sequelize.TEXT), allowNull: true },
  picture: { type: Sequelize.TEXT, allowNull: true },
  vin: { type: Sequelize.STRING, allowNull: true },
  year: { type: Sequelize.INTEGER, allowNull: false }
});

const HistoryEntry = db.define("historyentry", {
  date: { type: Sequelize.DATE, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: false },
  mileage: { type: Sequelize.INTEGER, allowNull: false },
  notes: { type: Sequelize.TEXT, allowNull: true },
  service: { type: Sequelize.STRING, allowNull: false }
});

const Review = db.define("review", {
  rating: { type: Sequelize.INTEGER, allowNull: false },
  response: { type: Sequelize.TEXT, allowNull: true },
  review: { type: Sequelize.TEXT, allowNull: false },
  verified: { type: Sequelize.BOOLEAN, allowNull: true }
});

const Appointment = db.define("appointment", {
  date: { type: Sequelize.DATE, allowNull: false },
  service: { type: Sequelize.STRING, allowNull: false },
  time: { type: Sequelize.STRING, allowNull: false }
});

const Favorite = db.define("favorite", {});

const Message = db.define("message", {
  from: { type: Sequelize.STRING, allowNull: false },
  message: { type: Sequelize.TEXT, allowNull: false }
});

User.hasMany(Car);
Car.belongsTo(User);

Shop.hasOne(User);
User.belongsTo(Shop);

Favorite.belongsTo(User, {
  through: Favorite,
  foreignKey: { name: "userId", unique: false }
});
Favorite.belongsTo(Shop, {
  through: Favorite,
  foreignKey: { name: "shopId", unique: false }
});

Message.belongsTo(User, {
  through: Message,
  foreignKey: { name: "userId", unique: false }
});
Message.belongsTo(Shop, {
  through: Message,
  foreignKey: { name: "shopId", unique: false }
});

Review.belongsTo(User, {
  through: Review,
  foreignKey: { name: "userId", unique: false }
});
Review.belongsTo(Shop, {
  through: Review,
  foreignKey: { name: "shopId", unique: false }
});

Appointment.belongsTo(User, {
  through: Appointment,
  foreignKey: { name: "userId", unique: false }
});
Appointment.belongsTo(Shop, {
  through: Appointment,
  foreignKey: { name: "shopId", unique: false }
});

HistoryEntry.belongsTo(Car, {
  through: HistoryEntry,
  foreignKey: { name: "carId", unique: false }
});
HistoryEntry.belongsTo(Shop, {
  through: HistoryEntry,
  foreignKey: { name: "shopId", unique: false }
});

module.exports = {
  User,
  Shop,
  Car,
  HistoryEntry,
  Review,
  Appointment,
  Favorite,
  Message
};
