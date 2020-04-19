package com.shiyi.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.shiyi.mapper.StudentMapper;
import com.shiyi.mapper.TeacherMapper;
import com.shiyi.mapper.UserMapper;
import com.shiyi.pojo.*;
import com.shiyi.service.UserService;
import com.shiyi.utils.HttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private StudentMapper studentMapper;
    @Autowired
    private TeacherMapper teacherMapper;

    @Override
    public Student queryStudentByOpenid(String openid) {
        Student student = studentMapper.selectByPrimaryKey(openid);
        return student;
    }

    @Override
    public String queryRoleByOpenid(String openid) {
        UserInfo user = userMapper.selectByPrimaryKey(openid);
        return user.getRole();
    }

    @Override
    public Student findStudentById(String id) {
        Student student = userMapper.findStudentById(id);
        return student;
    }

    @Override
    public Map sign(SignVo signVo) {
        Map<String,String> res = new HashMap();
        String userid=signVo.getUserid();
        String sname=signVo.getSname();
        int snum=signVo.getSnum();
        String slesson=signVo.getSlesson();
        String sclass=signVo.getSclass();

        if (sname!=null && snum!=0) {

            Student studentById = findStudentById(userid);
            if(studentById==null){
                Student student = new Student();
                insertStudent(student);
                res.put("data","Student");

            }else {
                res.put("data","已注册");
            }
        }else if (slesson!=null && sclass!=null){
            Lesson lesson = new Lesson();
            lesson.setOpenid(userid);
            lesson.setLessonName(slesson);
            lesson.setClassName(sclass);
            lesson.setCreateTime(new Date());
            insertLesson(lesson);
            res.put("data","lesson");
        }
        return res;
    }

    @Override
    public void insertStudent(Student student) {
        userMapper.insertStudent(student);

    }

    @Override
    public Lesson findLessonById(int id) {
        return null;
    }

    @Override
    public void insertLesson(Lesson lesson) {

        userMapper.insertLesson(lesson);
    }

    @Override
    public String login(String code) {

        //小程序唯一标识   (在微信小程序管理后台获取)
        String appid = "wx30f5486cf73a58c2";
        //小程序的 app secret (在微信小程序管理后台获取)
        String secret = "c1fb6a03609c2b14f519a29b553a14d2";
        String params = "appid=" + appid + "&secret=" + secret + "&js_code=" + code + "&grant_type=" + "authorization_code";

        String sr = HttpRequest.sendGet("https://api.weixin.qq.com/sns/jscode2session", params);
//        ObjectMapper mapper = new ObjectMapper();
//        mapper.readValue(sr,)
        JSONObject jsonObject = JSONObject.parseObject(sr);
        String openid = jsonObject.getString("openid");
        System.out.println(openid);


        return openid;
    }

    @Override
    public List<LessonKey> checkKaoqin(int lessonid) {
        List<LessonKey> lessonKeys = userMapper.checkKaoqin(lessonid);
        return lessonKeys;
    }

    @Override
    public void saveKey(int lessonid, String lessonkey) {
        LessonKey lessonK = new LessonKey();
        lessonK.setLessonid(lessonid);
        lessonK.setLessonkey(lessonkey);
        lessonK.setState("true");
        lessonK.setTime(new Date());
        userMapper.saveKey(lessonK);
    }

    @Override
    public List<SignList> showSignList(int lessonid) {

        LessonKey lessonKey = findLessonKey(lessonid);
        if (lessonKey!=null){
            int keyid = lessonKey.getKeyid();
            System.out.println(keyid);
            List<SignList> signLists = findsignList(lessonid, keyid);
            return signLists;

        }
        return null;
    }

    @Override
    public LessonKey findLessonKey(int lessonid) {
        LessonKey lessonKey = userMapper.findLessonKey(lessonid);
        return lessonKey;
    }

    @Override
    public List<SignList> findsignList(int lessonid, int keyid) {
        List<SignList> signLists= userMapper.findsignList(lessonid,keyid);
        return signLists;
    }

    @Override
    public void stopSign(int lessonid) {
        userMapper.stopSign(lessonid);
    }

    @Override
    public List<LessonKey> showrecord(int lessonid) {
        List<LessonKey> lessonKeys = userMapper.showrecord(lessonid);
        return lessonKeys;
    }

    @Override
    public int findKeyidBylessonid(int lessonid) {
        int keyid = userMapper.findKeyidBylessonid(lessonid);
        return keyid;
    }

    @Override
    public void savaqueqin(Queqin queqin) {
        int lessonid = queqin.getLessonid();
        int keyid = findKeyidBylessonid(lessonid);
        queqin.setKeyid(keyid);
        queqin.setQtime(new Date());
        userMapper.insertQueqin(queqin);
    }

    @Override
    public List<QueqinList> showqueqin(int keyid) {
        List<Queqin> queqins = userMapper.findQueqinByKeyid(keyid);
        if (queqins!=null&&queqins.size()>0){
            List<QueqinList> queqinLists = new ArrayList<>();
            for (Queqin queqin:queqins
                 ) {
                QueqinList queqinList = new QueqinList(queqin.getOpenid(),queqin.getXuehao(),queqin.getName(),new Date());
                queqinLists.add(queqinList);
            }
            return queqinLists;
        }
        return null;
    }

    @Override
    public LessonKey checkLessonKey(int lessonid) {
        LessonKey lessonKey = userMapper.checkLessonKey(lessonid);
        return lessonKey;
    }

    @Override
    public void savaSign(String openid, int lessonid) {
        Student student = userMapper.findStudentById(openid);
        LessonKey lessonKey = userMapper.findLessonKey(lessonid);
        if (lessonKey!=null){
            //SignList signList = new SignList(lessonKey.getKeyid(),lessonid,openid,student.getsName(),student.getsNum(),new Date());
            //userMapper.insertSignList(signList);//没有解决重复签到
        }




    }


}
