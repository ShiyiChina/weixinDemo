package com.shiyi.controller;

import com.shiyi.pojo.*;
import com.shiyi.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 根据openid查询role（老师/学生）
     * @param openidMap
     * @return
     */
    @PostMapping("/queryRoleByOpenid")
    @ResponseBody
    public String queryRoleByOpenid(@RequestBody Map openidMap){
        String openid = (String) openidMap.get("openid");
        return userService.queryRoleByOpenid(openid);
    }

    /**
     * 根据openid查询个人信息
     * @param openidMap
     * @return
     */
    @PostMapping("/queryStudentByOpenid")
    @ResponseBody
    public Student queryStudentByOpenid(@RequestBody Map openidMap){
        String openid = (String) openidMap.get("openid");
        Student student = userService.queryStudentByOpenid(openid);
        return student;
    }

    /**
     * 根据openid查询个人信息
     * @param openidMap
     * @return
     */
    @PostMapping("/queryTeacherByOpenid")
    @ResponseBody
    public Teacher queryTeacherByOpenid(@RequestBody Map openidMap){
        String openid = (String) openidMap.get("openid");
        return userService.queryTeacherByOpenid(openid);
    }


    @RequestMapping(value = "/sign")
    @ResponseBody
    public Map sign(@RequestBody SignVo signVo){

//        int userid=signVo.getUserid();
//        String sname=signVo.getSname();
//        int snum=signVo.getSnum()
//        String slesson=signVo.getSlesson();
//        String sclass=signVo.getSclass();
        Map res = userService.sign(signVo);
        return res;
    }
    @RequestMapping("/login")
    @ResponseBody
    public String login(@RequestBody Map codeMap){
        String code = (String) codeMap.get("code");
        String openid ="";

        openid = userService.login(code);
        return openid;
    }

    @RequestMapping("/check_student")
    @ResponseBody
    public Student check_student(@RequestBody Map useridMap){

        String openid= (String) useridMap.get("userid");
        Student student = userService.findStudentById(openid);
        return student;

    }
    @RequestMapping("/checkKaoqin")
    @ResponseBody
    public List<LessonKey> checkKaoqin(@RequestBody Map lessonidMap){
        int lessonid = (int) lessonidMap.get("id");
        List<LessonKey> lessonKeys = userService.checkKaoqin(lessonid);
        return lessonKeys;
    }
    @RequestMapping("/saveKey")
    @ResponseBody
    public String saveKey(@RequestBody Map dataMap){
        if (dataMap!=null){
            int lessonid = (int) dataMap.get("id");
            String lessonkey = (String) dataMap.get("signKey");
            userService.saveKey(lessonid,lessonkey);
            return "ok";

        }
        return "";
    }
    @RequestMapping("/showSignList")
    @ResponseBody
    public List<SignList> showSignList(@RequestBody Map lessonidMap){
        if (lessonidMap!=null){
            int lessonid = Integer.parseInt((String) lessonidMap.get("lessonid"));
            List<SignList> signLists = userService.showSignList(lessonid);
            return signLists;
        }
        return null;


    }
    @RequestMapping("/stopSign")
    @ResponseBody
    public void stopSign(@RequestBody Map dataMap){
        if (dataMap!=null){
            int lessonid = Integer.parseInt((String)  dataMap.get("id"));
//            String signKey = (String) dataMap.get("signKey");
            userService.stopSign(lessonid);
        }
    }
    @RequestMapping("/showrecord")
    @ResponseBody
    public List<LessonKey> showrecord(@RequestBody Map lessonidMap){
        if (lessonidMap!=null){
            int lessonid = Integer.parseInt((String) lessonidMap.get("lessonid"));
            List<LessonKey> lessonKey = userService.showrecord(lessonid);
            return lessonKey;
        }
        return null;

    }
    @RequestMapping("/savaqueqin")
    @ResponseBody
    public String savaqueqin(@RequestBody Queqin queqin){
        if (queqin!=null){
            userService.savaqueqin(queqin);
            return "ok";
        }
        return null;
    }
    @RequestMapping("/showqueqin")
    @ResponseBody
    public List<QueqinList> showqueqin(@RequestBody Map keyidMap){
        if (keyidMap!=null){
            int keyid = (int) keyidMap.get("keyid");
            List<QueqinList> queqinLists = userService.showqueqin(keyid);
            return queqinLists;
        }
        return null;
    }

    @RequestMapping("/checkLessonKey")
    @ResponseBody
    public LessonKey checkLessonKey(@RequestBody Map lessonidMap){
        if (lessonidMap!=null){
            int lessonid = Integer.parseInt((String) lessonidMap.get("id"));
            LessonKey lessonKey = userService.checkLessonKey(lessonid);
            return lessonKey;
        }
        return null;
    }
    @RequestMapping("/savaSign")
    @ResponseBody
    public String savaSign(@RequestBody Map dataMap) {
        if (dataMap != null) {
            int lessonid = Integer.parseInt((String) dataMap.get("id"));
            String openid = (String) dataMap.get("userid");
            userService.savaSign(openid,lessonid);
            return "ok";
        }
        return null;
    }


}
