import poolPromise from "../db/sqlServerDB.js";
import { CustomError } from "./customError.js";
export default class Osis {
  static async getStock({ osis_code }) {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("osis_code", osis_code)
        .input("year", year)
        .input("month", month).query(`SELECT [prd_codprd],
                       [alm_codalm],
                       [ano_codano],
                       [mes_codmes],
                       CONVERT(INT, [spa_salfin]) AS [spa_salfin]
                FROM [MRC].[dbo].[SALDOS_PRODUCTOS_SPA]
                WHERE [prd_codprd] = @osis_code
                  AND ([alm_codalm] = '0055'
                  OR [alm_codalm] = '0010'
                  OR [alm_codalm] = '0025'
                  OR [alm_codalm] = '0047'
                  OR [alm_codalm] = '0037')
                  AND [ano_codano] = @year
                  AND [mes_codmes] = @month`);
      console.log(result);
      return result;
    } catch (err) {
      console.error("Error al consultar:", err);
    }
  }

  static async getCustomer({ document }) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().input("document", document)
        .query(`SELECT * FROM [MRC].[dbo].[AUXILIARES_AUX]
        WHERE [AUX_CODAUX] = @document
      `);
      console.log("🚀 ~ Osis ~ getCustomer ~ result:", result);
      return result.rowsAffected[0] === 0 ? false : true;
    } catch (error) {
      console.log("🚀 ~ Osis ~ getCustomer ~ error:", error);
    }
  }

  static async insertCustomer({
    documentNumber,
    documentType,
    name,
    maternalLastname,
    paternalLastname,
    address,
    phone,
    email,
  }) {
    try {
      const pool = await poolPromise;
      let totalName =
        name +
        `${maternalLastname ? " " + maternalLastname : ""}` +
        `${paternalLastname ? " " + paternalLastname : ""}`;
      const auxCodAux = await pool
        .request()
        .input("document", documentNumber)
        .input("name", totalName)
        .query(`INSERT INTO [MRC].[dbo].[AUXILIARES_AUX]
          ([CIA_CODCIA],[AUX_CODAUX],[AUX_NOMAUX],[AUX_INDDOM],
          [AUX_INDCLI],[AUX_INDPRO],[AUX_INDEMP],[AUX_INDGAS],[AUX_INDOTR],
          [AUX_CODANT],[AUX_INDEST],[AUX_FECACT],[AUX_CODUSU],[aux_indusu])
        VALUES
          ('01',@document, @name, '1', 
          '1','1','0','0','0',
          @document,'1', GETDATE(),'jingenieria', 0)
        `);
      console.log("🚀 ~ Osis ~ insertCustomer ~ auxCodAux:", auxCodAux);

      const dataClient = await pool.request().input("document", documentNumber)
        .query(`INSERT INTO [MRC].[dbo].[CLIENTES_CIA_CLC]
          ([CIA_CODCIA], [AUX_CODAUX], [CLC_PORDES], [CLC_DIAGRA], [CLC_CREASI],
            [CLC_FLAVEN], [CLC_INDDIP], [CLC_INDFAC], [CLC_INDEST], [CLC_CODUSU],
            [CLC_FECACT], [clc_blqlcr], [clc_indmar])
        VALUES
          ('01', @document, 0.00, 0, 0.00,
            0, 0, 0, '1', 'jingenieria',
            GETDATE(), 0, 0)
          `);
      console.log("🚀 ~ Osis ~ insertCustomer ~ dataClient:", dataClient);
      if (documentType === "DNI") {
        const resultNaturalPerson = await pool
          .request()
          .input("document", documentNumber)
          .input("name", name)
          .input("maternalLastname", maternalLastname)
          .input("paternalLastname", paternalLastname)
          .input("address", address)
          .input("phone", phone)
          .input("email", email)
          .query(`INSERT INTO [MRC].[dbo].[PERSONA_NATURAL_PNA]
            ([DID_CODDID], [PNA_NUMDOC], [PNA_APEPAT], [PNA_APEMAT], [PNA_NOMBRE],
            [PNA_DIRPNA], [PNA_INDDOM], [PNA_NOMCOM], [PNA_INDEST], [PNA_CODUSU],
            [PNA_FECACT], [PNA_TELPNA], [PNA_EMAPNA])
          VALUES
            ('000', @document, @paternalLastname, @maternalLastname, @name, @address, '1', '', '1', 'jingenieria',
            GETDATE(), @phone, @email )`);
        console.log(
          "🚀 ~ Osis ~ insertCustomer ~ resultNaturalPerson:",
          resultNaturalPerson
        );
        return resultNaturalPerson;
      } else if (documentType === "RUC") {
        const resultLegalPerson = await pool
          .request()
          .input("document", documentNumber)
          .input("name", name)
          .query(`INSERT INTO [MRC].[dbo].[PERSONA_JURIDICA_PJA]
            ([DID_CODDID], [PJA_NUMDOC], [PJA_NOMBRE], [PJA_DIRPJA], [PJA_TELPJA], [PJA_FAXPJA],
            [PJA_EMAPJA], [PJA_INDDOM], [PJA_SIGPJA], [PJA_NOMCON], [PJA_NUMRUC], [PJA_OTRDOC],
            [PJA_INDEST], [PJA_CODUSU], [PJA_FECACT])
          VALUES
            ('000', @document, @name, @address, @phone, '-',
            @email, '1', @name, '', @document, '',
            '1', 'jingenieria', GETDATE())
        `);
        console.log(
          "🚀 ~ Osis ~ insertCustomer ~ resultLegalPerson:",
          resultLegalPerson
        );
        return resultLegalPerson;
      }
      throw new CustomError("Invalid document type", 400);
    } catch (error) {
      console.log("🚀 Error en la creación de documentos en OSIS: ", error);
    }
  }

  static async insertHeadOrder({
    warehouse,
    basicAmount,
    taxIGV,
    customerCode,
    customerName,
    totalOrder,
    brand,
  }) {
    try {
      const pool = await poolPromise;
      const transaction = await pool.transaction();

      try {
        await transaction.begin();

        // Obtener el último número de pedido y sumar 1
        const result = await transaction.request()
          .query(`SELECT TOP 1 PPC_NUMPPC FROM [dbo].[PEDIDOS_VENTA_PPC]
                ORDER BY PPC_NUMPPC DESC`);

        const lastOrderNumber = result.recordset[0]
          ? parseInt(result.recordset[0].PPC_NUMPPC, 10) + 1
          : 1;
        const newOrderNumber = lastOrderNumber.toString().padStart(10, "0");
        console.log("orderNumber", newOrderNumber);
        // Insertar el nuevo pedido en la tabla PEDIDOS_VENTA_PPC
        const order = await pool
          .request()
          .input("customerNumber", customerCode)
          .input("customerName", customerName)
          .input("totalOrder", totalOrder)
          .input("basicAmount", basicAmount)
          .input("taxIGV", taxIGV)
          .input("warehouse", warehouse)
          .input("orderNumber", newOrderNumber)
          .input("brand", brand).query(`INSERT INTO [dbo].[PEDIDOS_VENTA_PPC]
        ([CIA_CODCIA]
        ,[SUC_CODSUC]
        ,[PPC_NUMPPC]
        ,[ANO_CODANO]
        ,[MES_CODMES]
        ,[AUX_CODAUX]  
        ,[LDE_CODLDE]
        ,[PPC_FECDOC] 
        ,[PPC_FECVEN]
        ,[PPC_PLAENT]
        ,[PPC_FECENT]
        ,[VDE_CODVDE]
        ,[CPA_CODCPA]
        ,[TMO_CODTMO]
        ,[COC_NUMCOC]
        ,[PPC_ORDCOM]
        ,[PPC_OBSPED]
        ,[PPC_REFPED]
        ,[PPC_INDTCA]
        ,[PPC_TIPCAM]
        ,[PPC_IMPBRU]
        ,[PPC_IMPDE1]
        ,[PPC_IMPDE2]
        ,[PPC_VALVTA]
        ,[PPC_IMPIGV]
        ,[PPC_IMPTOT]
        ,[PPC_DIACRE]
        ,[PPC_SITPPC]
        ,[TCC_CODTRA]
        ,[PPC_INDIGV]
        ,[PPC_PEDMER]
        ,[PPC_ORDWEB]
        ,[PPC_FECTRA]
        ,[TLP_CODTLP]
        ,[LPC_CODLPC]
        ,[PPC_TASIGV]
        ,[PPC_FECCRE]
        ,[PRO_CODPRO]
        ,[ZVE_CODZVE]
        ,[PPC_INDANT]
        ,[PRO_AGETRA]
        ,[LDE_CODFAC]
        ,[PPC_INDEXP]
        ,[PPC_IMPSEG]
        ,[PPC_IMPFLE]
        ,[PPC_OBSEXP]
        ,[PPC_INDCAL]
        ,[PPC_NUMCUO]
        ,[CTE_CODCTE]
        ,[PPC_INDTER]
        ,[PPC_FECTER]
        ,[PPC_USUTER]
        ,[CTI_CODCTI]
        ,[CTE_CODANT]
        ,[TIE_CODTIE]
        ,[PPC_SUSVAL]
        ,[PPC_SUSTOT]
        ,[PPC_FECFAC]
        ,[ALM_CODALM]
        ,[PPC_PLACAN]
        ,[PPC_IMPCAN]
        ,[PPC_TCACAN]
        ,[PPC_FECCAN]
        ,[PPC_INDRES]
        ,[PAP_SECPAP]
        ,[SEP_NUMSEP]
        ,[PAP_INDMAX]
        ,[PPC_INDEST]
        ,[PPC_INDOTN]
        ,[PPC_OTRNOM]
        ,[PPC_NOIMDA]
        ,[PPC_FECACT]
        ,[PPC_CODUSU]
        ,[ppc_indrec]
        ,[mpr_codmpr]
        ,[ppc_obsmpr])
      VALUES
        ('01'
        ,'01'
        ,@orderNumber
        ,YEAR(GETDATE())
        ,MONTH(GETDATE())
        ,@customerNumber
        ,null
        ,GETDATE()
        ,null
        ,0
        ,GETDATE()
        ,'0001'
        ,'000'
        ,'SO'
        ,null
        ,''
        ,''
        ,null
        ,'0'
        ,3.7340
        ,@basicAmount
        ,0.00
        ,0.00
        ,@basicAmount
        ,@taxIGV
        ,@totalOrder
        ,0
        ,1
        ,5000
        ,''
        ,null
        ,null
        ,'1900-01-01 00:00:00.000'
        ,null
        ,null
        ,18.00
        ,GETDATE()
        ,null
        ,'0000'
        ,''
        ,null
        ,null
        ,'0'
        ,0.00
        ,0.00
        ,''
        ,'0'
        ,0
        ,null
        ,0
        ,null
        ,null
        ,null
        ,null
        ,'01'
        ,0.00
        ,0.00
        ,null
        ,@warehouse
        ,null
        ,0.00
        ,0.00
        ,null
        ,0.00
        ,0
        ,null
        ,1
        ,1
        ,0
        ,@customerName
        ,0
        ,GETDATE()
        ,'jingenieria'
        ,0
        ,@brand
        ,null)`);
        // Confirmar la transacción
        await transaction.commit();
        return newOrderNumber;
      } catch (error) {
        await transaction.rollback(); // Si algo falla, se revierte la transacción
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async insertBodyOrder({
    quantity,
    osisCode,
    totalPrice,
    unitPrice,
    taxIGV,
    orderNumber,
    correlative,
  }) {
    try {
      const pool = await poolPromise;

      const orderBody = await pool
        .request()
        .input("orderNumber", orderNumber)
        .input("quantity", quantity)
        .input("osisCode", osisCode)
        .input("unitPrice", unitPrice)
        .input("taxIGV", taxIGV)
        .input("totalPrice", totalPrice)
        .input("correlative", correlative)
        .query(`INSERT INTO [dbo].[PEDIDOS_VENTA_PPD]
           ([CIA_CODCIA]
           ,[SUC_CODSUC]
           ,[PPC_NUMPPC]
           ,[PRD_CODPRD]
           ,[PPD_SECPPD]
           ,[PPD_CORPPD]
           ,[PPD_CANAUT]
           ,[PPD_CANSOL]
           ,[PPD_CANTRA]
           ,[PPD_CANATE]
           ,[PPD_CANFAS]
           ,[PPD_CANATS]
           ,[PPD_CANFAC]
           ,[PPD_CANSUS]
           ,[PPD_CANDIS]
           ,[PPD_PREUNI]
           ,[PPD_PRUIGV]
           ,[PPD_CANUNI]
           ,[PPD_UNISUS]
           ,[UME_CODVEN]
           ,[PPD_CANVEN]
           ,[PPD_TIPDES]
           ,[PPD_PORDE1]
           ,[PPD_IMPDE1]
           ,[PPD_PORDE2]
           ,[PPD_IMPDE2]
           ,[PPD_PORDE3]
           ,[PPD_IMPDE3]
           ,[PPD_PORDE4]
           ,[PPD_IMPDE4]
           ,[PPD_TASIGV]
           ,[PPD_IMPBRU]
           ,[PPD_VALVTA]
           ,[PPD_IMPIGV]
           ,[PPD_IMPTOT]
           ,[PPD_VTASUS]
           ,[PPD_TOTSUS]
           ,[PPD_OBSPPD]
           ,[PPD_STODIS]
           ,[PRD_CODREM]
           ,[PPD_PRELIS]
           ,[PPD_INDDPR]
           ,[PPD_OBSPRE]
           ,[PPD_USUPRE]
           ,[PPD_FECPRE]
           ,[PPD_INDSOD]
           ,[PPD_INDSOF]
           ,[PPD_INDAUT]
           ,[PPD_INDATE]
           ,[PPD_INDFAC]
           ,[PPD_MEDUNI]
           ,[PPD_DESREG]
           ,[PPD_ATSREG]
           ,[PPD_FASREG]
           ,[PPD_AUTREG]
           ,[PPD_FACREG]
           ,[PPD_VENAUT]
           ,[PPD_VENFAC]
           ,[PPD_VENATE]
           ,[DCM_CODDCM]
           ,[PPD_OBSADI]
           ,[PPD_INDEST]
           ,[PPD_CODUSU]
           ,[PPD_FECACT])
     VALUES
           ('01'
           ,'01'
           ,@orderNumber  
           ,@osisCode
           ,null
           ,@correlative
           ,@quantity 
           ,@quantity
           ,0.00
           ,0.00
           ,0.00
           ,0.00
           ,@quantity
           ,0.00
           ,0.00
           ,@unitPrice/1.18   
           ,@unitPrice
           ,0
           ,0
           ,'PZA'
           ,@quantity
           ,''
           ,0.00
           ,0.00
           ,0.00
           ,0.00
           ,0.00
           ,0.00
           ,0.00
           ,0.00
           ,0.00
           ,@totalPrice / 1.18
           ,@totalPrice / 1.18
           ,@taxIGV
           ,@totalPrice
           ,0.00
           ,0.00
           ,''
           ,0.00
           ,null
           ,0.000
           ,'1'
           ,''
           ,null
           ,null
           ,1
           ,1
           ,0
           ,0
           ,0
           ,0.000
           ,0.00
           ,0.00
           ,0.00
           ,0.00
           ,0.00
           ,1.00
           ,0.00
           ,0.00
           ,null
           ,null
           ,1
           ,'jingenieria'
           ,GETDATE())`);
      return orderBody;
    } catch (error) {
      console.log(error);
    }
  }
}
