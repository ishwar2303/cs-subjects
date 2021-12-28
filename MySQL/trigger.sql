-- TRIGGER

DROP TRIGGER IF EXISTS trg_ins_general;

CREATE TRIGGER trg_ins_general
BEFORE INSERT ON learn.general
FOR EACH ROW
SET new.name = UPPER(new.name);