package com.shiyi.service;

import com.shiyi.pojo.*;
import java.util.List;
import java.util.Map;

public interface UserService {

    Student queryStudentByOpenid(String openid);

    public Student findStudentById(String id);
    public Map sign(SignVo signVo);
    public void insertStudent(Student student);

    public Lesson findLessonById(int id);
    public void insertLesson(Lesson lesson);
    public String login(String code);

    public List<LessonKey> checkKaoqin(int lessonid);

    void saveKey(int lessonid, String lessonkey);

    List<SignList> showSignList(int lessonid);
    public LessonKey findLessonKey(int lessonid);
    public List<SignList> findsignList(int lessonid, int keyid);

    void stopSign(int lessonid);

    List<LessonKey> showrecord(int lessonid);

    int findKeyidBylessonid(int lessonid);

    void savaqueqin(Queqin queqin);

    List<QueqinList> showqueqin(int keyid);

    LessonKey checkLessonKey(int lessonid);

    void savaSign(String openid, int lessonid);


}
