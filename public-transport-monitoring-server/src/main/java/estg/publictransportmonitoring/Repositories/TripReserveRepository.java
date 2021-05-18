package estg.publictransportmonitoring.Repositories;

import estg.publictransportmonitoring.Entities.TripReserve;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface TripReserveRepository extends ReactiveMongoRepository<TripReserve, String> {

}
