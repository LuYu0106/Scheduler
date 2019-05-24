package edu.gatech.scheduler.repository;


import edu.gatech.scheduler.domain.Group;
import edu.gatech.scheduler.domain.Sequence;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SequenceRepository extends MongoRepository<Sequence, String> {
    Sequence findByclassName(String className);
}
