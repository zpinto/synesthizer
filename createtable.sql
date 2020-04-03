DROP TABLE track;
DROP TABLE track_meta;
DROP TABLE album;
DROP TABLE track_in_album;
DROP TABLE artist;
DROP TABLE artist_in_track;
DROP TABLE genre;
DROP TABLE genre_in_track;
DROP TABLE customer;
DROP TABLE sale;
DROP TABLE credit_card;
DROP TABLE rating;


CREATE TABLE track_meta (
    id VARCHAR(25) NOT NULL,
    acousticness FLOAT,
    analysis_url VARCHAR(200),
    danceability FLOAT,
    duration_ms  INTEGER,
    energy FLOAT,
    instrumentalness FLOAT,
    note INTEGER,
    liveness FLOAT,
    loudness FLOAT,
    mode INTEGER,
    speechiness FLOAT,
    tempo FLOAT,
    time_signature INTEGER,
    track_href VARCHAR(200),
    type VARCHAR(60),
    uri VARCHAR(200),
    valence FLOAT,
    PRIMARY KEY (id)
);


CREATE TABLE track (
    id VARCHAR(25) NOT NULL,
    name VARCHAR(100) NOT NULL,
    track_number integer NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES track_meta(id)
);

-- Need to add to this
CREATE TABLE album (
    id VARCHAR(25) NOT NULL,
    album_type VARCHAR(25),
    image VARCHAR(200),
    release_date VARCHAR(40),
    PRIMARY KEY (id)
);

CREATE TABLE track_in_album (
    track_id VARCHAR(25) NOT NULL,
    album_id VARCHAR(25) NOT NULL,
    FOREIGN KEY (track_id) REFERENCES track(id),
    FOREIGN KEY (album_id) REFERENCES album(id)
);

-- Need to fix
CREATE TABLE album_in_genre (
    genre VARCHAR(25) NOT NULL,
    album_id VARCHAR(25) NOT NULL,
    FOREIGN KEY (album_id) REFERENCES album(id)
);

CREATE TABLE artist (
    id VARCHAR(25) NOT NULL,
    name VARCHAR(40) NOT NULL,
    image VARCHAR(200) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE artist_in_track (
    artist_id VARCHAR(25) NOT NULL,
    track_id VARCHAR(25) NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artist(id),
    FOREIGN KEY (track_id) REFERENCES track(id)
);

CREATE TABLE artist_in_genre (
    genre VARCHAR(25) NOT NULL,
    track_id VARCHAR(25) NOT NULL,
    FOREIGN KEY (track_id) REFERENCES track(id)
);


-- user data


CREATE TABLE user (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    address VARCHAR(200) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE playlist (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(300) NOT NULL,
    image VARCHAR(300),
    creation_date DATE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE playlist_to_user (
    playlist_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES playlist(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE track_in_playlist (
    track_id VARCHAR(25) NOT NULL,
    playlist_id INTEGER NOT NULL,
    FOREIGN KEY (track_id) REFERENCES track(id),
    FOREIGN KEY (playlist_id) REFERENCES playlist(id)
);
