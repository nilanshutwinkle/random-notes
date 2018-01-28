# PostgreSQL

```sh
$ psql -h <host> -p <port> -U <username> <database>
```

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
\d departments  -- basic
\d+ departments -- includes storage, stats, comments
```

See:
* [Constraints](https://www.postgresql.org/docs/9.2/static/ddl-constraints.html): (postgresql.org) `CHECK`, `CONSTRAINT`, `NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `REFERENCES`, `FOREIGN KEY`, `ON DELETE`

### Rows

```sql
-- Create
INSERT INTO departments(code, name)
     VALUES ('MATH','Mathematics'),
            ('CSC', 'Computer Science'),
            ('PHYS', 'Chemistry');

INSERT INTO programs(code, name, department_code)
     VALUES ('ML', 'Machine Learning', 'CSC'),
            ('WEB', 'Web Application Development', 'CSC');

-- Read
SELECT * FROM departments;

SELECT p.name as program_name,
       d.name as department_name
  FROM programs as p
  JOIN departments as d
    ON p.department_code = d.code;

-- Update
UPDATE departments
   SET name = 'Physics'
 WHERE code = 'PHYS';

-- Delete
DELETE FROM departments
      WHERE code = 'PHYS';
```

### Help

| Command       | Description   | Example |
| ------------- |:-------------:| -------:|
| `\h` | Help with SQL command | `\h CREATE DATABASE` |
| `\?` | Help with Postgres command | N/A |

## Advanced

### Comment

```sql
-- Add comment (description in \d+)
COMMENT ON TABLE departments IS 'Academic departments';
```

### Execution Plans

```sql
-- Show query plan
EXPLAIN SELECT p.name as program_name,
               d.name as department_name
          FROM programs as p
          JOIN departments as d
            ON p.department_code = d.code
         WHERE p.code = 'CSC';

-- Show query plan and run
EXPLAIN ANALYZE
         SELECT p.name as program_name,
                d.name as department_name
           FROM programs as p
           JOIN departments as d
             ON p.department_code = d.code
          WHERE p.code = 'CSC';
```

### Partitioning
Splitting large table into smaller tables.

See:
* [Partitioning](https://www.postgresql.org/docs/9.1/static/ddl-partitioning.html): (postgresql.org)

### Transactions

```sql
-- Start a tx, do somethings, and commit
BEGIN;
...
COMMIT;

-- Start a tx, do somethings, then cancel
BEGIN;
... -- oops
ROLLBACK;

-- Use savepoints within a tx
BEGIN;
...
SAVEPOINT savepoint_1;
... -- oops
ROLLBACK TO savepoint_1;
...
COMMIT;
```

### Misc

| Command       | Description   | Example |
| ------------- |:-------------:| -------:|
| `SHOW rds.extensions` | View installed contributed packages | N/A |

## Theory
* Based on branch of set theory called relational algebra
* Relations = tables
* Tuples = rows
