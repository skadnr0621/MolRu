package com.bmb.molru.dto;

import com.bmb.molru.domain.Nft;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NftDto {

    private Long nftId;

    private MultipartFile image;
//    private String tokenHash;

    private String tokenTitle;
    private String tokenDescription;
    private Long tokenId;
    private String address;

    private boolean onSale;


    public static NftDto convert(Nft nft) {
        if(nft == null) return null;

        return NftDto.builder()
                .nftId(nft.getId())
//                .tokenHash(nft.getTokenHash())
                .address(nft.getOwner().getAddress())
                .tokenId(nft.getTokenId())
                .tokenTitle(nft.getTokenTitle())
                .tokenDescription(nft.getTokenDescription())
                .onSale(nft.isOnSale())
                .build();
    }
}
