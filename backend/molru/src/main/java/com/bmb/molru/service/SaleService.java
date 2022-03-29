package com.bmb.molru.service;

import com.bmb.molru.domain.Nft;
import com.bmb.molru.domain.Sale;
import com.bmb.molru.dto.SaleDto;
import com.bmb.molru.repository.NftRepository;
import com.bmb.molru.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;
    private final NftRepository nftRepository;

    public ResponseEntity<SaleDto> createSale(SaleDto saleDto) {
        try {
            // TODO : 토큰아이디로 변경
            Nft nft = nftRepository.findByTokenId(saleDto.getTokenId()).orElse(null);

            if(nft == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            Sale sale = Sale.builder()
                    .nft(nft)
                    .sellerAddress(saleDto.getSellerAddress())
                    .saleContractAddress(saleDto.getSaleContractAddress())
                    .onSale(false)
                    .cashContractAddress(saleDto.getCashContractAddress())
                    .buyerAddress(saleDto.getBuyerAddress())
                    .build();

            Sale savedSale = saleRepository.save(sale);
            SaleDto savedSaleDto = SaleDto.convert(savedSale);

            return new ResponseEntity<>(savedSaleDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<SaleDto> updateSale(Long saleId) {
        try {
            Sale findSale = saleRepository.findById(saleId).orElse(null);

            if(findSale == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            findSale.setOnSale(true);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<SaleDto>> findAllNftSale(Long tokenId) {
        try {
            Nft nft = nftRepository.findByTokenId(tokenId).orElse(null);

            if(nft == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            List<Sale> saleList = saleRepository.findAllByNft(nft);
            List<SaleDto> saleDtoList = new ArrayList<>();

            for (Sale sale : saleList) {
                saleDtoList.add(SaleDto.convert(sale));
            }

            return new ResponseEntity<>(saleDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<SaleDto>> findAllSaleBySeller(String address) {
        try {
            List<Sale> saleList = saleRepository.findAllBySellerAddress(address);
            List<SaleDto> saleDtoList = new ArrayList<>();

            for (Sale sale : saleList) {
                saleDtoList.add(SaleDto.convert(sale));
            }

            return new ResponseEntity<>(saleDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
