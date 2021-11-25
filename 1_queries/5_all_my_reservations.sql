SELECT properties.id,properties.title,properties.cost_per_night, avg(property_reviews.rating) as average_rating
FROM reservations
JOIN properties ON properties.id = property_id
JOIN property_reviews ON reservations.id = reservation_id
JOIN users ON users.id = reservations.guest_id
WHERE users.id = 1 AND reservations.end_date < NOW()::date
GROUP BY reservations.id , properties.id
ORDER BY reservations.start_date
LIMIT 10;