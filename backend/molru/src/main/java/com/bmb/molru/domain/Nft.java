package com.bmb.molru.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Nft extends BaseTimeEntity {
    @Id @GeneratedValue
    @Column(name = "nft_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "nft")
    private List<Sale> saleList = new ArrayList<>();

    private Long tokenId;

    private String tokenHash;

    private String tokenTitle;

    private String tokenDescription;

    private boolean isSell;
}
