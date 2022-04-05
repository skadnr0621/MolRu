package com.bmb.molru.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@RequiredArgsConstructor
@Slf4j
public class WebConfig implements WebMvcConfigurer {

    private final GlobalConfig gConfig;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String resourcePattern = gConfig.getResourcePath() + "/**";

        registry.addResourceHandler(resourcePattern)
                .addResourceLocations("file:///" + gConfig.getUploadPath());

        log.info("Resource pattern registered :: " + resourcePattern);
    }

}
