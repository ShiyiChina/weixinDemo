package com.shiyi.pojo;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class QueqinList {
    private String openid;//` varchar(50) NOT NULL,
    private int xuehao;//` int(11) NOT NULL,
    private String name;//` varchar(10) NOT NULL,
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date qtime;//` datetime NOT NULL

    public QueqinList(String openid, int xuehao, String name, Date qtime) {
        this.openid = openid;
        this.xuehao = xuehao;
        this.name = name;
        this.qtime = qtime;
    }



    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public int getXuehao() {
        return xuehao;
    }

    public void setXuehao(int xuehao) {
        this.xuehao = xuehao;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getQtime() {
        return qtime;
    }

    public void setQtime(Date qtime) {
        this.qtime = qtime;
    }

    @Override
    public String toString() {
        return "QueqinList{" +
                "openid='" + openid + '\'' +
                ", xuehao=" + xuehao +
                ", name='" + name + '\'' +
                ", qtime=" + qtime +
                '}';
    }
}
