package com.shiyi.pojo;

import javax.persistence.*;

@Table(name = "user")
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String openid;

    private String role;

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "openid='" + openid + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
