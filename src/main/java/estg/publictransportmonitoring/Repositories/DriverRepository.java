package estg.publictransportmonitoring.Repositories;

import estg.publictransportmonitoring.Entities.Driver;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface DriverRepository extends ReactiveMongoRepository<Driver, String> {

}
