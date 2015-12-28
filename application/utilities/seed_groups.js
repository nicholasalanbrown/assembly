import faker from 'faker';
import _ from 'underscore';

let seedGroups = (user) => {
  // console.log('GROUP USER', user);
  let interest = _.sample(user.profile.interests)
  let endWord = _.sample(['Meet', 'Lunch', 'Enthusiasts'])
  let userId = user.profile.facebookId
  let options = {
    name: `${interest} ${endWord}`,
    description: faker.fake('{{lorem.paragraph}}'),
    members: {},
    location: {
      lat: faker.fake('{{address.latitude}}'),
      lng: faker.fake('{{address.longitude}}'),
      city: faker.fake('{{address.city}}'),
      state: faker.fake('{{address.state}}'),
      country: faker.fake('{{address.country}}'),
      zipcode: faker.fake('{{address.zipCode}}')
    },
    createdAt: new Date().toLocaleDateString()
  }
  options.members[userId] = {
    confirmed: true,
    deleted: false,
    role: 'owner',
    joinedAt: new Date().toLocaleDateString()
  }
  console.log('OPTIONS', options);
  fetch("http://localhost:2403/groups", {
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

module.exports = seedGroups;
