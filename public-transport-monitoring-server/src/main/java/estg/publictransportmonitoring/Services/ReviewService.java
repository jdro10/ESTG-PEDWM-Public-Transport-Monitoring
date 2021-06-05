package estg.publictransportmonitoring.Services;

import estg.publictransportmonitoring.Entities.Review;
import estg.publictransportmonitoring.Repositories.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Transactional
@AllArgsConstructor
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Flux<Review> getAllReviews(){
        return this.reviewRepository.findAll();
    }

    public Mono<Review> getByTripId(final String tripId){
        return this.reviewRepository.getByTripId(tripId);
    }

    public Mono<Boolean> existsByUserIdAndTripId(final String userId, final String tripId){
        return this.reviewRepository.existsByUserIdAndTripId(userId, tripId);
    }

    public Mono<Review> save(final Review review) {
        return this.reviewRepository.save(review);
    }
}
