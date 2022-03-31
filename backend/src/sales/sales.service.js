/**
 * Services Logics related to Sale
 * Service/Repository 레이어의 함수를 호출해야합니다.
 */
const SalesRepository = require("./sales.repository");
const salesRepository = new SalesRepository();

const ItemsService = require("../items/items.service");
const itemsService = new ItemsService();

class SalesService {
  /**
   * PJT Ⅲ 과제 2:
   * Req.2-B1 판매 정보 등록
   */
  async createSales(data) {
    // return {
    // 	statusCode: 201,
    // 	responseBody: {
    // 		result: 'success'
    // 	}
    // };

    // console.log("createSales request - got body data : ", data);
    try {
      const { connection, result } = await salesRepository.createSales(data);
      console.log(result);

      itemsService.updateItemOnSaleYn({ token_id: data.token_id, on_sale_yn: 1 });

      connection.commit();
      return {
        statusCode: 201,
        responseBody: {
          result: "success",
        },
      };
    } catch (err) {
      console.log("Error while createSales", err);
      return {
        statusCode: 500,
        responseBody: {
          result: "Internal Server Error",
        },
      };
    }
  }

  /**
   * PJT Ⅲ 과제 2:
   * Req.2-B2 판매 정보 상세 조회
   */
  async getSales(tokenId) {
    // return {
    //   statusCode: 200,
    //   responseBody: {
    //     result: "success",
    //     data: [],
    //   },
    // };

    try {
      const sale = await salesRepository.getSalesByTokenId(tokenId);
      console.log(sale);

      return {
        statusCode: 200,
        responseBody: {
          result: "success",
          data: {
            buyer_address: sale.buyer_address,
            cash_contract_address: sale.cash_contract_address,
            completed_at: sale.completed_at,
            created_at: sale.created_at,
            sale_contract_address: sale.sale_contract_address,
            sale_id: sale.sale_id,
            sale_yn: sale.sale_yn,
            seller_address: sale.seller_address,
            token_id: sale.token_id,
          },
        },
      };
    } catch (err) {
      console.log("Error while getSales", err);
      return {
        statusCode: 500,
        responseBody: {
          result: "Internal Server Error",
        },
      };
    }
  }

  /**
   * PJT Ⅲ 과제 3:
   * Req.3-B1 구매자 정보 업데이트
   * Req.3-B3 판매 완료
   */
  async completeSales(tokenId, data) {
    // return {
    //   statusCode: 200,
    //   responseBody: {
    //     result: "success",
    //   },
    // };

    try {
      const { connection, result } = await salesRepository.completeSales(tokenId, data);
      console.log(result);

      itemsService.updateItemOnSaleYn({ token_id: tokenId, on_sale_yn: 0 });
      itemsService.updateItemOwnerAddress({ token_id: tokenId, owner_address: data.buyer_address });

      connection.commit();
      return {
        statusCode: 200,
        responseBody: {
          result: "success",
        },
      };
    } catch (err) {
      console.log("completeSales error", err);
      return {
        statusCode: 500,
        responseBody: {
          result: "Internal Server Error",
        },
      };
    }
  }

  /**
   * PJT Ⅲ 과제 3:
   * Req.3-B2 판매 취소
   */
  async deleteSales(saleId) {
    // return {
    //   statusCode: 201,
    //   responseBody: {
    //     result: "success",
    //   },
    // };

    try {
      const sale = await salesRepository.getSale(saleId);

      const { connection, result } = await salesRepository.deleteSales(saleId);
      console.log(result);

      itemsService.updateItemOnSaleYn({ token_id: sale.token_id, on_sale_yn: 0 });

      connection.commit();
      return {
        statusCode: 200,
        responseBody: {
          result: "success",
        },
      };
    } catch (err) {
      console.log("Error while deleteSales", err);
      return {
        statusCode: 500,
        responeBody: {
          result: "Internal Server Error",
        },
      };
    }
  }
}

module.exports = SalesService;
