import faker from 'faker';
import _ from 'underscore';

let seedEvents = (group) => {
  // console.log('GROUP USER', user);
  let userId;
  _.keys(group.members).forEach((key) => {
    if (group.members[key].role == 'owner') {
      userId = key;
    }
  })
  let thisMonth = 1000*60*60*24*30
  let condition = _.sample(['Weekly', 'Monthly', 'Yearly']);
  let event = _.sample(['Meetup', 'Hack Night', 'Conference']);
  let options = {
    groupId: group.id,
    name: `${condition} ${event}`,
    description: faker.fake('{{lorem.paragraph}}'),
    going: {},
    notGoing: {},
    startTime: new Date(new Date().getTime() + Math.random()*thisMonth),
    duration: 2,
    organizerId: userId,
    location: {
      lat: faker.fake('{{address.latitude}}'),
      lng: faker.fake('{{address.longitude}}'),
      streetAddress: faker.fake('{{address.streetAddress}}'),
      street: faker.fake('{{address.streetName}}'),
      city: faker.fake('{{address.city}}'),
      state: faker.fake('{{address.state}}'),
      country: faker.fake('{{address.country}}'),
      zipcode: faker.fake('{{address.zipCode}}')
    },
    createdAt: new Date(),
    deleted: false
  }
  options.going[userId] = {
    joinedAt: new Date()
  }
  console.log('OPTIONS', options);
  fetch("http://localhost:2403/events", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options)
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.errors) {
      console.log(data.errors);
    }
    else {
      console.log('DATA', data);
    }
  })
  .catch((error) => console.log(error))
  .done()

}

module.exports = seedEvents;
