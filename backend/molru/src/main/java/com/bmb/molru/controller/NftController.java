package com.bmb.molru.controller;

import com.bmb.molru.dto.NftDto;
import com.bmb.molru.service.NftService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/nft")
public class NftController {

    private final NftService nftService;

    @PostMapping("/")
    public ResponseEntity<NftDto> createNft(NftDto nftDto) {
        return nftService.createNft(nftDto);
    }

    @PatchMapping("/")
    public ResponseEntity<NftDto> updateNft(NftDto nftDto) {
        return null;
    }
}
