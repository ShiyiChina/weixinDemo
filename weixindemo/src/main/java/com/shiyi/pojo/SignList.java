package com.shiyi.pojo;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class SignList {
    private int keyid;//` int(10) NOT NULL,
    private int lessonid;//` int(20) NOT NULL,
    private String openid;//` varchar(50) NOT NULL,
    private String name;//` varchar(20) NOT NULL,
    private int xuehao;//` varchar(20) NOT NULL,
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date signTime;//` datetime NOT NULL

    public SignList() {
    }

    public SignList(int keyid, int lessonid, String openid, String name, int xuehao, Date signTime) {
        this.keyid = keyid;
        this.lessonid = lessonid;
        this.openid = openid;
        this.name = name;
        this.xuehao = xuehao;
        this.signTime = signTime;
    }

    public int getKeyid() {
        return keyid;
    }

    public void setKeyid(int keyid) {
        this.keyid = keyid;
    }

    public int getLessonid() {
        return lessonid;
    }

    public void setLessonid(int lessonId) {
        this.lessonid = lessonId;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getXuehao() {
        return xuehao;
    }

    public void setXuehao(int xuehao) {
        this.xuehao = xuehao;
    }

    public Date getSignTime() {
        return signTime;
    }

    public void setSignTime(Date signTime) {
        this.signTime = signTime;
    }

    @Override
    public String toString() {
        return "SignList{" +
                "keyid=" + keyid +
                ", lessonId=" + lessonid +
                ", openid='" + openid + '\'' +
                ", name='" + name + '\'' +
                ", xuehao='" + xuehao + '\'' +
                ", signTime=" + signTime +
                '}';
    }
}
