package com.bmb.molru.util;

import com.bmb.molru.config.GlobalConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaService {

    private final GlobalConfig gConfig;

    private final String FOLDERNAME = "/nft";


    public String save(MultipartFile file) {
        String uploadPath = gConfig.getUploadPath() + FOLDERNAME;

        File dir = new File(uploadPath);
        if (!dir.isDirectory() && !dir.mkdirs()) {
            log.error("[ERROR] Directory generation failed");
            return null;
        }

        //
        File savedFile = new File(uploadPath + "/" + file.getOriginalFilename());
        try {
            file.transferTo(savedFile);
        }
        catch (IOException e) {
            e.printStackTrace();
        }

        return gConfig.getResourcePath() + FOLDERNAME + "/" + file.getOriginalFilename();
    }

}
