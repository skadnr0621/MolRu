package com.bmb.molru.repository;

import com.bmb.molru.domain.Nft;
import com.bmb.molru.domain.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findAllBySellerAddress(String address);
    List<Sale> findAllByNft(Nft nft);
}
