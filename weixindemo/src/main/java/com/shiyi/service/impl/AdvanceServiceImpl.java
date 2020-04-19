package com.shiyi.service.impl;

import com.shiyi.mapper.AdvanceMapper;
import com.shiyi.pojo.Advance;
import com.shiyi.service.AdvanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdvanceServiceImpl implements AdvanceService {

    @Autowired
    private AdvanceMapper advanceMapper;

    @Override
    public void saveAdvance(Advance advace) {
        advace.setAid(null);
        advanceMapper.insertSelective(advace);
    }
}
