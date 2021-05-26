package estg.publictransportmonitoring.Repositories;

import estg.publictransportmonitoring.Entities.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UserRepository  extends ReactiveMongoRepository<User,String> {

    Mono<Boolean> existsByUsernameAndEmail(String username, String email);

}
