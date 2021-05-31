package estg.publictransportmonitoring.Repositories;

import estg.publictransportmonitoring.Entities.VehicleData;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface VehicleDataRepository extends ReactiveMongoRepository<VehicleData, String> {
}
