package estg.publictransportmonitoring.Services;

import estg.publictransportmonitoring.Entities.TripReserve;
import estg.publictransportmonitoring.Repositories.TripReserveRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

@Service
@Transactional
@AllArgsConstructor
public class TripReserveService {

    @Autowired
    private TripReserveRepository tripReserveRepository;

    public Mono<TripReserve> save(final TripReserve tripReserve) {
        return this.tripReserveRepository.save(tripReserve);
    }
}
