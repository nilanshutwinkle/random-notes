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
| ------------ | ----------- | ----------- |
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

### Rules and Views

When Postgres server receives SQL string, it parses it into AST, and then modifies the tree based on rules. This modified query is sent to the planner for optimization, and then is executed.

#### Views

Note that **views** are a type of rule.

```sql
CREATE OR REPLACE VIEW religious_programs AS
  SELECT code, name
    FROM programs
   WHERE department_code = 'REL';
```

```sql
SELECT * FROM religious_programs;

 code |   name
------+----------
 BUD  | Buddhism
(1 row)
```

Note cannot update a view directly, but can create a rule to do this instead.

#### Rules

```sql
CREATE RULE update_religious_programs AS ON
  UPDATE TO religious_programs DO INSTEAD
  UPDATE programs
     SET code = NEW.code,
         name = NEW.name
   WHERE code = OLD.code;
```

```sql
UPDATE religious_programs
   SET code = 'BDS',
       name = 'Buddhist Studies'
 WHERE code = 'BUD';

NOTICE:  Someone just changed program #BUD
UPDATE 1

SELECT * FROM religious_programs;

 code |       name
------+------------------
 BDS  | Buddhist Studies
```

### Stored Procedures

```sql
CREATE OR REPLACE FUNCTION add_program( program_code varchar(10), program_name text, department_code varchar(10), department_name text )
RETURNS boolean AS $$
DECLARE
  did_insert boolean := false;
  -- matches department_code parameter once tuple found or created
  found_department_code varchar(10);
BEGIN
  SELECT code
    INTO found_department_code
    FROM departments
   WHERE code = department_code
   LIMIT 1;

  IF found_department_code IS NULL THEN
    INSERT INTO departments (code, name)
    VALUES (department_code, department_name)
    RETURNING code INTO found_department_code;

    did_insert := true;
  END IF;

  RAISE NOTICE 'Department code %', found_department_code;

  INSERT INTO programs (code, name, department_code)
       VALUES (program_code, program_name, department_code);

  RETURN did_insert;
END;
$$ LANGUAGE plpgsql;
```

To use:

```sql
SELECT add_program('BUD', 'Buddhist Studies', 'REL', 'Religious Studies');
```

Note that you can store procedure in a file and import:

```sql
\i /Users/me/postgres/add_program.sql
```

Above uses PL/pgSQL, and there's built-in support for Tcl, Perl, Python. There are third-party extensions for other languages.

### Text Searching

Note: can combine multiple text searching methods.

* `LIKE`, `ILIKE`
* Regex, e.g., `SELECT COUNT(*) FROM departments WHERE name !~* '^.*Science';`
* `fuzzystrmatch` module
  - `levenstein`
  - `metaphone`: match based on word sounds
* `pg_trgm` module: trigrams using `gist`-based index
  ```sql
  CREATE INDEX departments_name_trigram ON departments
         USING gist (name gist_trgm_ops);
  SELECT * FROM departments
   WHERE name % 'Computre Sicence';
  ```
* `tsvector` and `tsquery` split strings into tokens, effectively searching against a dictionary of individual words (**lexemes**), ignoring stop words ('a', 'the', etc)

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

### Triggers
Automatically fire when some event happens. Can be triggered before or after inserts or updates.

Adapted from Seven Databases in Seven Weeks (Redmond and Wilson) chapter 2:

```sql
CREATE TABLE programs_change_history (
  old_code varchar(10),
  new_code varchar(10),
  old_name text,
  new_name text,
  old_department_code varchar(10),
  new_department_code varchar(10),
  logged_at timestamp DEFAULT current_timestamp
);

CREATE OR REPLACE FUNCTION log_programs_change() RETURNS trigger AS $$
DECLARE
BEGIN
  INSERT INTO programs_change_history (old_code, new_code, old_name, new_name, old_department_code, new_department_code)
       VALUES (OLD.code, NEW.code, OLD.name, NEW.name, OLD.department_code, NEW.department_code);
  RAISE NOTICE 'Someone just changed program #%', OLD.code;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_programs_change_trigger
 AFTER UPDATE ON programs
 FOR EACH ROW EXECUTE PROCEDURE log_programs_change();
```

```sql
UPDATE programs
   SET name = 'Buddhism'
 WHERE code = 'BUD' AND department_code = 'REL';

NOTICE:  Someone just changed program #BUD
UPDATE 1
```

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
