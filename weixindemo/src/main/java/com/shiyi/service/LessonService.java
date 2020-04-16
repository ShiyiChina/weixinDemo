package com.shiyi.service;

import com.shiyi.pojo.Lesson;
import com.shiyi.pojo.QueqinList;

import java.util.List;

public interface LessonService {

    public List<Lesson> loadLessonByOpenid(String openid);

    public List<Lesson> loadLesson();

    public String addLesson(Lesson Lesson);

    List<QueqinList> queqinList(int lessonid);

    void deleteLesson(Integer lessonid);
}

