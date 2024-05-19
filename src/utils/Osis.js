import poolPromise from "../db/sqlServerDB.js";
export default class Osis {
  static async getStock({osis_code}) {
    try {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const pool = await poolPromise;
      const result = await pool.request()
        .input('osis_code', osis_code)
        .input('year', year)
        .input('month', month)
        .query(`SELECT [prd_codprd],
                       [alm_codalm],
                       [ano_codano],
                       [mes_codmes],
                       CONVERT(INT, [spa_salfin]) AS [spa_salfin]
                FROM [MRC].[dbo].[SALDOS_PRODUCTOS_SPA]
                WHERE [prd_codprd] = @osis_code
                  AND ([alm_codalm] = '0055'
                  OR [alm_codalm] = '0010'
                  OR [alm_codalm] = '0025'
                  OR [alm_codalm] = '0037')
                  AND [ano_codano] = @year
                  AND [mes_codmes] = @month`);
      console.log(result);
      return result
    } catch (err) {
      console.error('Error al consultar:', err);
    }
  }

  static async getCustomer({document}){
    try {
      const pool = await poolPromise;
      const result = await pool.request()
      .input('document', document)
      .query(`SELECT * FROM [MRC].[dbo].[PERSONA_NATURAL_PNA]
        WHERE [PNA_NUMDOC] = @document
      `)
      return result.rowsAffected[0] === 0 ? false : true
    } catch (error) {
      console.log("🚀 ~ Osis ~ getCustomer ~ error:", error)
    }
  }

  static async insertCustomer(){
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .query(`INSERT INTO [MRC].[dbo].[PERSONA_NATURAL_PNA]
            ([DID_CODDID],
            [PNA_NUMDOC],
            [PNA_APEPAT],
            [PNA_APEMAT],
            [PNA_NOMBRE],
            [PNA_DIRPNA],
            [PNA_INDDOM],
            [PNA_NOMCOM],
            [PNA_INDEST],
            [PNA_CODUSU],
            [PNA_FECACT])
          VALUES
            ('000',
            '71918517',
            'BARBOSA',
            'USCO',
            'LINDER',
            'LIMA',
            '1',
            '',
            '1',
            'yleon',
            '2024-05-05 14:12:46.880'
            )`
        )  
      console.log(result);
      return result
    } catch (error) {
      console.log("🚀 ~ Osis ~ insertCustomer ~ error:", error)
    }
    

  }
}
