package com.bmb.molru.controller;

import com.bmb.molru.dto.SaleDto;
import com.bmb.molru.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sale")
public class SaleController {

    private final SaleService saleService;

    @PostMapping
    public ResponseEntity<SaleDto> createSale(@RequestBody SaleDto saleDto) {
        return saleService.createSale(saleDto);
    }

    @GetMapping(params = {"tokenId"})
    public ResponseEntity<?> getSale(@RequestParam Long tokenId) { return saleService.getSale(tokenId); }

    @GetMapping(params = {"method", "value"})
    public ResponseEntity<?> getSales(@RequestParam String method, @RequestParam String value) {
        if ("nft".equals(method))
            return saleService.findAllNftSale(Long.valueOf(value)); // TODO 메소드명 요검토
        else if ("seller".equals(method))
            return saleService.findAllSaleBySeller(value);
        else
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
    }

    @PatchMapping("/{tokenId}/purchase")
    public ResponseEntity<?> completeSale(@PathVariable Long tokenId, @RequestBody String buyerAddress) {
        return saleService.completeSale(tokenId, buyerAddress);
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
