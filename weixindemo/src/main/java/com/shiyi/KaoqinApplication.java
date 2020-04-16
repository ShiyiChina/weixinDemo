package com.shiyi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tk.mybatis.spring.annotation.MapperScan;


@SpringBootApplication
@MapperScan("com.shiyi.mapper")
public class KaoqinApplication {
    public static void main(String[] args) {
        SpringApplication.run(KaoqinApplication.class,args);
    }
}
