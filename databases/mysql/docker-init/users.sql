CREATE USER IF NOT EXISTS 'nest_app'@'%' IDENTIFIED BY 'nest_password_123';
GRANT ALL PRIVILEGES ON astronomy_db.* TO 'nest_app'@'%';

CREATE USER IF NOT EXISTS 'grafana_reader'@'%' IDENTIFIED BY 'grafana_secure_pass';
GRANT SELECT ON astronomy_db.* TO 'grafana_reader'@'%';

FLUSH PRIVILEGES;