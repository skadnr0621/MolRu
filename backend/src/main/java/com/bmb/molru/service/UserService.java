package com.bmb.molru.service;

import com.bmb.molru.domain.User;
import com.bmb.molru.dto.UserDto;
import com.bmb.molru.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public ResponseEntity<UserDto> signup(UserDto userDto) {
        try {
            // 유효성 검사(주소값이 제대로 들어왔는지)
            if(userDto.getAddress() == null || userDto.getAddress().equals("")) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            User findByAddress = userRepository.findByAddress(userDto.getAddress()).orElse(null);

            // 중복 검사(이미 존재하는 아이디인지 체크)
            if(findByAddress != null) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }

            User user = User.builder()
                    .address(userDto.getAddress())
                    .imageURL(userDto.getImageUrl())
                    .nickname(userDto.getNickname())
                    .build();

            User savedUser = userRepository.save(user);
            UserDto savedUserDto = UserDto.convert(savedUser);

            return new ResponseEntity<>(savedUserDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<UserDto> withdrawal(String address) {
        try {
            User findByAddress = userRepository.findByAddress(address).orElse(null);

            // 유효성 검사(존재하는 아이디인지 체크)
            if(findByAddress == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            userRepository.delete(findByAddress);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
