package com.bmb.molru.controller;

import com.bmb.molru.dto.UserDto;
import com.bmb.molru.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDto> signup(@RequestBody UserDto userDto) {
        return userService.signup(userDto);
    }

    @GetMapping("/{address}")
    public ResponseEntity<UserDto> getUserInfo(@PathVariable String address) {
        return userService.getUserInfo(address);
    }

    @DeleteMapping("/{address}")
    public ResponseEntity<UserDto> withdrawal(@PathVariable String address) {
        return userService.withdrawal(address);
    }
}
