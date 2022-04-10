package com.bmb.molru.util;

import org.springframework.stereotype.Service;

import java.math.BigInteger;

@Service
public class CommonService {

    /**
     * Ref.
     * https://stackoverflow.com/questions/60997760/identifying-the-same-image-in-coming-as-multipart-file-in-request-spring-boot-ja
     *
     * @param hash - Multipartfile.getBytes()
     * @return hashed value of given multipartfile bytes
     */
    public static String toHexString(byte[] hash) {
        // Convert byte array into signum representation
        BigInteger number = new BigInteger(1, hash);

        // Convert message digest into hex value
        StringBuilder hexString = new StringBuilder(number.toString(16));

        // Pad with leading zeros
        while (hexString.length() < 32) {
            hexString.insert(0, '0');
        }
        return hexString.toString();
    }
    
}
