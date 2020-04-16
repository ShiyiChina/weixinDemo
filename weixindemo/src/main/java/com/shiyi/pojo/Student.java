package com.shiyi.pojo;


import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "student")
public class Student {
    @Id
    private String openid;//` varchar(50) NOT NULL,
    private String name;//` varchar(10) NOT NULL,
    private int xuehao;//` int(20) NOT NULL

    public Student() {
    }

    public Student(String openid, String name, int xuehao) {
        this.openid = openid;
        this.name = name;
        this.xuehao = xuehao;
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

    @Override
    public String toString() {
        return "Student{" +
                "openid=" + openid +
                ", name='" + name + '\'' +
                ", xuehao=" + xuehao +
                '}';
    }
}
