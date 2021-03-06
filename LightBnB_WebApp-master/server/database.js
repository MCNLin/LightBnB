const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/*------------------- Get a single user from the database given their email -----------------------------*/
const getUserWithEmail = function(email) {

  return pool
    .query('SELECT * FROM users WHERE email = $1', [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch(() => {
      return null;
    });
};
exports.getUserWithEmail = getUserWithEmail;

/*------------------ Get a single user from the database given their id ---------------------------*/
const getUserWithId = function(id) {
  
  return pool
    .query('SELECT * FROM users WHERE users.id = $1', [id])
    .then((result) => result.rows[0])
    .catch(() => {
      return null;
    });
};
exports.getUserWithId = getUserWithId;


/*------------------------- Add a new user to the database ---------------------------------*/
const addUser =  function(user) {
  return pool
    .query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;`, [user.name, user.email, user.password])
    .then((result) => result.rows[0])
    .catch(() => {
      return null;
    });
};
exports.addUser = addUser;

/// Reservations

/*------------------------  Get all reservations for a single user ----------------------------*/
const getAllReservations = function(guest_id, limit = 10) {
  
  return pool
    .query(`
    SELECT * 
    FROM properties
    JOIN reservations ON properties.id = property_id
    WHERE guest_id = $1 
    LIMIT $2;`, [guest_id,limit])
  
    .then((result) => {
      return result.rows
    })
    .catch(() => {
      return null;
  });
  
};
exports.getAllReservations = getAllReservations;

/// Properties

/*------------------------------ Get all properties ------------------------------*/
 const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
    let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    `;
    
    if (options.owner_id) {
      queryParams.push(options.owner_id);
      queryString += `WHERE properties.owner_id = $${queryParams.length} `;
    }

    if (options.city) {
    queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }
    
    
    if (options.minimum_price_per_night){
      queryParams.push(options.minimum_price_per_night * 100);
      options.city ? queryString += ` AND `: queryString += ` WHERE `;
      queryString += ` properties.cost_per_night >= $${queryParams.length}`;
    }

    if(options.maximum_price_per_night) {
      queryParams.push(options.maximum_price_per_night * 100);
      options.city || options.minimum_price_per_night ? queryString += ` AND `: queryString += ` WHERE `;
      queryString += ` properties.cost_per_night <= $${queryParams.length}`;
    }

    queryString += `
    GROUP BY properties.id`

   if (options.minimum_rating) {
     queryParams.push(options.minimum_rating);
     queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
   }

    queryParams.push(limit);
    queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  console.log('String------>',queryString)
  console.log('Params-------->',queryParams)
    return pool.query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};
exports.getAllProperties = getAllProperties;

/*------------- Add a property to the database -------------------------------*/
const addProperty = function(property) {
  const queryParams = [
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.country,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
  ];
  const queryString =`
    INSERT INTO properties (
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    RETURNING *;`;
  return pool
  .query(queryString, queryParams)
  .then((result) => {
  return result.rows
  })
  .catch(() => {
    return null
  });
};

exports.addProperty = addProperty;
