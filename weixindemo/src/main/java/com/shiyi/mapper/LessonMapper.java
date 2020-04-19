package com.shiyi.mapper;


import com.shiyi.pojo.Lesson;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface LessonMapper extends Mapper<Lesson> {


    @Select("select * from lesson order by create_time desc")
    List<Lesson> loadLesson();

}
