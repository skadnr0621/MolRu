package com.bmb.molru.dto;

import com.bmb.molru.domain.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private String address;

    private String imageUrl;

    private String nickname;

    public static UserDto convert(User user) {
        if(user == null) return null;

        return UserDto.builder()
                .address(user.getAddress())
                .imageUrl(user.getImageURL())
                .nickname(user.getNickname())
                .build();
    }
}
