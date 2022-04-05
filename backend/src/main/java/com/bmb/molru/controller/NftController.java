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


    @PostMapping
    public ResponseEntity<?> createNft(@RequestBody NftDto nftDto) {
        return nftService.createNft(nftDto);
    }

    @GetMapping
    public ResponseEntity<List<NftDto>> findAllNft() {
        return nftService.findAllNft();
    }

    @GetMapping(params = {"tokenId"})
    public ResponseEntity<NftDto> findNft(@RequestParam Long tokenId) {
        return nftService.findNft(tokenId);
    }

    @GetMapping(params = {"address"})
    public ResponseEntity<List<NftDto>> findAllNftByUser(@RequestParam String address) {
        return nftService.findAllNftByUser(address);
    }


    @PatchMapping("/{nftId}")
    public ResponseEntity<?> updateTokenId(@PathVariable Long nftId, @RequestBody Long tokenId) {
        return nftService.updateTokenId(nftId, tokenId);
    }

    @PatchMapping
    public ResponseEntity<NftDto> updateNft(@RequestBody NftDto nftDto) {
        return nftService.updateNft(nftDto);
    }

//    @GetMapping("/onSale")
//    public ResponseEntity<List<NftDto>> findAllNftOnSale() {
//        return nftService.findAllNftOnSale();
//    }
}
