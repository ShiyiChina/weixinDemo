package com.shiyi.controller;

import com.shiyi.pojo.Lesson;
import com.shiyi.pojo.QueqinList;
import com.shiyi.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/xdq/lesson")
public class LessonController {
    @Autowired
    private LessonService lessonService;

    /**
     * 根据openid查询此人创建的课程
     * @param openidMap
     * @return
     */
    @RequestMapping("/loadMyCreatLesson")
    @ResponseBody
    public List<Lesson> loadLessonByOpenid(@RequestBody Map openidMap){
        System.out.println(openidMap);
        String openid = (String) openidMap.get("userid");
        List<Lesson> lessons = lessonService.loadLessonByOpenid(openid);
        return lessons;
    }

    /**
     * 查询所有课程
     * @return
     */
    @PostMapping("/loadAllLesson")
    @ResponseBody
    public List<Lesson> loadLesson(){
        List<Lesson> lessons = lessonService.loadLesson();
        return lessons;
    }

    /**
     * 添加课程
     * @param lesson
     * @return
     */
    @RequestMapping("/addlesson")
    @ResponseBody
    public  String addlesson(@RequestBody Lesson lesson){
        String s = lessonService.addLesson(lesson);
        return s;
    }

    @RequestMapping("/queqinList")
    @ResponseBody
    public List<QueqinList> queqinList(@RequestBody Map lessonidMap){
        if (lessonidMap!=null){
            int lessonid = Integer.parseInt((String) lessonidMap.get("lessonid"));
            List<QueqinList> queqinList = lessonService.queqinList(lessonid);
            return queqinList;
        }
        return null;
    }

    @RequestMapping("/deletelesson")
    @ResponseBody
    public void deleteLesson(@RequestBody Integer lessonid){
        lessonService.deleteLesson(lessonid);
    }

}
