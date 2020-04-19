package com.shiyi.pojo;

import javax.persistence.Table;
import java.util.Date;

@Table(name = "kaoqin_score")
public class KaoqinScore {

    private int keyId;//` int(6) NOT NULL,
    private int lessonId;//` int(6) NOT NULL,
    private String openid;//` varchar(50) NOT NULL,
    private int state;//` int(11) NOT NULL,
    private Date time;//` datetime NOT NULL

    public int getKeyId() {
        return keyId;
    }

    public void setKeyId(int keyId) {
        this.keyId = keyId;
    }

    public int getLessonId() {
        return lessonId;
    }

    public void setLessonId(int lessonId) {
        this.lessonId = lessonId;
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
