package estg.publictransportmonitoring.Repositories;

import estg.publictransportmonitoring.Entities.Review;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface ReviewRepository extends ReactiveMongoRepository<Review, String> {

    Mono<Review> getByTripId(String tripId);

    Mono<Boolean> existsByUserIdAndTripId(String userId, String TripId);

}
