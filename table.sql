--Table des Utilisateurs
CREATE TABLE Utilisateurs (
    user_id SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    mot_de_passe VARCHAR(255) 
);

-- Table des Événements
CREATE TABLE Evenements (
    event_id SERIAL PRIMARY KEY,
    titre VARCHAR(100),
    description TEXT,
    date DATE,
    lieu VARCHAR(100),
    type_evenement VARCHAR(50),
    organisateur_id INT REFERENCES Utilisateurs(user_id)
);

-- Table des Inscriptions
CREATE TABLE Inscriptions (
    registration_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Utilisateurs(user_id),
    event_id INT REFERENCES Evenements(event_id),
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des Feedbacks
CREATE TABLE Feedbacks (
    feedback_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Utilisateurs(user_id),
    event_id INT REFERENCES Evenements(event_id),
    commentaire TEXT,
    note INT CHECK (note >= 1 AND note <= 5) 
);

create table participation(
    participation_id SERIAL PRIMARY KEY,    
    user_id INT REFERENCES Utilisateurs(user_id),
    event_id INT REFERENCES Evenements(event_id),
    )