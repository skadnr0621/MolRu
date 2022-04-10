package com.bmb.molru.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    @Column(name = "address")
    private String address;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "image_url")
    private String imageURL;

    @OneToMany(mappedBy = "owner")
    private List<Nft> nftList = new ArrayList<>();

}
