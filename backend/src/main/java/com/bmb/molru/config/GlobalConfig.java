package com.bmb.molru.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.util.ObjectUtils;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.Properties;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class GlobalConfig {

    private final ApplicationContext context;
    private final ResourceLoader resourceLoader;

    private String uploadPath;
    private String resourcePath;

    @PostConstruct
    public void init() {
        String[] activeProfiles = context.getEnvironment().getActiveProfiles();

        String activeProfile = "local";
        if (!ObjectUtils.isEmpty(activeProfiles))
            activeProfile = activeProfiles[0];
        log.info("activeProfile : " + activeProfile);

        String resourcePath = String.format("classpath:globals/global-%s.properties", activeProfile);

        try {
            Resource resource = resourceLoader.getResource(resourcePath);
            Properties properties = PropertiesLoaderUtils.loadProperties(resource);

            this.uploadPath = properties.getProperty("uploadPath");
            this.resourcePath = properties.getProperty("resourcePath");

            log.info("uploadPath/resourcePath : " + this.uploadPath + "/" + this.resourcePath);
        }
        catch (IOException e) {
            log.error(e.getMessage());
        }
    }


    public String getUploadPath() { return uploadPath; }
    public String getResourcePath() { return resourcePath; }

}
