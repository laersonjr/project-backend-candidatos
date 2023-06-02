const connection = require("../data/connection");

const select = `SELECT data_id,
    MAX(CASE WHEN name='NomeCompleto' THEN value END) as nome_completo,
    MAX(CASE WHEN name='Telefone' THEN value END) as telefone,
    MAX(CASE WHEN name='Email' THEN value END) as email,
    MAX(CASE WHEN name='VagaEscolhida' THEN value END) as vaga_escolhida,
    MAX(CASE WHEN name='nivel' THEN value END) as nivel,
    MAX(CASE WHEN name='pretensao' THEN value END) as pretensao,
    MAX(CASE WHEN name='msg' THEN value END) as msg,
    MAX(CASE WHEN name='Arquivo' THEN value END) as arquivo,
    MAX(CASE WHEN name='submit_time' THEN value END) as submit_time,
    MAX(CASE WHEN name='submit_ip' THEN value END) as submit_ip,
    data_id_comp,
    score_media,
    score1,
    score2,
    score3,
    score4,
    score5,
    cargo,
    departamento,
    comentario 

    FROM wp_cf7_vdata_entry
    LEFT JOIN candidatos_comp 
      ON data_id = data_id_comp

    GROUP BY data_id`;

const insertQuery = `
    INSERT INTO candidatos_comp (data_id_comp, score_media, score1, score2, score3, score4, score5, cargo, departamento, comentario)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const updateQuery = `
    UPDATE candidatos_comp
    SET score_media = ?, score1 = ?, score2 = ?, score3 = ?, score4 = ?, score5 = ?, cargo = ?, departamento = ?, comentario = ?
    WHERE data_id_comp = ?`;

async function getCandidatesResult() {
  try {
    const resultList = await connection.query(select);
    console.log(
      `Quantidade de candidatos encontrados: ${resultList[0].length}`
    );
   // console.log(resultList[0]);
    return resultList[0];
  } catch (error) {
    console.error(
      "Ocorreu um erro ao obter os resultados dos candidatos:",
      error
    );
    throw error;
  }
}

async function insertCandidateData(data) {
  try {
    const values = [
      data.data_id_comp,
      data.score_media,
      data.score1,
      data.score2,
      data.score3,
      data.score4,
      data.score5,
      data.cargo,
      data.departamento,
      data.comentario
    ];
    await connection.query(insertQuery, values);
    console.log("Dados do candidato inseridos com sucesso!");
  } catch (error) {
    console.error("Ocorreu um erro ao inserir os dados do candidato:", error);
    throw error;
  }
}

async function updateCandidateData(data) {
  try {
    const values = [
      data.score_media,
      data.score1,
      data.score2,
      data.score3,
      data.score4,
      data.score5,
      data.cargo,
      data.departamento,
      data.comentario,
      data.data_id_comp
    ];
    await connection.query(updateQuery, values);
    console.log("Dados do candidato atualizados com sucesso!");
  } catch (error) {
    console.error("Ocorreu um erro ao atualizar os dados do candidato:", error);
    throw error;
  }
}

module.exports = {
  getCandidatesResult: getCandidatesResult,
  insertCandidateData: insertCandidateData,
  updateCandidateData: updateCandidateData
};

