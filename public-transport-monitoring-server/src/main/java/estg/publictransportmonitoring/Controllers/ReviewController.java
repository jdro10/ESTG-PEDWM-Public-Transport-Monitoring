package estg.publictransportmonitoring.Controllers;

import estg.publictransportmonitoring.Entities.Review;
import estg.publictransportmonitoring.Services.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@AllArgsConstructor
@RequestMapping("/review")
@RestController
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public Flux<Review> getAllReviews(){
        return this.reviewService.getAllReviews();
    }

    @GetMapping("{userId}/{tripId}")
    public Mono<Boolean> userAlreadyReviewed(@PathVariable("userId") final String userId, @PathVariable final String tripId){
        return this.reviewService.existsByUserIdAndTripId(userId, tripId);
    }

    @PostMapping
    public Mono<Review> makeAReview(@RequestBody final Review review){
        return this.reviewService.save(review);
    }
}

