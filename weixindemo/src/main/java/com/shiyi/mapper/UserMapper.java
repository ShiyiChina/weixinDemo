package com.shiyi.mapper;


import com.shiyi.pojo.*;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface UserMapper extends Mapper<UserInfo> {

    @Select("select * from student where openid=#{openid}")
    Student findStudentById(String openid);

    @Insert("insert into student values (#{openid},#{name},#{xuehao})")
    void insertStudent(Student student);

    @Insert("insert into Lesson(openid,slesson,sclass,setTime) values (#{openid},#{slesson},#{sclass},#{setTime})")
    void insertLesson(Lesson lesson);

    @Select("select state from lessonKey where lessonid = #{lessonid} order by time desc")
    List<LessonKey> checkKaoqin(int lessonid);

    @Insert("insert into lessonKey(lessonid,lessonKey,state,time)values (#{lessonid},#{lessonkey},#{state},")
    void saveKey(LessonKey lessonK);

    @Select("select * from lessonKey where lessonid = #{lessonid} order by keyid desc limit 1")
    LessonKey findLessonKey(int lessonid);

    @Select("select * from signList where lessonId =#{0} and keyid=#{1} order by xuehao")
    List<SignList> findsignList(int lessonid, int keyid);

    @Update("update lessonKey set state='false' where lessonid=#{lessonid}")
    void stopSign(int lessonid);

    @Select("select * from lessonKey where lessonid = #{lessonid} and state='false' order by time")
    List<LessonKey> showrecord(int lessonid);

    @Select("select keyid from lessonKey where lessonid = #{lessonid} order by time desc limit 1")
    int findKeyidBylessonid(int lessonid);

    @Insert("insert into queqin values (#{keyid},#{lessonid},#{openid},#{xuehao},#{name},#{qtime})")
    void insertQueqin(Queqin queqin);

    @Select("select * from queqin where keyid = #{keyid}")
    List<Queqin> findQueqinByKeyid(int keyid);

    @Select("select * from lessonKey where lessonid= #{lessonid} order by time desc limit 1")
    LessonKey checkLessonKey(int lessonid);

    @Insert("insert into signList values (#{keyid},#{lessonid},#{openid},#{name},#{xuehao},#{signTime})")
    void insertSignList(SignList signList);

}
