-- Create the property graph model
CREATE TABLE vertices (
  vertex_id integer PRIMARY KEY,
  properties json
);

CREATE TABLE edges (
  edge_id integer PRIMARY KEY,
  tail_vertex integer REFERENCES vertices (vertex_id),
  head_vertex integer REFERENCES vertices (vertex_id),
  label text,
  properties json
);

CREATE INDEX edges_tails ON edges (tail_vertex);
CREATE INDEX edges_heads ON edges (head_vertex);

-- Add sample people vertices
INSERT INTO vertices (vertex_id, properties)
VALUES (
  1, '{"type": "person", "name": "Lucy"}'
);

INSERT INTO vertices (vertex_id, properties)
VALUES (
  2, '{"type": "person", "name": "Alain"}'
);

-- Add sample location vertices
INSERT INTO vertices (vertex_id, properties)
VALUES (
  3, '{"type":"state", "name":"Idaho", "abbreviation":"ID"}'
);

INSERT INTO vertices (vertex_id, properties)
VALUES (
  4, '{"type":"country", "name":"United States"}'
);

INSERT INTO vertices (vertex_id, properties)
VALUES (
  5, '{"type":"continent", "name":"North America"}'
);

INSERT INTO vertices (vertex_id, properties)
VALUES (
  6, '{"type":"city", "name":"London"}'
);

INSERT INTO vertices (vertex_id, properties)
VALUES (
  7, '{"type":"country", "name":"England"}'
);

INSERT INTO vertices (vertex_id, properties)
VALUES (
  8, '{"type":"country", "name":"United Kingdom"}'
);

INSERT INTO vertices (vertex_id, properties)
VALUES (
  9, '{"type":"country", "name":"Europe"}'
);

INSERT INTO vertices (vertex_id, properties)
VALUES (
  10, '{"type":"city", "name":"Beaune"}'
);

INSERT INTO vertices (vertex_id, properties)
VALUES (
  11, '{"type":"department", "name":"Cote-d\'Or"}'
);

INSERT INTO vertices (vertex_id, properties)
VALUES (
  12, '{"type":"region", "name":"Burgundy"}'
);

INSERT INTO vertices (vertex_id, properties)
VALUES (
  13, '{"type":"country", "name":"France"}'
);

-- Add edge: Lucy born_in Idaho
INSERT INTO edges(edge_id, tail_vertex, head_vertex, label, properties)
VALUES (
  1, 1, 3, 'born_in', '{}'
);

-- Add edge: Idaho within United States
INSERT INTO edges(edge_id, tail_vertex, head_vertex, label, properties)
VALUES (
  2, 3, 4, 'within', '{}'
);

-- Add edge: United States within North America
INSERT INTO edges(edge_id, tail_vertex, head_vertex, label, properties)
VALUES (
  3, 4, 5, 'within', '{}'
);

-- Add edge: Lucy lives_in London
INSERT INTO edges(edge_id, tail_vertex, head_vertex, label, properties)
VALUES (
  4, 1, 6, 'lives_in', '{}'
);

-- TODO: many more edges on p. 50

-- TODO: UNTESTED, my version of mysql doesn't support WITH RECURSIVE =(


-- Use recursive common table expression to recursively find people
--    born in US who migrated to Europe
WITH RECURSIVE

  in_usa(vertex_id) AS (
    SELECT vertex_id FROM vertices WHERE properties->'$.name' = 'United States'
    UNION
    SELECT edges.tail_vertex FROM edges
      JOIN in_usa ON edges.head_vertex = in_usa.vertex_id
     WHERE edges.label = 'within'
  ),

  in_europe(vertex_id) AS (
    SELECT vertex_id FROM vertices WHERE properties->'$.name' = 'Europe'
    UNION
    SELECT edges.tail_vertex FROM edges_heads
      JOIN in_europe ON edges.head_vertex = in_europe.vertex_id
     WHERE edges.label = 'within'
  ),

  born_in_usa(vertex_id) AS (
    SELECT edges.tail_vertex FROM edges
      JOIN in_usa ON edges.head_vertex = in_usa.vertex_id
     WHERE edges.label = 'born_in'
  ),

  lives_in_europe(vertex_id) AS (
    SELECT edges.tail_vertex FROM edges
      JOIN in_europe ON edges.head_vertex = in_europe.vertex_id
     WHERE edges.label = 'lives_in'
  )

SELECT vertices.properties->'$.name'
  FROM vertices
  JOIN born_in_usa ON vertices.vertex_id = in_europe.vertex_id
 WHERE edge.label = 'lives_in';
