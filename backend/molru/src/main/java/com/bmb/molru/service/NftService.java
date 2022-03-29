package com.bmb.molru.service;

import com.bmb.molru.domain.Nft;
import com.bmb.molru.domain.User;
import com.bmb.molru.dto.NftDto;
import com.bmb.molru.repository.NftRepository;
import com.bmb.molru.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NftService {

    private final NftRepository nftRepository;
    private final UserRepository userRepository;

    public ResponseEntity<NftDto> createNft(NftDto nftDto) {
        try {
            User userByAddress = userRepository.findByAddress(nftDto.getAddress()).orElse(null);

            if(userByAddress == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            Nft nft = Nft.builder()
                    .user(userByAddress)
                    .tokenId(nftDto.getTokenId())
                    .tokenHash(nftDto.getTokenHash())
                    .tokenTitle(nftDto.getTokenTitle())
                    .tokenDescription(nftDto.getTokenDescription())
                    .isSell(nftDto.isSell())
                    .build();

            Nft savedNft = nftRepository.save(nft);
            NftDto savedNftDto = NftDto.convert(savedNft);

            return new ResponseEntity<>(savedNftDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<NftDto> updateNft(NftDto nftDto) {
        try {
            Nft findNft = nftRepository.findByTokenId(nftDto.getTokenId()).orElse(null);

            if(findNft == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            User userByAddress = userRepository.findByAddress(nftDto.getAddress()).orElse(null);

            if(userByAddress == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            findNft.setUser(userByAddress);
            findNft.setTokenTitle(nftDto.getTokenTitle());
            findNft.setTokenDescription(nftDto.getTokenDescription());
            findNft.setSell(nftDto.isSell());

            NftDto updatedNft = NftDto.convert(findNft);

            return new ResponseEntity<>(updatedNft, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<NftDto> findNft(Long tokenId) {
        try {
            Nft nft = nftRepository.findByTokenId(tokenId).orElse(null);
            if(nft == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            NftDto nftDto = NftDto.convert(nft);

            return new ResponseEntity<>(nftDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<NftDto>> findAllNft() {
        try {
            List<Nft> nftList = nftRepository.findAll();
            List<NftDto> nftDtoList = new ArrayList<>();

            for (Nft nft : nftList) {
                nftDtoList.add(NftDto.convert(nft));
            }

            return new ResponseEntity<>(nftDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<NftDto>> findAllNftByUser(String address) {
        try {
            User user = userRepository.findByAddress(address).orElse(null);
            if(user == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            List<Nft> nftList = nftRepository.findAllByUser(user);
            List<NftDto> nftDtoList = new ArrayList<>();

            for (Nft nft : nftList) {
                nftDtoList.add(NftDto.convert(nft));
            }

            return new ResponseEntity<>(nftDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<NftDto>> findAllNftOnSale() {
        try {
            List<Nft> nftList = nftRepository.findAllBySell(true);
            List<NftDto> nftDtoList = new ArrayList<>();

            for (Nft nft : nftList) {
                nftDtoList.add(NftDto.convert(nft));
            }

            return new ResponseEntity<>(nftDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
