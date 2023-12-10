import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable("comments")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("page", "varchar(256)")
    .addColumn("threadId", "integer")
    .addColumn("author", "varchar(256)", (col) => col.notNull())
    .addColumn("content", "json", (col) => col.notNull())
    .addColumn("timestamp", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createIndex("comments_page_id_index")
    .on("comments")
    .column("page")
    .execute();

  await db.schema
    .createTable("rates")
    .addColumn("userId", "varchar(256)")
    .addColumn("commentId", "integer")
    .addColumn("like", "boolean", (col) => col.notNull())
    .addPrimaryKeyConstraint("rates_pk", ["commentId", "userId"])
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("rates").ifExists().execute();
  await db.schema.dropTable("comments").ifExists().execute();
  await db.schema.dropIndex("comments_page_id_index").ifExists().execute();
}
