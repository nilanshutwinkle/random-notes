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

### Databases

```sql
-- Show databases
\l

-- Create database
CREATE DATABASE universities;

-- Connect to database
\c universities;
```

Notes:
* You always connect to a database; `\c` creates a new connection
  - You can omit database from `psql` command if it is same name as user

### Tables

```sql
-- Show tables
\dt   -- basic
\d+   -- includes size, comments

-- Create tables
CREATE TABLE departments (
  code varchar(10) PRIMARY KEY,
  name text UNIQUE NOT NULL,
  CONSTRAINT nonempty_values CHECK (code <> '' AND name <> '')
);

CREATE TABLE programs (
  code varchar(10),
  name text NOT NULL,
  department_code varchar(10),
  PRIMARY KEY (code, department_code),
  FOREIGN KEY (department_code) REFERENCES departments ON DELETE RESTRICT,
  CONSTRAINT nonempty_values CHECK (code <> '' AND name <> '')
);

-- Add index to avoid table scan when deleting departments

CREATE INDEX program_department_code ON programs (department_code);

-- Describe table
\d+ foo
```

See:
* [Constraints](https://www.postgresql.org/docs/9.2/static/ddl-constraints.html): (postgresql.org) `CHECK`, `CONSTRAINT`, `NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `REFERENCES`, `FOREIGN KEY`, `ON DELETE`

### Rows

```sql
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

### Comment

```sql
-- Add comment (description in \d+)
COMMENT ON TABLE departments IS 'Academic departments';
```

### Partitioning
Splitting large table into smaller tables.

Links:
* [Partitioning](https://www.postgresql.org/docs/9.1/static/ddl-partitioning.html): (postgresql.org)

### Misc

| Command       | Description   | Example |
| ------------- |:-------------:| -------:|
| `SHOW rds.extensions` | View installed contributed packages | N/A |
