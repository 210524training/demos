CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TYPE IF EXISTS Role;
CREATE TYPE Role AS ENUM ('Customer', 'Admin');

CREATE TABLE IF NOT EXISTS users (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	username VARCHAR(255) NOT NULL UNIQUE CHECK (LENGTH(username) > 0),
	password VARCHAR(255) NOT NULL CHECK (LENGTH(password) > 0),
	role Role NOT NULL DEFAULT 'Customer',
	address VARCHAR(255),
	phone_number VARCHAR(11) CHECK (phone_number ~ '^\d+$' AND LENGTH(phone_number) >= 10)
);

INSERT INTO public.users (username, password, role)
	VALUES
	('daniel', 'burger', 'Customer');
INSERT INTO public.users (username, password, role, address, phone_number)
	VALUES
	('bobby', 'password123', 'Admin', '221b Baker St', '1112223333'),
	('larry', 'build-a-better-burger', 'Customer', '1 Finite Loop', '9999999999');

DROP TYPE IF EXISTS RestaurantType;
CREATE TYPE RestaurantType AS ENUM ('Fast Food', 'Fast Casual', 'Dine In', 'Formal');

CREATE TABLE IF NOT EXISTS restaurants (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	type RestaurantType NOT NULL,
	rating INTEGER NOT NULL DEFAULT 0,
	img VARCHAR,
	cuisine VARCHAR,
	location VARCHAR,
	name VARCHAR
);

CREATE TABLE IF NOT EXISTS menu (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name VARCHAR NOT NULL,
	price NUMERIC(14, 2) NOT NULL,
	restaurant_id UUID NOT NULL REFERENCES public.restaurants (id)
);

DROP TYPE IF EXISTS Day;
CREATE TYPE Day AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

CREATE TABLE IF NOT EXISTS hours (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	day Day NOT NULL,
	open INTEGER NOT NULL,
	close INTEGER NOT NULL,
	restaurant_id UUID NOT NULL REFERENCES public.restaurants (id)
);

SELECT *
	FROM public.restaurants AS rest
	LEFT JOIN public.menu ON rest.id = menu.restaurant_id
	LEFT JOIN public.hours ON rest.id = hours.restaurant_id



