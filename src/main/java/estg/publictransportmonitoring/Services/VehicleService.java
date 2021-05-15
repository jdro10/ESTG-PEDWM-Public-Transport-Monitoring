package estg.publictransportmonitoring.Services;

import java.util.Objects;

import estg.publictransportmonitoring.Entities.User;
import estg.publictransportmonitoring.Entities.Vehicle;
import estg.publictransportmonitoring.Repositories.UserRepository;
import estg.publictransportmonitoring.Repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import lombok.AllArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Transactional
@AllArgsConstructor
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public Flux<Vehicle> getAll(){
        return vehicleRepository.findAll().switchIfEmpty(Flux.empty());
    }

    public Mono<Vehicle> getById(final String plate){
        return vehicleRepository.findById(plate);
    }

    public Mono<Vehicle> update(final String id, final Vehicle vehicle){
        return vehicleRepository.save(vehicle);
    }

    public Mono<Vehicle> save(final Vehicle vehicle){
        return vehicleRepository.save(vehicle);
    }

    public Mono<Vehicle> delete(final String plate){
        final Mono<Vehicle> vehicleTmp = getById(plate);
        if(Objects.isNull(vehicleTmp)){
            return Mono.empty();
        }
        return getById(plate).switchIfEmpty(Mono.empty()).filter(Objects::nonNull).flatMap(vehicleToBeDeleted -> vehicleRepository.delete(vehicleToBeDeleted).then(Mono.just(vehicleToBeDeleted)));
    }
}
