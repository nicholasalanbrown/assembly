import _ from 'underscore';

let seed = () => {
  fetch('http://localhost:2403/users?{"id": {"$ne": 10}}', {
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


  _.each(_.range(100), function(){
    fetch('https://randomuser.me/api/')
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) console.log(data.errors);
      else {
        let user = data.results[0].user;
        console.log('USER', user);
        let interestNumber = _.sample([1,2,3])
        let interests = _.sample(Technologies, interestNumber);
        let options = {
          username: user.email,
          password: user.md5,
          token: "",
          tokenExpirationDate: null,
          profile: {
            facebookId: user.md5,
            name: `${user.name.first} ${user.name.last}`,
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
              console.log('DATA', data);
            }
        })
        .catch((error) => console.log(error))
        .done()
      }
    })
  })
}

module.exports = seed;
