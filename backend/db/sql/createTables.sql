CREATE TABLE USER (
	userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	userName VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	pass VARCHAR(80) NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE ROADMAP (
	roadmapID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	userID INT NOT NULL,
	roadmapTitle VARCHAR(200) NOT NULL,
	likes INT NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
	FOREIGN KEY (userID)
		REFERENCES USER(userID)
		ON DELETE CASCADE
);

CREATE TABLE STOP (
	stopID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	roadmapID INT NOT NULL,
	stopTitle VARCHAR(200) NOT NULL,
	markdown LONGTEXT NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
	FOREIGN KEY (roadmapID)
		REFERENCES ROADMAP(roadmapID)
		ON DELETE CASCADE
);

CREATE TABLE CONNECTION (
	startID INT NOT NULL,
	endID INT NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
	FOREIGN KEY (startID) REFERENCES STOP(stopID),
	FOREIGN KEY (endID) REFERENCES STOP(stopID),
	PRIMARY KEY(startID, endID)
);