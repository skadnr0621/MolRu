package com.bmb.molru.service;

import com.bmb.molru.domain.Nft;
import com.bmb.molru.domain.User;
import com.bmb.molru.dto.NftDto;
import com.bmb.molru.repository.NftRepository;
import com.bmb.molru.repository.UserRepository;
import com.bmb.molru.util.CommonService;
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

    /*** Service ***/
    private final CommonService commonService;
    /*** Repository ***/
    private final NftRepository nftRepository;
    private final UserRepository userRepository;


    public ResponseEntity<?> createNft(NftDto nftDto) {
        try {
            User userByAddress = userRepository.findByAddress(nftDto.getAddress()).orElse(null);
            if (userByAddress == null) {
                User admin = userRepository.findById(0L).orElse(null);
                if (admin == null)
                    return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
                else
                    userByAddress = admin;
            }

            // check image duplication
            String hashCode = CommonService.toHexString(nftDto.getImage().getBytes());
            if (nftRepository.countByTokenHash(hashCode) > 0)
                return new ResponseEntity<Void>(HttpStatus.CONFLICT);

            // TODO : 토큰ID 중복 체크 로직 필요함
            Nft nft = Nft.builder()
                    .tokenHash(hashCode)
                    .owner(userByAddress)
                    .tokenTitle(nftDto.getTokenTitle())
                    .tokenDescription(nftDto.getTokenDescription())
                    .onSale(false)
                    .build();

            Nft savedNft = nftRepository.save(nft);
            NftDto savedNftDto = NftDto.convert(savedNft);

            return new ResponseEntity<>(savedNftDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> updateTokenId(Long nftId, Long tokenId) {
        Nft nft = nftRepository.findById(nftId).orElse(null);
        if (nft == null)
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);

        nft.setTokenId(tokenId);
        nftRepository.save(nft);

        return new ResponseEntity<>("success", HttpStatus.OK);
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

            findNft.setOwner(userByAddress);
            findNft.setTokenTitle(nftDto.getTokenTitle());
            findNft.setTokenDescription(nftDto.getTokenDescription());
            findNft.setOnSale(nftDto.isOnSale());

            Nft savedNft = nftRepository.save(findNft);
            NftDto updatedNft = NftDto.convert(savedNft);

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

//    public ResponseEntity<List<NftDto>> findAllNftOnSale() {
//        try {
//            List<Nft> nftList = nftRepository.findAllBySell(true);
//            List<NftDto> nftDtoList = new ArrayList<>();
//
//            for (Nft nft : nftList) {
//                nftDtoList.add(NftDto.convert(nft));
//            }
//
//            return new ResponseEntity<>(nftDtoList, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }
}
