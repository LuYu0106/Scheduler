package edu.gatech.scheduler.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


// 这个class 专门用来generate 一个unique id的
/// key 是 class 的名字。 last id 是记录过的最后一个id。。
// 整个record 需要放在数据库。。。
@Document
public class Sequence {
    @Id
    String className;

    Integer lastId;

    public Sequence() {
    }

    public Sequence(String className, Integer lastId) {
        this.className = className;
        this.lastId = lastId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public Sequence(String className) {
        this.className = className;
    }

    public Integer getLastId() {
        return lastId;
    }

    public void setLastId(Integer lastId) {
        this.lastId = lastId;
    }
}
