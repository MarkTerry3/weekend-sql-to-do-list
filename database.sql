CREATE TABLE "to-do" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (300) NOT NULL,
	"due-by" VARCHAR (300) NOT NULL,
    "completed" BOOLEAN DEFAULT FALSE
);


select * from "to-do";


INSERT INTO "to-do" ("task", "due-by", "completed")
VALUES ($1, $2, $3);

DELETE FROM "to-do" WHERE "id" = $1;