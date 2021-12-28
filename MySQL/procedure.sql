-- Procedure
DROP PROCEDURE IF EXISTS get_student_count;

DELIMITER $$

CREATE PROCEDURE get_student_count (IN search_name CHAR(50), OUT no_of_students INT)
       BEGIN
         SELECT COUNT(*) INTO no_of_students FROM learn.general
         WHERE NAME = search_name;
       END$$

DELIMITER ;

CALL GET_STUDENT_COUNT('ISHWAR BAISLA', @no_of_students);

