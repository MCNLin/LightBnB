INSERT INTO users (id, name, email, password) VALUES 
(1,'Celeste Night','girlonthemoon@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2,'Charles Mann','themainone.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3,'Dominic Parks ','victoriablackwell@outlook.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(4,'Sue Luna ','jasonvincent@gmx.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(5,'Rosalie Garza','jacksondavid@gmx.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms, country,street,city,province,post_code,active)  VALUES
(1,'Moon Palace','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',100000,7,8,12,'Canada','177 Moonlight Blvd','Toronto', 'Ontario', '1770017', true),
(4,'The Cove','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',5500,0,1,1,'Canada','1285 La Rue','Montreal', 'Quebec', '025181', true),
(5,'Blank Corner','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',13650,2,1,2,'Canada','10 St.George Street','Vancouver', 'British Columbia', '986595', true),
(3,'Shine Twenty','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',7915,1,1,1,'Canada','98896 Wolfe Drive','Saskatoon', 'Saskatchewan', '90210', true),
(2,'Game Land','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',50018,3,3,5,'Canada','574 Lobster Ave','St.John', 'Nova Scotia', '15987', true);

INSERT INTO reservations (start_date,end_date,property_id, guest_id) VALUES
('2021-09-11', '2021-09-26',2,3),
('2019-01-04', '2019-02-01',1,4),
('2021-10-01', '2021-10-14',2,1),
('2022-10-04', '2022-10-23',5,5),
('2023-05-27', '2023-05-28',4,2);

INSERT INTO property_reviews (guest_id,property_id,reservation_id,rating,message) VALUES
(1,5,1,4,'messages'),
(2,4,2,4,'messages'),
(3,3,3,3,'messages'),
(4,2,4,4,'messages'),
(5,1,5,5,'messages');

