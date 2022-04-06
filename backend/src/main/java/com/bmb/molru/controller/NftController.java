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

    @GetMapping(params = {"category", "status", "address"})
    public ResponseEntity<List<NftDto>> searchNft(@RequestParam String category, @RequestParam String status, @RequestParam String address) {
        return nftService.searchNft(category, status, address);
    }

    @GetMapping("/{tokenId}")
    public ResponseEntity<NftDto> findNft(@PathVariable Long tokenId) {
        return nftService.findNft(tokenId);
    }

    @GetMapping("/owner/{address}")
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

}
