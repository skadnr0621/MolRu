package com.bmb.molru.dto;

import com.bmb.molru.domain.Sale;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleDto {
    private Long tokenId;

    private String sellerAddress;

    private String saleContractAddress;

    private boolean onSale;

    private String cashContractAddress;

    private String buyerAddress;

    public static SaleDto convert(Sale sale) {
        if(sale == null) return null;

        return SaleDto.builder()
                .tokenId(sale.getNft().getTokenId())
                .sellerAddress(sale.getSellerAddress())
                .saleContractAddress(sale.getSaleContractAddress())
                .onSale(sale.isOnSale())
                .cashContractAddress(sale.getCashContractAddress())
                .buyerAddress(sale.getBuyerAddress())
                .build();
    }
}
