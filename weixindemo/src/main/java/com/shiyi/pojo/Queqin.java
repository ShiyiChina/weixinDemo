package com.shiyi.pojo;

import java.util.Date;

public class Queqin {
    private int keyid;//` int(6) NOT NULL,
    private int lessonid;//` int(6) NOT NULL,
    private String openid;//` varchar(50) NOT NULL,
    private int xuehao;//` int(11) NOT NULL,
    private String name;//` varchar(10) NOT NULL,
    private Date qtime;//` datetime NOT NULL

    @Override
    public String toString() {
        return "Queqin{" +
                "keyid=" + keyid +
                ", lessonid=" + lessonid +
                ", openid='" + openid + '\'' +
                ", xuehao=" + xuehao +
                ", name='" + name + '\'' +
                ", qtime=" + qtime +
                '}';
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

    public void setLessonid(int lessonid) {
        this.lessonid = lessonid;
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
}
