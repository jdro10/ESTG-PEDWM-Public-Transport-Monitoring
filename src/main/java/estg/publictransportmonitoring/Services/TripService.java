package estg.publictransportmonitoring.Services;

import estg.publictransportmonitoring.Entities.Trip;
import estg.publictransportmonitoring.Repositories.TripRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@Transactional
@AllArgsConstructor
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    public Flux<Trip> getAll(){
        return this.tripRepository.findAll().switchIfEmpty(Flux.empty());
    }

    public Mono<Trip> getById(final String id){
        return this.tripRepository.findById(id);
    }

    public Mono<Trip> update(final String id, final Trip trip){
        return this.tripRepository.save(trip);
    }

    public Mono<Trip> save(final Trip trip){
        return this.tripRepository.save(trip);
    }

    public Mono<Trip> delete(final String id){
        final Mono<Trip> tripTmp = getById(id);

        if(Objects.isNull(tripTmp)){
            return Mono.empty();
        }

        return getById(id).switchIfEmpty(Mono.empty()).filter(Objects::nonNull)
                .flatMap(tripToBeDeleted -> this.tripRepository.delete(tripToBeDeleted)
                .then(Mono.just(tripToBeDeleted)));
    }
}
