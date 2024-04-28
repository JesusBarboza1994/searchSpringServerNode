import poolPromise from "../db/sqlServerDB.js";

export default async function requestOsis() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT [prd_codprd],[alm_codalm],[ano_codano],[mes_codmes],CONVERT(INT, [spa_salfin]) AS [spa_salfin] FROM [MRC].[dbo].[SALDOS_PRODUCTOS_SPA] WHERE [prd_codprd] = '0000000491' AND ([alm_codalm] = '0055' OR [alm_codalm] = '0010' OR [alm_codalm] = '0025' OR [alm_codalm] = '0037')");
    console.log(result);
    return result
  } catch (err) {
    console.error('Error al consultar:', err);
  }
}