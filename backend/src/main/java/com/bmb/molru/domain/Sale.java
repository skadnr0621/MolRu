package com.bmb.molru.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sale extends BaseTimeEntity {

    @Id @GeneratedValue
    @Column(name = "sale_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nft_id")
    private Nft nft;

    @Column(name = "seller_address")
    private String sellerAddress;

    @Column(name = "sale_contract_address")
    private String saleContractAddress;
    @Column(name = "cash_contract_address")
    private String cashContractAddress;

    @Column(name = "on_sale")
    private boolean onSale;

    @Column(name = "buyer_adderss")
    private String buyerAddress;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

}
