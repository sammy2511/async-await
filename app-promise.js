const users = [{
  id:1,
  name:'samar',
  schoolId:101
},{
  id:2,
  name:'sammy',
  schoolId:999
}];

const grades = [{
  id:1,
  schoolId:101,
  grade:82
},{
  id:2,
  schoolId:999,
  grade:80
},{
  id:3,
  schoolId:101,
  grade:80
}];


const getUser = (id) => {
  return new Promise((resolve,reject) => {
    const user = users.find((user) => user.id === id);

    if (user) {
        resolve(user);
    }else {
      reject(`Unable to find User with id ${id}.`);
    }
  });
}

const getGrades = (schoolId) => {
  return new Promise((resolve,reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  })
}

const getStatus = (userId) => {
  let user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average;

    if (grades.length > 0) {
      average = grades.map((grade) => grade.grade).reduce((a,b) => a+b)/grades.length;
    }

    return `${user.name} has average of ${average}%`;
  })
}

const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);

  let average;

  if (grades.length > 0) {
    average = grades.map((grade) => grade.grade).reduce((a,b) => a+b)/grades.length;
  }

  return `${user.name} has average of ${average}%`;


}

//
// getUser(3).then((user) => {
//   console.log(user);
// }).catch((e) => {
//   console.log(e);
// })

// getGrades(101).then((grades) => {
//   console.log(grades);
// }).catch((e) => {
//   console.log(e);
// })

// getStatus(1).then((status) => {
//   console.log(status);
// }).catch((e) => {
//   console.log(e);
// })

getStatusAlt(1).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
})
