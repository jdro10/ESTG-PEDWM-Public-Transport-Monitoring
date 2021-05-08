package estg.publictransportmonitoring.Repositories;

import estg.publictransportmonitoring.Entities.Trip;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface TripRepository extends ReactiveMongoRepository<Trip, String> {
}
