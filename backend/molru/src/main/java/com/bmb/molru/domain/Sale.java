package com.bmb.molru.domain;

import lombok.*;

import javax.persistence.*;

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

    private String sellerAddress;

    private String saleContractAddress;

    private boolean onSale;

    private String cashContractAddress;

    private String buyerAddress;
}
