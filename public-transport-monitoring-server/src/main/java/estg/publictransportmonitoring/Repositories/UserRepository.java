package estg.publictransportmonitoring.Repositories;

import estg.publictransportmonitoring.Entities.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository  extends ReactiveMongoRepository<User,String> {
}
