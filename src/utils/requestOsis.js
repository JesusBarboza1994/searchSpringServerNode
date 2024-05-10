import poolPromise from "../db/sqlServerDB.js";

export default async function requestOsis({osis_code}) {
  try {
    const pool = await poolPromise;
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const result = await pool.request().query(
      `SELECT [prd_codprd],[alm_codalm],[ano_codano],[mes_codmes],CONVERT(INT, [spa_salfin]) AS [spa_salfin] FROM [MRC].[dbo].[SALDOS_PRODUCTOS_SPA] WHERE [prd_codprd] = '${osis_code}' AND ([alm_codalm] = '0055' OR [alm_codalm] = '0010' OR [alm_codalm] = '0025' OR [alm_codalm] = '0037') AND [ano_codano] = ${year} AND [mes_codmes] = ${month};`);
    console.log(result.recordset);
    return result
  } catch (err) {
    console.error('Error al consultar:', err);
  }
}