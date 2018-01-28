# PostgreSQL

```sh
$ psql -h <host> -p <port> -U <username> <database>
```

## Help

| Command       | Description   | Example |
| ------------- |:-------------:| -------:|
| `\h` | Help with SQL command | `\h CREATE DATABASE` |
| `\?` | Help with Postgres command | N/A |

## Basic

```sql
-- Show tables
\dt   -- basic
\d+   -- includes size, comments

-- Create tables
CREATE TABLE departments (
  code varchar(10) PRIMARY KEY,
  name text UNIQUE NOT NULL
);

CREATE TABLE programs (
  code varchar(10) CHECK (code <> ''),
  department_code varchar(10) REFERENCES departments (code),
  name text NOT NULL,
  PRIMARY KEY (code, department_code)
);

-- Describe table
\d+ foo

-- Insert rows
INSERT INTO departments(code, name)
     VALUES ('MATH','Mathematics'),
            ('CSC', 'Computer Science'),
            ('PHYS', 'Chemistry');

-- Select rows
SELECT * FROM departments;

SELECT p.name as program_name,
       d.name as department_name
  FROM program as p
  JOIN department as d
    ON p.code = d.department_code;

-- Updates
UPDATE departments
   SET name = 'Physics'
 WHERE code = 'PHYS';

-- Delete rows
DELETE FROM departments
      WHERE code = 'PHYS';
```

## Theory
* Based on branch of set theory called relational algebra
* Relations = tables
* Tuples = rows

## Advanced

```sql
-- Add comment (description in \d+)
COMMENT ON TABLE departments IS 'Academic departments';
```

| Command       | Description   | Example |
| ------------- |:-------------:| -------:|
| `SHOW rds.extensions` | View installed contributed packages | N/A |
