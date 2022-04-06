package com.bmb.molru.repository;

import com.bmb.molru.domain.Category;
import com.bmb.molru.domain.Nft;
import com.bmb.molru.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NftRepository extends JpaRepository<Nft, Long> {
    Optional<Nft> findByTokenId(Long tokenId);

    // 전체 nft 조회
    @Override
    List<Nft> findAll();

    // 특정 사용자가 가진 nft 조회
    List<Nft> findAllByOwner(User owner);

    int countByTokenHash(String hashCode);

    List<Nft> findAllByCategoryAndOnSaleAndAndOwner(Category category, Boolean onSale, User owner);
    // 판매중인 nft만 조회
//    List<Nft> findAllBySell(boolean isSell);
}
