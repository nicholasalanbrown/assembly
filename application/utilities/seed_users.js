import _ from 'underscore';
import seedGroups from './seed_groups';
import Technologies from '../technologies';

let seedUsers = () => {
  console.log('REMOVE DATA');
  fetch('http://localhost:2403/groups?{"id": {"$ne": 10}}', {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.errors) {
        console.log(data.errors);
    }
    else {
      console.log('REMOVING', data);
    }
  })
  .catch((error) => console.log(error))
  .done();

  // fetch('http://localhost:2403/users?{"id": {"$ne": 10}}', {
  //   method: "DELETE",
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   }
  // })
  // .then((response) => response.json())
  // .then((data) => {
  //   if (data.errors) {
  //       console.log(data.errors);
  //   }
  //   else {
  //     console.log('REMOVING', data);
  //   }
  // })
  // .catch((error) => console.log(error))
  // .done();
  let options = {};

  _.each(_.range(100), function(){
    fetch('https://randomuser.me/api/')
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) console.log(data.errors);
      else {
        let user = data.results[0].user;
        // seedGroups(user);
        let interestNumber = _.sample([1,2,3])
        let interests = _.sample(Technologies, interestNumber);
        let name = `${user.name.first} ${user.name.last}`;
        // console.log('USER INFO', name, interests, user.email, user.md5, user.picture.large)
        options = {
          username: user.email,
          password: user.md5,
          token: "",
          tokenExpirationDate: "",
          profile: {
            facebookId: user.md5,
            name: name,
            email: user.email,
            picture: user.picture.large,
            interests: interests
          }
        }

        console.log('OPTIONS', options);
        fetch("http://localhost:2403/users", {
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
            console.log('DATA FROM USER FETCH', data);
            seedGroups(options);
          }
        })
        .catch((error) => console.log(error))
        .done()
      }
    })
  })
}

module.exports = seedUsers;
