package estg.publictransportmonitoring.Repositories;
import estg.publictransportmonitoring.Entities.Vehicle;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

public interface VehicleRepository extends ReactiveMongoRepository<Vehicle,String> {
}
