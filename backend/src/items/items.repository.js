/**
 * items table Manipulations
 * items 테이블에 접근합니다.
 */
const connection = require("../../config/connection").promise();

class ItemsRepository {
  async getItems() {
    const sql = `
			SELECT 		author_name,
						item_description,
						item_hash,
						item_title,
						on_sale_yn,
						owner_address,
						token_id,
						created_at as items_create_at
			FROM    	items
			ORDER BY    created_at DESC
			`;
    // WHERE 		on_sale_yn = TRUE
    console.debug(sql);

    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async getItemsByOwnerAddress(address) {
    // return null;

    const sql = `
			SELECT 		author_name,
						item_description,
						item_hash,
						item_title,
						on_sale_yn,
						owner_address,
						token_id,
						created_at as items_create_at
			FROM    	items
			WHERE			owner_address = "${address}"
			ORDER BY    created_at DESC
			`;
    // WHERE 		on_sale_yn = TRUE
    console.debug(sql);

    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async getRecentRegisteredItem() {
    return null;
  }

  async getRecentItemsOnSale() {
    return null;
  }

  async getItemByTokenId(tokenId) {
    // return null;

    const sql = `
			SELECT 		author_name,
						item_description,
						item_hash,
						item_title,
						on_sale_yn,
						owner_address,
						token_id,
						created_at as items_create_at
			FROM    	items
			WHERE			token_id = "${tokenId}"
			ORDER BY    created_at DESC
			`;
    // WHERE 		on_sale_yn = TRUE
    console.debug(sql);

    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async updateItemOwnerAddress(tokenId, ownerAddress) {
    // return null;

    const query = `
      UPDATE  items
      SET     owner_address = "${ownerAddress}"
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
        console.log(err);
        throw err;
      });
  }

  async updateItemTokenIdAndOwnerAddress(itemId, tokenId, ownerAddress) {
    // return null;

    const query = `
			UPDATE		items
			SET		token_id = ${tokenId},
						owner_address = "${ownerAddress}"
			WHERE	id = ${itemId}
		`;
    console.debug(query);

    return await connection
      .query(query)
      .then((data) => data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }

  async validateItemDuplicated(hashCode) {
    // return null;

    const sql = `
			SELECT 		author_name,
						item_description,
						item_hash,
						item_title,
						on_sale_yn,
						owner_address,
						token_id,
						created_at as items_create_at
			FROM    	items
			WHERE 		item_hash = "${hashCode}"
		`;
    console.debug(sql);

    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async createItems(data) {
    // return null;

    const query = `
			INSERT INTO items(author_name, item_title, item_description,
													item_hash, owner_address)
			VALUES("${data.author}", "${data.title}", "${data.description}",
							"${data.hashCode}", "${data.address}")
		`;
    console.debug(query);

    connection.beginTransaction();
    return await connection
      .query(query)
      .then((result) => {
        return { result, connection };
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  // --------------------------------------------------

  async updateItemOnSaleYn(data) {
    const query = `
      UPDATE  items
      SET     on_sale_yn = ${data.on_sale_yn}
      WHERE   token_id = ${data.token_id}
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
        connection.rollback();
        throw err;
      });
  }
}

module.exports = ItemsRepository;
