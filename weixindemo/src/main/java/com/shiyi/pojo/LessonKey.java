package com.shiyi.pojo;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;


@Table(name = "lessonkey")
public class LessonKey {

    @Id
    private int keyid;//` int(11) NOT NULL,
    private int lessonid;//` int(5) NOT NULL,
    private String lessonkey;//` varchar(20) NOT NULL,
    private String state;//` varchar(5) NOT NULL,
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
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

    public String getLessonkey() {
        return lessonkey;
    }

    public void setLessonkey(String lessonkey) {
        this.lessonkey = lessonkey;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "LessonKey{" +
                "keyid=" + keyid +
                ", lessonid=" + lessonid +
                ", lessonkey='" + lessonkey + '\'' +
                ", state='" + state + '\'' +
                ", time=" + time +
                '}';
    }
}
