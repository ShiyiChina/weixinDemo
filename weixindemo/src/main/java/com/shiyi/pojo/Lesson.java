package com.shiyi.pojo;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Table(name = "lesson")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lessonid;//` int(5) NOT NULL,
    private String openid;//` varchar(50) NOT NULL,
    private String slesson;//` varchar(20) NOT NULL,
    private String sclass;//` varchar(20) NOT NULL,
    @Column(name = "createtime")
    private Date createTime;//` datetime NOT NULL

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

    public String getSlesson() {
        return slesson;
    }

    public void setSlesson(String slesson) {
        this.slesson = slesson;
    }

    public String getSclass() {
        return sclass;
    }

    public void setSclass(String sclass) {
        this.sclass = sclass;
    }

    public Date getSetTime() {
        return createTime;
    }

    public void setSetTime(Date setTime) {
        this.createTime = setTime;
    }

    @Override
    public String toString() {
        return "Lesson{" +
                "lessonId=" + lessonid +
                ", openid='" + openid + '\'' +
                ", slesson='" + slesson + '\'' +
                ", sclass='" + sclass + '\'' +
                ", setTime='" + createTime + '\'' +
                '}';
    }
}
