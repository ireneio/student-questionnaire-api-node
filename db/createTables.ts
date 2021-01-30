function createTable(dbName: string, schemaName: string, tableName: string, columns: any): boolean {
  const sql: string = `CREATE TABLE
  { ${dbName}.${schemaName}.${tableName} | ${schemaName}.${tableName} | ${tableName} }
  ( { ${`Id INT, username varchar(255), password varchar(32)`}
  | [ <table_constraint> ] [ ,... n ]
  | [ <table_index> ]
    [ ,... n ] }
    [ PERIOD FOR SYSTEM_TIME ( system_start_time_column_name
      , system_end_time_column_name ) ]
  )
  [ WITH ( <table_option> [ ,... n ] ) ]
  [ ; ]

  <column_definition> ::=
  column_name <data_type>
  [ COLLATE collation_name ]
  [ GENERATED ALWAYS AS ROW { START | END } [ HIDDEN ] ]
  [ NULL | NOT NULL ]
  [
  [ CONSTRAINT constraint_name ] DEFAULT memory_optimized_constant_expression ]
  | [ IDENTITY [ ( 1, 1 ) ]
  ]
  [ <column_constraint> ]
  [ <column_index> ]

  <data_type> ::=
  [type_schema_name . ] type_name [ (precision [ , scale ]) ]

  <column_constraint> ::=
  [ CONSTRAINT constraint_name ]
  {
  { PRIMARY KEY | UNIQUE }
    {   NONCLUSTERED
      | NONCLUSTERED HASH WITH (BUCKET_COUNT = bucket_count)
    }
  | [ FOREIGN KEY ]
      REFERENCES [ schema_name . ] referenced_table_name [ ( ref_column ) ]
  | CHECK ( logical_expression )
  }

  < table_constraint > ::=
  [ CONSTRAINT constraint_name ]
  {
  { PRIMARY KEY | UNIQUE }
   {
     NONCLUSTERED (column [ ASC | DESC ] [ ,... n ])
     | NONCLUSTERED HASH (column [ ,... n ] ) WITH ( BUCKET_COUNT = bucket_count )
                  }
  | FOREIGN KEY
      ( column [ ,...n ] )
      REFERENCES referenced_table_name [ ( ref_column [ ,...n ] ) ]
  | CHECK ( logical_expression )
  }

  <column_index> ::=
  INDEX index_name
  { [ NONCLUSTERED ] | [ NONCLUSTERED ] HASH WITH (BUCKET_COUNT = bucket_count)}

  <table_index> ::=
  INDEX index_name
  {   [ NONCLUSTERED ] HASH (column [ ,... n ] ) WITH (BUCKET_COUNT = bucket_count)
  | [ NONCLUSTERED ] (column [ ASC | DESC ] [ ,... n ] )
    [ ON filegroup_name | default ]
  | CLUSTERED COLUMNSTORE [WITH ( COMPRESSION_DELAY = {0 | delay [Minutes]})]
    [ ON filegroup_name | default ]

  }

  <table_option> ::=
  {
  MEMORY_OPTIMIZED = ON
  | DURABILITY = {SCHEMA_ONLY | SCHEMA_AND_DATA}
  | SYSTEM_VERSIONING = ON [ ( HISTORY_TABLE = schema_name . history_table_name
      [, DATA_CONSISTENCY_CHECK = { ON | OFF } ] ) ]

  }`

  return true
}


