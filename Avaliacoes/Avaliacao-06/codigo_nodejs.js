var sqlite3 = require('sqlite3');
 
var db = new sqlite3.Database('BD_SCA.db');
 
db.serialize(function() {
//a tabela professor disciplina não está descrita na atividade do google class mas foi feita na aula anterior
  
//resetando tudo para não dar erro quando for refazer o código
db.run("DROP TABLE TB_ALUNO")
db.run("DROP TABLE TB_PROFESSOR")
db.run("DROP TABLE TB_DISCIPLINA")
db.run("DROP TABLE TB_MATRICULA")
db.run("DROP TABLE TB_PROFESSOR_DISCIPLINA")

// Create a table
db.run("CREATE TABLE IF NOT EXISTS TB_ALUNO (id INTEGER PRIMARY KEY, nome TEXT NOT NULL, cpf TEXT NOT NULL)");

db.run("CREATE TABLE IF NOT EXISTS TB_PROFESSOR (id INTEGER, nome TEXT, PRIMARY KEY ('id' AUTOINCREMENT))");

db.run("CREATE TABLE IF NOT EXISTS TB_DISCIPLINA (id INTEGER, nome TEXT, PRIMARY KEY ('id' AUTOINCREMENT))");

db.run("CREATE TABLE IF NOT EXISTS TB_MATRICULA (id INTEGER,  aluno_id INTEGER, professor_id INTEGER, disciplina_id INTEGER, PRIMARY KEY ('id' AUTOINCREMENT), FOREIGN KEY ('aluno_id') references 'TB_ALUNO'('id'), FOREIGN KEY ('professor_id') references 'TB_PROFESSOR'('id'), FOREIGN KEY ('disciplina_id') references 'TB_DISCIPLINA'('id'))");

db.run("CREATE TABLE IF NOT EXISTS TB_PROFESSOR_DISCIPLINA (id INTEGER PRIMARY KEY, disciplina_id INTEGER NOT NULL, professor_id INTEGER NOT NULL, FOREIGN KEY ('disciplina_id') references 'TB_DISCIPLINA'('id'),FOREIGN KEY ('professor_id') references 'TB_PROFESSOR'('id'))");
 
// Insert data into the table
db.run("INSERT INTO TB_ALUNO (nome, cpf) VALUES ('Maria Yohana', '123.456.789-09')");
db.run("INSERT INTO TB_ALUNO (nome, cpf) VALUES ('Murilo Rodrigues', '321.654.987-56')");
db.run("INSERT INTO TB_ALUNO (nome, cpf) VALUES ('João Gabriel', '987.654.321-05')");

db.run("INSERT INTO TB_PROFESSOR (nome) VALUES ('Taveira')");
db.run("INSERT INTO TB_PROFESSOR (nome) VALUES ('Hairon')");
db.run("INSERT INTO TB_PROFESSOR (nome) VALUES ('Wendell')");

db.run("INSERT INTO TB_DISCIPLINA (nome) VALUES ('Banco de Dados')");
db.run("INSERT INTO TB_DISCIPLINA (nome) VALUES ('Programação de dispositivos móveis')");
db.run("INSERT INTO TB_DISCIPLINA (nome) VALUES ('Redes de Computadores')");

db.run("INSERT INTO TB_MATRICULA (aluno_id, professor_id, disciplina_id) VALUES (1, 1, 1)");
db.run("INSERT INTO TB_MATRICULA (aluno_id, professor_id, disciplina_id) VALUES (1, 2, 2)");
db.run("INSERT INTO TB_MATRICULA (aluno_id, professor_id, disciplina_id) VALUES (1, 3, 3)");
db.run("INSERT INTO TB_MATRICULA (aluno_id, professor_id, disciplina_id) VALUES (2, 1, 1)");
db.run("INSERT INTO TB_MATRICULA (aluno_id, professor_id, disciplina_id) VALUES (2, 2, 2)");
db.run("INSERT INTO TB_MATRICULA (aluno_id, professor_id, disciplina_id) VALUES (2, 3, 3)");
db.run("INSERT INTO TB_MATRICULA (aluno_id, professor_id, disciplina_id) VALUES (3, 1, 1)");
db.run("INSERT INTO TB_MATRICULA (aluno_id, professor_id, disciplina_id) VALUES (3, 2, 2)");
db.run("INSERT INTO TB_MATRICULA (aluno_id, professor_id, disciplina_id) VALUES (3, 3, 3)");

db.run("INSERT INTO TB_PROFESSOR_DISCIPLINA (disciplina_id, professor_id) VALUES (1, 1)");
db.run("INSERT INTO TB_PROFESSOR_DISCIPLINA (disciplina_id, professor_id) VALUES (2, 2)");
db.run("INSERT INTO TB_PROFESSOR_DISCIPLINA (disciplina_id, professor_id) VALUES (3, 3)");

// Query data from the table
 console.log("TABELA ALUNO \n")
  db.each("SELECT id, nome, cpf FROM TB_ALUNO", function(err, row) {
    console.log(row.id + ": " + row.nome + ", " + row.cpf);
  });

console.log("TABELA PROFESSORES \n")
db.each("SELECT id, nome FROM TB_PROFESSOR", function(err, row) {
    console.log(row.id + ": " + row.nome);
  });
 
console.log("TABELA DISCIPLINAS \n")
db.each("SELECT id, nome FROM TB_DISCIPLINA", function(err, row) {
    console.log(row.id + ": " + row.nome);
  });

console.log("TABELA PROFESSOR-DISCIPLINA")
db.each("SELECT id, disciplina_id, professor_id  FROM TB_PROFESSOR_DISCIPLINA", function(err, row) {
    console.log(row.id + ": " + row.disciplina_id + ", " + row.professor_id);
  });
  
console.log("TABELA MATRICULA \n")
db.each("SELECT id, aluno_id, professor_id, disciplina_id FROM TB_MATRICULA", function(err, row) {
    console.log(row.id + ": " + row.aluno_id + ", " + row.professor_id + ", " + row.disciplina_id);
  });


//tentei imprimir no console as tabelas de outro jeito mas não consegui  

// console.log("TABELA MATRÍCULA \n")
// db.each("SELECT TB_MATRICULA.id, TB_ALUNO.nome, TB_PROFESSOR.nome, TB_DISCIPLINA.nome FROM (((TB_MATRICULA INNER JOIN TB_ALUNO ON TB_MATRICULA.aluno_id = TB_ALUNO.id) INNER JOIN TB_PROFESSOR ON TB_MATRICULA.professor_id = TB_PROFESSOR.id) INNER JOIN TB_DISCIPLINA ON TB_MATRICULA.disciplina_id = TB_DISCIPLINA.id)", function(err, row) {
//   console.log(row.id + ": " + row.aluno_id + ", " + row.professor_id + ", " + row.disciplina_id)
// }

 });

db.close();