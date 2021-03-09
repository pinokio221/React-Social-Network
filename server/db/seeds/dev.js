
exports.seed = async function(knex) {
  await knex.raw("SET FOREIGN_KEY_CHECKS=0");
  await knex.raw("TRUNCATE TABLE posts");
  await knex.raw("TRUNCATE TABLE users");
  await knex.raw("TRUNCATE TABLE friends");
  await knex.raw("SET FOREIGN_KEY_CHECKS=1");
  

  await knex('users').insert([{
      login: "alexmenc223",
      email: "alexandro223@gmail.com",
      password: "semen112345",
      first_name: "Alex",
      last_name: "Menco",
      fullname: "Alex Menco",
      gender: "M",
      status: "All okay",
      birthday: "1998-11-20",
      registered_date: "2021-02-23",
      age: 25,
      city: "Los Angeles"
    
  },
  {
      login: "borisikk",
      email: "borya223@gmail.com",
      password: "123456799",
      first_name: "Boris",
      last_name: "Gylav",
      fullname: "Boris Gylav",
      gender: "M",
      status: "test",
      birthday: "1998-11-20",
      registered_date: "2021-02-23",
      age: 25,
      city: "Kyiv"
  
  },
  {
    login: "hillary",
    email: "hillary@gmail.com",
    password: "123456799",
    first_name: "Hillary",
    last_name: "Clinton",
    fullname: "Hillary Clinton",
    gender: "M",
    status: "test",
    birthday: "1998-11-20",
    registered_date: "2021-02-23",
    age: 25,
    city: "Kyiv"
    
  },
  {
    login: "john",
    email: "johnny@gmail.com",
    password: "123456799",
    first_name: "Johnny",
    last_name: "Gnom",
    fullname: "Johnny Gnom",
    gender: "M",
    status: "test",
    birthday: "1998-11-20",
    registered_date: "2021-02-23",
    age: 25,
    city: "Kyiv"
    
  },
  {
    login: "billy223",
    email: "billclinton@gmail.com",
    password: "123456799",
    first_name: "Bill",
    last_name: "Clinton",
    fullname: "Bill Clinton",
    gender: "M",
    status: "test",
    birthday: "1998-11-20",
    registered_date: "2021-02-23",
    age: 25,
    city: "Kyiv"
    
  },
  {
    login: "barak223",
    email: "barak765@gmail.com",
    password: "123456799",
    first_name: "Barak",
    last_name: "Obama",
    fullname: "Barak Obama",
    gender: "M",
    status: "test",
    birthday: "1998-11-20",
    registered_date: "2021-02-23",
    age: 41,
    city: "Los Angeles"
    
  },
  {
    login: "george",
    email: "gorgre123@gmail.com",
    password: "123456799",
    first_name: "George",
    last_name: "Washington",
    fullname: "George Washington",
    gender: "M",
    status: "test",
    birthday: "1998-11-20",
    registered_date: "2021-02-23",
    age: 25,
    city: "Kyiv"
    
  },
  {
    login: "borsky",
    email: "bosky123@gmail.com",
    password: "123456799",
    first_name: "Vladimir",
    last_name: "Boyarsky",
    fullname: "Vladimir Boyarsky",
    gender: "M",
    status: "test",
    birthday: "1998-11-20",
    registered_date: "2021-02-23",
    age: 25,
    city: "Moscow"
    
  }

]);
  await knex('posts').insert([{
      user_id: 1,
      content: "This is my first post",
      likes: 100,
      comments: 53,
      reposts: 12
    },
    {
      user_id: 1,
      content: "This is my second post",
      likes: 114,
      comments: 76,
      reposts: 19
  }
]);
  
};
