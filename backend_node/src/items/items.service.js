/**
 * Services Logics related to Digital Assets(item)
 * Service/Repository 레이어의 함수를 호출해야합니다.
 */
const ItemsRepository = require("./items.repository");
const { getS3List, deleteS3Object } = require("../../config/s3-config");
const itemRepository = new ItemsRepository();

class ItemsService {
  /**
   * PJT Ⅱ - 과제 1: Req.1-B1 작품 등록 (파일 업로드 포함)
   * 1. 이미지의 중복 여부를 판별합니다.
   * 2. 중복된 이미지가 없다면 정보를 DB에 추가합니다.
   * 3. 저장된 작품의 id를 responseBody에 추가하여 반환합니다.
   *
   */
  async createItems(req) {
    // return {
    //   statusCode: 200,
    //   responseBody: {
    //     result: "success",
    //     itemId: 0,
    //   },
    // };

    // console.log("createItems -----------------------------", req.body, req.file);
    // console.info(req.file);

    const crypto = require("crypto");

    const hashCode = crypto.createHash("sha512").update(req.file.buffer).digest("base64");
    // console.log("Input File Hash ::", hashCode);

    const isExists = (await itemRepository.validateItemDuplicated(hashCode)).length;
    if (isExists) {
      return {
        statusCode: 200,
        responseBody: {
          result: "duplicated",
        },
      };
    }

    return await itemRepository
      .createItems({
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        hashCode: hashCode,
        address: req.body.address,
      })
      .then(({ result, connection }) => {
        try {
          const returnValue = {
            statusCode: 200,
            responseBody: {
              result: "success",
              itemId: result[0].insertId,
              link: "https://png.pngtree.com/png-clipart/20200225/original/pngtree-image-of-cute-note-musical-note-vector-or-color-png-image_5274329.jpg",
            },
          };
          connection.commit();
          return returnValue;
        } catch (err) {
          connection.rollback();
          throw err;
        }
      })
      .catch((err) => {
        console.log(err);
        return {
          statusCode: 500,
          responseBody: {
            result: "Internal Server Error",
          },
        };
      });
  }

  /**
   * PJT Ⅱ - 과제 1: Req.1-B2 작품 정보 업데이트
   */
  async updateItemTokenIdAndOwnerAddress(itemId, tokenId, ownerAddress) {
    // return {
    //   statusCode: 200,
    //   responseBody: {
    //     result: "success",
    //   },
    // };

    return await itemRepository
      .updateItemTokenIdAndOwnerAddress(itemId, tokenId, ownerAddress)
      .then((result) => {
        console.log(result);
        return {
          statusCode: 200,
          responseBody: {
            result: "success",
          },
        };
      })
      .catch((err) => {
        console.log(err);

        return {
          statusCode: 200,
          responseBody: {
            result: "failed",
          },
        };
      });
  }

  /**
   * PJT Ⅱ 과제 2:
   * Req.2-B1 작품 목록 조회
   * Req.2-B2 주소가 보유한 작품 목록 조회
   *
   * PJT Ⅲ 과제 4: (판매 중인 작품만 반환하도록 수정합니다.)
   * Req.4-B1 작품 목록 조회
   * Req.4-B2 주소가 보유한 작품 목록 조회
   */
  async getItems(address) {
    // return {
    //   statusCode: 200,
    //   responseBody: {
    //     result: "success",
    //     data: [],
    //   },
    // };
    console.log("input address : ", address);

    try {
      const items = address === undefined ? await itemRepository.getItems() : await itemRepository.getItemsByOwnerAddress(address);
      console.log("Registered items :", items);
      return {
        statusCode: 200,
        responseBody: {
          result: "success",
          items: items,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        responseBody: {
          result: "failed",
        },
      };
    }
  }

  /*
   * PJT Ⅲ 과제 3:
   * Req.4-B3 최근 등록 작품 조회
   */
  async getRecentItems() {
    // return {
    //   statusCode: 200,
    //   responseBody: {
    //     result: "success",
    //     data: [],
    //   },
    // };

    try {
      const data = await itemRepository.getRecentRegisteredItem();
      return {
        statusCode: 200,
        responseBody: {
          result: "success",
          item: data[0],
        },
      };
    } catch (err) {
      console.log("Error while getRecentItems", err);
      return {
        statusCode: 500,
        responseBody: {
          result: "Internal Server Error",
        },
      };
    }
  }

  /**
   * PJT Ⅱ 과제 2:
   * Req.2-B3 작품 상세 조회
   */
  async getItemByTokenId(tokenId) {
    // return {
    //   statusCode: 200,
    //   responseBody: {
    //     result: "success",
    //     data: [],
    //   },
    // };

    try {
      const item = await itemRepository.getItemByTokenId(tokenId);
      // console.log("Got item : ", item);

      return {
        statusCode: 200,
        responseBody: {
          result: "success",
          item: item[0],
        },
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        responseBody: {
          result: "failed",
        },
      };
    }
  }

  async updateItemOwnerAddress(tokenId, ownerAddress) {
    if (await itemRepository.updateItemOwnerAddress(tokenId, ownerAddress)) {
      return {
        statusCode: 200,
        responseBody: {
          result: "success",
        },
      };
    }
  }

  // --------------------------------------------------

  async updateItemOnSaleYn(data) {
    try {
      const { connection, result } = await itemRepository.updateItemOnSaleYn(data);
      console.log(result);

      connection.commit();
    } catch (err) {
      console.error("Error while updateItemOnSaleYn", err);
    }
  }

  async updateItemOwnerAddress(data) {
    try {
      const { connection, result } = await itemRepository.updateItemOwnerAddress(data.token_id, data.owner_address);
      console.log(result);

      connection.commit();
    } catch (err) {
      console.error("Error while updateItemOwnerAddress", err);
    }
  }
}

module.exports = ItemsService;
