
exports.seed = async function(knex) {
  await knex.raw("SET FOREIGN_KEY_CHECKS=0");
  await knex.raw("TRUNCATE TABLE posts");
  await knex.raw("TRUNCATE TABLE users");
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
      phone_number: '38067987547',
      city: "Los Angeles",
      profile_image: null,
      header_image: null
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
      phone_number: '38067987517',
      city: "Kyiv",
      profile_image: null,
      header_image: null
  }]);
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
