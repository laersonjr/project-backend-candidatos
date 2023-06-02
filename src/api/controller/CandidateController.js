const candidateService = require("../../service/candidate");
const connection = require("../../data/connection");

class CandidateController {
  static async listAllCandidates(req, res) {
    try {
      const allCandidates = await candidateService.getCandidatesResult();
      return res.status(200).json(allCandidates);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async insertOrUpdateCandidates(req, res) {
    const dataReq = req.body;
    if (dataReq.data_id_comp === null || dataReq.data_id_comp === undefined) {
      try {
        dataReq.data_id_comp = dataReq.data_id ?? null;
        await candidateService.insertCandidateData(dataReq);
        return res.status(200).json(dataReq);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    } else {
      try {
        await candidateService.updateCandidateData(dataReq);
        return res.status(200).json(dataReq);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }
  }

}

module.exports = CandidateController;
