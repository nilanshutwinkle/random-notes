# PostgreSQL

```sh
$ psql -h <host> -p <port> -U <username> <database> -W
```

Note: trailing `-W` proactively prompts for password, saving round trip.

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

-- Create with auto-incrementing id
CREATE TABLE foo (
  id SERIAL PRIMARY KEY,
  ...
);

-- Describe table
\d departments  -- basic
\d+ departments -- includes storage, stats, comments
```

See:
* [Constraints](https://www.postgresql.org/docs/9.2/static/ddl-constraints.html): (postgresql.org) `CHECK`, `CONSTRAINT`, `NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `REFERENCES`, `FOREIGN KEY`, `ON DELETE`
* [Data Types](https://www.postgresql.org/docs/9.5/static/datatype.html): (postgresql.org)

### Indices

```sql
-- Add btree index (good for range queries) to avoid table scan when deleting departments
CREATE INDEX program_department_code
          ON programs (department_code);

-- same as ...
CREATE INDEX program_department_code
          ON programs USING btree(department_code);

-- Also `USING hash(department_code)`, which is good for exact match

-- List all indices
\di
```

### Rows

```sql
-- Create
INSERT INTO departments(code, name)
     VALUES ('MATH','Mathematics'),
            ('CSC', 'Computer Science'),
            ('PHYS', 'Chemistry');

INSERT INTO programs(code, name, department_code)
     VALUES ('ML', 'Machine Learning', 'CSC'),
            ('WEB', 'Web Application Development', 'CSC')
  RETURNING code;

INSERT INTO programs(code, name, department_code)
  VALUES ('QP', 'Quantum Physics', (
    SELECT code
      FROM departments
     WHERE name = 'Physics'
  )
);

-- Read
SELECT * FROM departments;

SELECT count(name)
  FROM departments
 WHERE name LIKE '%Science%';

  SELECT department_code, count(*)
    FROM programs
GROUP BY department_code
  HAVING count(*) >= 2;

-- Following two are equivalent:
SELECT DISTINCT department_code FROM programs;
SELECT department_code FROM programs GROUP BY department_code;

-- Read with join.
-- Options: INNER (default), LEFT, RIGHT, OUTER (union).
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

### Locks

#### Table-level locks

| Access Level | Description | Acquired By |
|:------:| |:---------:| -----------:|
| ACCESS SHARE | Read lock | `SELECT` |
| ROW SHARE | Block row from update for remainder of transaction | `SELECT FOR UPDATE`, `SELECT FOR SHARE` |
| ROW EXCLUSIVE | Lock for modifying data | `UPDATE`, `DELETE`, `INSERT` |
| SHARE UPDATE EXCLUSIVE | Protect against concurrent schema changes, vacuums | `VACUUM`, `ANALYZE`, misc |
| SHARE | Protect against concurrent data changes | `CREATE INDEX` |
| SHARE ROW EXCLUSIVE | Like SHARE, but only one session can concurrently hold | Manually only |
| EXCLUSIVE | Allows reads with ACCESS SHARE lock | Manually only |
| ACCESS EXCLUSIVE | No other concurrent access permitted | `ALTER TABLE`, `DROP TABLE`, `TRUNCATE`, `REINDEX`, `CLUSTER`, and `VACUUM FULL` |

Note that queries will acquire appropriate locks, though can explicitly acquire locks with `LOCK` command:

```sql
LOCK TABLE departments IN SHARE MODE;
```

Locks normally held for duration of transaction, though released if a rollback to savepoint.

#### Row-level locks

Row-level locks are either exclusive or shared, are acquired automatically on update/delete, and only block writers to the same row.

Can be manually acquired via `SELECT FOR UPDATE` or `SELECT FOR SHARE`.

#### Deadlocks

Postgres automatically detects and aborts one of the transactions. Best way to prevent is to acquire locks in same order, with the greatest needed restriction acquired upfront.

### Partitioning
Splitting large table into smaller tables. This can improve query performance, avoids vacuum overhead when deleting partitions, and enables moving older partitions to cheaper storage.

Implemented via table inheritance, table constraints, and a trigger.

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

By default, every SQL command is implicitly wrapped in a transaction.

Follows ACID:
* **Atomic**: all or nothing.
* **Consistent**: doesn't transition data to inconsistent state in terms of constraints, cascades, triggers.
* **Isolated**: cannot read data from other uncommitted transactions.
* **Durable**: once committed, data is safe.

### Window functions

Return all matches, with each row including results of any aggregate functions.

```sql
SELECT d.name, p.name, count(*)
  OVER (
    PARTITION BY p.department_code
  )
  FROM programs as p
  JOIN departments as d
    ON d.code = p.department_code;

    name         |            name             | count
-----------------+-----------------------------+-------
Computer Science | Machine Learning            |     2
Computer Science | Web Application Development |     2
Physics          | Quantum Physics             |     1
(3 rows)
```

### Misc

| Command       | Description   | Example |
| ------------- |:-------------:| -------:|
| `SHOW rds.extensions` | View installed contributed packages | N/A |

## Theory
* Based on branch of set theory called relational algebra
* Relations = tables
* Tuples = rows
