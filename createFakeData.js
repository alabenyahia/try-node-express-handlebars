const faker = require('faker');
const fs = require('fs');

// create fake JSON data and write them to data.js
let dt = [];
for (let i=0; i<200;i++) {
    dt.push({
        id: i+1,
        name: faker.name.findName(),
        email: faker.internet.email()
    })
}

fs.writeFile('data.js', JSON.stringify({persons:dt}, null, 2), e =>{
    if (e) throw e
    console.log('file created');
});

console.log(dt);