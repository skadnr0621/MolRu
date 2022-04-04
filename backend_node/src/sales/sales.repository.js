/**
 * sales table Manipulations
 * sales 테이블에 접근합니다.
 */
const connection = require("../../config/connection").promise();

class SalesRepository {
  async createSales(data) {
    // return true;

    const query = `
			INSERT INTO sales(
				token_id, seller_address,
				sale_contract_address, cash_contract_address,
        completed_at)
			VALUES(
				${data.token_id}, "${data.seller_address}",
				"${data.sales_contract_address}", "${data.cash_contract_address}",
        FROM_UNIXTIME(${data.completed_at}))
		`;
    console.debug(query);

    connection.beginTransaction();
    return await connection
      .query(query)
      .then((result) => {
        return { connection, result };
      })
      .catch((e) => {
        console.error(e);
        connection.rollback();
        throw e;
      });
  }

  async getSalesByTokenId(tokenId) {
    // return null;

    const query = `
      SELECT  sale_id, sale_contract_address, sale_yn, token_id,
        cash_contract_address, seller_address, buyer_address,
        created_at, completed_at
      FROM    sales
      WHERE   token_id = ${tokenId}
      ORDER BY  created_at DESC
    `;
    console.debug(query);

    return await connection
      .query(query)
      .then((result) => result[0][0])
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  async getSales() {
    return null;
  }

  async getSale(saleId) {
    const query = `
      SELECT * FROM sales WHERE sale_id = ${saleId};
    `;
    return await connection.query(query).then((result) => result[0][0]);
  }

  async deleteSales(saleId) {
    // return null;

    const query = `
      DELETE FROM sales
      WHERE       sale_id = ${saleId}
    `;
    console.debug(query);

    return await connection
      .query(query)
      .then((result) => {
        return { connection, result };
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  async completeSales(tokenId, data) {
    // return null;

    const query = `
      UPDATE  sales
      SET     buyer_address = "${data.buyer_address}"
      WHERE   token_id = ${tokenId}
    `;
    console.debug(query);

    connection.beginTransaction();
    return await connection
      .query(query)
      .then((result) => {
        return { connection, result };
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }
}

module.exports = SalesRepository;
