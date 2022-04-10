package com.bmb.molru.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Nft extends BaseTimeEntity {

    @Id
    @GeneratedValue
    @Column(name = "nft_id")
    private Long id;

    @Column(name = "token_contract_address")
    private String tokenCA;
    @Column(name = "token_id")
    private Long tokenId;
    @Column(name = "token_hash")
    private String tokenHash;

    @Column(name = "token_title")
    private String tokenTitle;
    @Column(name = "token_description")
    private String tokenDescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(name = "on_sale")
    private boolean onSale;

    @Column(name = "image_path")
    private String imagePath;
    @Column(name = "audio_path")
    private String audioPath;

//    @OneToMany(mappedBy = "nft")
//    private List<Sale> saleList = new ArrayList<>();

}
