const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: '63698b87d79281e97e78ab47',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dprgx5mgv/image/upload/v1668641271/YelpCamp/rzm7dmi5ua33mefxuqul.jpg',
          filename: 'YelpCamp/rzm7dmi5ua33mefxuqul',
        },
        {
          url: 'https://res.cloudinary.com/dprgx5mgv/image/upload/v1668641272/YelpCamp/luzimmypgdxs6kjnzy8p.jpg',
          filename: 'YelpCamp/luzimmypgdxs6kjnzy8p',
        }
      ],
      description: 'lorem',
      price
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})



