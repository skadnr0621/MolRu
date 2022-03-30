package com.bmb.molru.dto;

import com.bmb.molru.domain.Nft;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NftDto {
    private String address;

    private Long tokenId;

    private String tokenHash;

    private String tokenTitle;

    private String tokenDescription;

    private boolean isSell;

    public static NftDto convert(Nft nft) {
        if(nft == null) return null;

        return NftDto.builder()
                .address(nft.getUser().getAddress())
                .tokenId(nft.getTokenId())
                .tokenHash(nft.getTokenHash())
                .tokenTitle(nft.getTokenTitle())
                .tokenDescription(nft.getTokenDescription())
                .isSell(nft.isSell())
                .build();
    }
}
