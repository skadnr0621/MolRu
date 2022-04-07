package com.bmb.molru.dto;

import com.bmb.molru.domain.Category;
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
    private MultipartFile audio;
//    private String tokenHash;

    private Category category;

    private String tokenTitle;
    private String tokenDescription;
    private Long tokenId;
    private String ownerAddress;
    private boolean onSale;

    private String imagePath;
    private String audioPath;


    public static NftDto convert(Nft nft) {
        if(nft == null) return null;

        return NftDto.builder()
                .nftId(nft.getId())
//                .tokenHash(nft.getTokenHash())
                .ownerAddress(nft.getOwner().getAddress())
                .tokenId(nft.getTokenId())
                .tokenTitle(nft.getTokenTitle())
                .category(nft.getCategory())
                .tokenDescription(nft.getTokenDescription())
                .onSale(nft.isOnSale())
                .imagePath(nft.getImagePath())
                .audioPath(nft.getAudioPath())
                .build();
    }
}
