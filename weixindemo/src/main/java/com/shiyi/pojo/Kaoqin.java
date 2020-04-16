package com.shiyi.pojo;

import javax.persistence.Table;
import java.util.Date;


@Table(name = "kaoqin")
public class Kaoqin {

    private int keyid;//` int(6) NOT NULL,
    private int lessonid;//` int(6) NOT NULL,
    private String openid;//` varchar(50) NOT NULL,
    private int state;//` int(11) NOT NULL,
    private Date time;//` datetime NOT NULL

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

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
