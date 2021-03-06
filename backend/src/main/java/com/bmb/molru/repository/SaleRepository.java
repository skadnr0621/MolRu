package com.bmb.molru.repository;

import com.bmb.molru.domain.Nft;
import com.bmb.molru.domain.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    Optional<Sale> findByNft(Nft nft);

    List<Sale> findAllByBuyerAddress(String address);
    List<Sale> findAllByNft(Nft nft);
}
