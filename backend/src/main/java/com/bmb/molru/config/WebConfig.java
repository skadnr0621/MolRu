package com.bmb.molru.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
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

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")      // 프로그램에서 제공하는 url
                .allowedOriginPatterns("*")       // 요청을 허용할 출처를 명시(전체 허용)
                .allowedHeaders("*")              // 어떤 헤더를 허용할 것인지
                .allowedMethods("*")              // 어떤 메서드를 허용할 것인지(Get, Post ...)
                .allowCredentials(true);          // 쿠키 요청을 허용한다다

        // spring boot에서 cors 설정 시, allowCredential과 allowedOrigins를 동시에 사용할 수 없도록 업데이트 됨
        // 따라서  allowedOrigins -> allowedOriginPatterns로 대신 사용함함
    }
}
