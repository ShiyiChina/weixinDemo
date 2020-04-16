package com.shiyi.service.impl;

import com.shiyi.mapper.KaoqinMapper;
import com.shiyi.mapper.LessonMapper;
import com.shiyi.mapper.UserMapper;
import com.shiyi.pojo.Kaoqin;
import com.shiyi.pojo.Lesson;
import com.shiyi.pojo.QueqinList;
import com.shiyi.pojo.Student;
import com.shiyi.service.LessonService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javafx.scene.input.KeyCode.Q;

@Service
public class LessonServiceImpl implements LessonService {

    @Autowired
    private LessonMapper lessonMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private KaoqinMapper kaoqinMapper;


    @Override
    public String addLesson(Lesson lesson) {
        if(lesson!=null) {
            List<Lesson> findaddlesson = lessonMapper.select(lesson);
            if(findaddlesson!=null){
                lessonMapper.insert(lesson);
                return "no";
            }else
                return "yes";
        }
        return null;
    }

    @Override
    public List<Lesson> loadLessonByOpenid(String openid) {
        System.out.println("openid: "+openid);
        Lesson lesson = new Lesson();
        lesson.setOpenid(openid);
        List<Lesson> lessons = lessonMapper.select(lesson);
        return lessons;
    }

    @Override
    public List<Lesson> loadLesson() {
        List<Lesson> lessons = lessonMapper.loadLesson();
        return lessons;
    }

    @Override
    public List<QueqinList> queqinList(int lessonid) {
        Kaoqin kaoqin = new Kaoqin();
        kaoqin.setLessonid(lessonid);
        Lesson lesson = lessonMapper.selectByPrimaryKey(lessonid);
        if (lesson != null){
            List<QueqinList> queqinLists = new ArrayList<>();

            String openid = lesson.getOpenid();
            Student student = userMapper.findStudentById(openid);
            if (student!=null){
                QueqinList queqinList = new QueqinList(student.getOpenid(),student.getXuehao(),student.getName(),new Date());
                queqinLists.add(queqinList);

            }
            return queqinLists;
        }
        return null;
    }

    @Override
    public void deleteLesson(Integer lessonid) {
        lessonMapper.deleteByPrimaryKey(lessonid);
    }
}
