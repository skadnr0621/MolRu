package com.bmb.molru.controller;

import com.bmb.molru.dto.NftDto;
import com.bmb.molru.service.NftService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return nftService.updateNft(nftDto);
    }

    @GetMapping("/nft/{tokenId}")
    public ResponseEntity<NftDto> findNft(@PathVariable Long tokenId) {
        return nftService.findNft(tokenId);
    }

    @GetMapping("/")
    public ResponseEntity<List<NftDto>> findAllNft() {
        return nftService.findAllNft();
    }

    @GetMapping("/{address}")
    public ResponseEntity<List<NftDto>> findAllNftByUser(@PathVariable String address) {
        return nftService.findAllNftByUser(address);
    }

    @GetMapping("/onSale")
    public ResponseEntity<List<NftDto>> findAllNftOnSale() {
        return nftService.findAllNftOnSale();
    }
}
