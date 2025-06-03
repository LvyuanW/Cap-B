-- 1. Team Descriptions
CREATE TABLE team_descriptions (
    uid VARCHAR(64) PRIMARY KEY COMMENT 'Unique ID of the team description',
    content TEXT COMMENT 'Content describing the team',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    deleted_at DATETIME DEFAULT NULL COMMENT 'Deletion timestamp (for logical deletion)',
    is_deleted TINYINT(1) DEFAULT 0 COMMENT 'Logical deletion flag: 0 = active, 1 = deleted'
) COMMENT='Descriptions about the team';

-- 2. Research Areas
CREATE TABLE research_areas (
    uid VARCHAR(64) PRIMARY KEY COMMENT 'Unique ID of the research area',
    content TEXT COMMENT 'Description of the research area',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    deleted_at DATETIME DEFAULT NULL COMMENT 'Deletion timestamp (for logical deletion)',
    is_deleted TINYINT(1) DEFAULT 0 COMMENT 'Logical deletion flag: 0 = active, 1 = deleted'
) COMMENT='Fields or topics of research';

-- 3. News
CREATE TABLE news (
    uid VARCHAR(64) PRIMARY KEY COMMENT 'Unique ID of the news item',
    title VARCHAR(255) NOT NULL COMMENT 'Title of the news article',
    content TEXT COMMENT 'Full content of the news article',
    image_url VARCHAR(512) DEFAULT NULL COMMENT 'URL of the associated image',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    deleted_at DATETIME DEFAULT NULL COMMENT 'Deletion timestamp (for logical deletion)',
    is_deleted TINYINT(1) DEFAULT 0 COMMENT 'Logical deletion flag: 0 = active, 1 = deleted'
) COMMENT='News and announcements';

-- 4. Research Projects
CREATE TABLE research_projects (
    uid VARCHAR(64) PRIMARY KEY COMMENT 'Unique ID of the research project',
    title VARCHAR(255) NOT NULL COMMENT 'Title of the project',
    description TEXT COMMENT 'Detailed description of the project',
    image_url VARCHAR(512) DEFAULT NULL COMMENT 'Image representing the project',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    deleted_at DATETIME DEFAULT NULL COMMENT 'Deletion timestamp (for logical deletion)',
    is_deleted TINYINT(1) DEFAULT 0 COMMENT 'Logical deletion flag: 0 = active, 1 = deleted'
) COMMENT='Ongoing or past research projects';

-- 5. Team Members
CREATE TABLE team_members (
    uid VARCHAR(64) PRIMARY KEY COMMENT 'Unique ID of the team member',
    avatar_url VARCHAR(512) DEFAULT NULL COMMENT 'URL to the avatar image',
    title VARCHAR(128) COMMENT 'Full name or title of the member',
    role VARCHAR(128) COMMENT 'Role in the team (e.g., Professor, Researcher)',
    responsibilities VARCHAR(128) DEFAULT NULL COMMENT 'responsibilities',
    degree VARCHAR(128) DEFAULT NULL COMMENT 'Academic degree (e.g., PhD, MSc)',
    university VARCHAR(255) DEFAULT NULL COMMENT 'Affiliated university or institution',
    description TEXT COMMENT 'Short bio or description of the member',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    deleted_at DATETIME DEFAULT NULL COMMENT 'Deletion timestamp (for logical deletion)',
    is_deleted TINYINT(1) DEFAULT 0 COMMENT 'Logical deletion flag: 0 = active, 1 = deleted'
) COMMENT='Information about team members';

-- 6. Messages
CREATE TABLE messages (
    uid VARCHAR(64) PRIMARY KEY COMMENT 'Unique ID of the message',
    name VARCHAR(128) NOT NULL COMMENT 'Sender\'s name',
    email VARCHAR(128) NOT NULL COMMENT 'Sender\'s email address',
    subject VARCHAR(255) COMMENT 'Subject of the message',
    message TEXT COMMENT 'Message content',
    is_read TINYINT(1) DEFAULT 0 COMMENT 'Read status: 0 = unread, 1 = read',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    deleted_at DATETIME DEFAULT NULL COMMENT 'Deletion timestamp (for logical deletion)',
    is_deleted TINYINT(1) DEFAULT 0 COMMENT 'Logical deletion flag: 0 = active, 1 = deleted'
) COMMENT='User-submitted messages through the contact form';

-- 7. Users
CREATE TABLE users (
    uid VARCHAR(64) PRIMARY KEY COMMENT 'Unique ID of the user',
    username VARCHAR(64) NOT NULL UNIQUE COMMENT 'Username for login or display',
    password VARCHAR(255) NOT NULL COMMENT 'Hashed password',
    email VARCHAR(128) NOT NULL UNIQUE COMMENT 'User email address',
    role VARCHAR(64) DEFAULT 'user' COMMENT 'User role (e.g., admin, editor, viewer)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
    deleted_at DATETIME DEFAULT NULL COMMENT 'Deletion timestamp (for logical deletion)',
    is_deleted TINYINT(1) DEFAULT 0 COMMENT 'Logical deletion flag: 0 = active, 1 = deleted'
) COMMENT='System users table for authentication and access control';
