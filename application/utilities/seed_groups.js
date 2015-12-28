import faker from 'faker';
import _ from 'underscore';

let seedGroups = () => {
  let user = {
    id: '123abc',
    username: 'thomasagoldenberg@example.com',
    profile: {
      interests: ['React', 'Meteor'],
    }
  }
  let interest = _.sample(user.profile.interests)
  let endWord = _.sample(['Meet', 'Lunch', 'Enthusiasts'])
  let userId = user['id']
  let options = {
    name: `${interest} ${endWord}`,
    description: faker.fake('{{lorem.paragraph}}'),
    members: {},
    location: {
      lat: 23.0,
      lng: 24.0,
      city: 'West Haven',
      state: 'CT',
      country: 'United States'
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
