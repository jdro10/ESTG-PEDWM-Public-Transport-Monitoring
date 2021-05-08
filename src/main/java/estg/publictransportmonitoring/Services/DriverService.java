package estg.publictransportmonitoring.Services;

import estg.publictransportmonitoring.Entities.Driver;
import estg.publictransportmonitoring.Repositories.DriverRepository;
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
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    public Flux<Driver> getAll(){
        return this.driverRepository.findAll().switchIfEmpty(Flux.empty());
    }

    public Mono<Driver> getById(final String id){
        return this.driverRepository.findById(id);
    }

    public Mono<Driver> update(final String id, final Driver driver){
        return this.driverRepository.save(driver);
    }

    public Mono<Driver> save(final Driver driver){
        return this.driverRepository.save(driver);
    }

    public Mono<Driver> delete(final String id){
        final Mono<Driver> driverMono = getById(id);

        if(Objects.isNull(driverMono)){
            return Mono.empty();
        }

        return getById(id).switchIfEmpty(Mono.empty()).filter(Objects::nonNull)
                .flatMap(driverToBeDeleted -> this.driverRepository.delete(driverToBeDeleted)
                        .then(Mono.just(driverToBeDeleted)));
    }
}
