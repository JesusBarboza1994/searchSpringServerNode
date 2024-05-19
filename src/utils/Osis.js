import poolPromise from "../db/sqlServerDB.js";
import { CustomError } from "./customError.js";
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
      .query(`SELECT * FROM [MRC].[dbo].[AUXILIARES_AUX]
        WHERE [AUX_CODAUX] = @document
      `)
      console.log("🚀 ~ Osis ~ getCustomer ~ result:", result)
      return result.rowsAffected[0] === 0 ? false : true
    } catch (error) {
      console.log("🚀 ~ Osis ~ getCustomer ~ error:", error)
    }
  }

  static async insertCustomer({documentNumber, documentType, name, maternalLastname, paternalLastname, address, phone, email}) {
    try {
      const pool = await poolPromise;
      let totalName = name + `${maternalLastname ? ' ' + maternalLastname : ''}` + `${paternalLastname ? ' ' + paternalLastname : ''}`
      const auxCodAux = await pool.request()
      .input('document', documentNumber)
      .input('name', totalName)
      .query(`INSERT INTO [MRC].[dbo].[AUXILIARES_AUX]
          ([CIA_CODCIA],[AUX_CODAUX],[AUX_NOMAUX],[AUX_INDDOM],
          [AUX_INDCLI],[AUX_INDPRO],[AUX_INDEMP],[AUX_INDGAS],[AUX_INDOTR],
          [AUX_CODANT],[AUX_INDEST],[AUX_FECACT],[AUX_CODUSU],[aux_indusu])
        VALUES
          ('01',@document, @name, '1', 
          '1','1','0','0','0',
          @document,'1', GETDATE(),'jingenieria', 0)
        `
      )
      console.log("🚀 ~ Osis ~ insertCustomer ~ auxCodAux:", auxCodAux)

      const dataClient = await pool.request()
      .input('document', documentNumber)
      .query(`INSERT INTO [MRC].[dbo].[CLIENTES_CIA_CLC]
          ([CIA_CODCIA], [AUX_CODAUX], [CLC_PORDES], [CLC_DIAGRA], [CLC_CREASI],
            [CLC_FLAVEN], [CLC_INDDIP], [CLC_INDFAC], [CLC_INDEST], [CLC_CODUSU],
            [CLC_FECACT], [clc_blqlcr], [clc_indmar])
        VALUES
          ('01', @document, 0.00, 0, 0.00,
            0, 0, 0, '1', 'jingenieria',
            GETDATE(), 0, 0)
          `
      )
      console.log("🚀 ~ Osis ~ insertCustomer ~ dataClient:", dataClient)
      if(documentType === "DNI"){
        const resultNaturalPerson = await pool.request()
        .input('document', documentNumber).input('name', name)
        .input('maternalLastname', maternalLastname).input('paternalLastname', paternalLastname)
        .input('address', address).input('phone', phone).input('email', email)
        .query(`INSERT INTO [MRC].[dbo].[PERSONA_NATURAL_PNA]
            ([DID_CODDID], [PNA_NUMDOC], [PNA_APEPAT], [PNA_APEMAT], [PNA_NOMBRE],
            [PNA_DIRPNA], [PNA_INDDOM], [PNA_NOMCOM], [PNA_INDEST], [PNA_CODUSU],
            [PNA_FECACT], [PNA_TELPNA], [PNA_EMAPNA])
          VALUES
            ('000', @document, @paternalLastname, @maternalLastname, @name, @address, '1', '', '1', 'jingenieria',
            GETDATE(), @phone, @email )`
        )
        console.log("🚀 ~ Osis ~ insertCustomer ~ resultNaturalPerson:", resultNaturalPerson)
        return resultNaturalPerson
      }else if(documentType === "RUC"){
        const resultLegalPerson = await pool.request()
        .input('document', documentNumber).input('name', name)
        .query(`INSERT INTO [MRC].[dbo].[PERSONA_JURIDICA_PJA]
            ([DID_CODDID], [PJA_NUMDOC], [PJA_NOMBRE], [PJA_DIRPJA], [PJA_TELPJA], [PJA_FAXPJA],
            [PJA_EMAPJA], [PJA_INDDOM], [PJA_SIGPJA], [PJA_NOMCON], [PJA_NUMRUC], [PJA_OTRDOC],
            [PJA_INDEST], [PJA_CODUSU], [PJA_FECACT])
          VALUES
            ('000', @document, @name, @address, @phone, '-',
            @email, '1', @name, '', @document, '',
            '1', 'jingenieria', GETDATE())
        `)
        console.log("🚀 ~ Osis ~ insertCustomer ~ resultLegalPerson:", resultLegalPerson)
        return resultLegalPerson
      }
      throw new CustomError("Invalid document type", 400)
    } catch (error) {
      console.log("🚀 Error en la creación de documentos en OSIS: ", error)
    }
    

  }
}
