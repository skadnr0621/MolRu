package com.bmb.molru.controller;

import com.bmb.molru.dto.SaleDto;
import com.bmb.molru.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sale")
public class SaleController {

    private final SaleService saleService;

    @PostMapping("/")
    public ResponseEntity<SaleDto> createSale(SaleDto saleDto) {
        return saleService.createSale(saleDto);
    }

    @PatchMapping("/{saleId}")
    public ResponseEntity<SaleDto> updateSale(@PathVariable Long saleId) {
        return saleService.updateSale(saleId);
    }

    @GetMapping("/nft/{tokenId}")
    public ResponseEntity<List<SaleDto>> findAllNftSale(@PathVariable Long tokenId) {
        return saleService.findAllNftSale(tokenId);
    }

    @GetMapping("/seller/{address}")
    public ResponseEntity<List<SaleDto>> findAllSaleBySeller(@PathVariable String address) {
        return saleService.findAllSaleBySeller(address);
    }
}
