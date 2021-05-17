package estg.publictransportmonitoring.Controllers;

import estg.publictransportmonitoring.Entities.*;
import estg.publictransportmonitoring.Services.*;
import estg.publictransportmonitoring.utils.Responses;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;
import reactor.util.function.Tuple3;

import java.util.UUID;

@AllArgsConstructor
@RequestMapping("/trips")
@RestController
public class TripController {

    @Autowired
    private TripService tripService;
    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private DriverService driverService;
    @Autowired
    private TripReserveService tripReserveService;
    @Autowired
    private UserService userService;

    @GetMapping
    public Flux<Trip> getAll(){
        return this.tripService.getAll();
    }

    @GetMapping("{id}")
    public Mono<EntityModel<Trip>> getById(@PathVariable("id") final String id){
        return this.tripService.getById(id).map(Responses::tripResponse);
    }

    @PutMapping("{id}")
    public Mono<Trip> updateById(@PathVariable("id") final String id, @RequestBody final Trip trip){
        return this.tripService.update(id, trip);
    }

    @PostMapping
    public Flux<EntityModel<Trip>> saveTrip(@RequestBody final Trip trip){
        Flux<Tuple3<Vehicle, Driver, Trip>> result = Flux.zip(this.vehicleService.getById(trip.getVehiclePlate()), this.driverService.getById(trip.getDriverId()), Mono.just(trip));

        return result.doOnNext(t -> t.getT3().setAvailableSeats(t.getT1().getCapacity()))
                .flatMap(x -> this.save(trip))
                .map(Responses::tripResponse);
    }

    private Mono<Trip> save(final Trip trip){
        return this.tripService.save(trip);
    }

    @DeleteMapping("{id}")
    public Mono<Trip> delete(@PathVariable final String id){
        return this.tripService.delete(id);
    }

    @PostMapping("/reserve")
    public Flux<EntityModel<TripReserve>> reserveTrip(@RequestBody TripReserve tripReserve) {
        Flux<Tuple3<User, Trip, TripReserve>> result = Flux.zip(this.userService.getById(tripReserve.getUserId()), this.tripService.getById(tripReserve.getTripId()), Mono.just(tripReserve));

        return result.doOnNext(t -> t.getT3().setReservationId(UUID.randomUUID().toString()))
                .flatMap(tr -> this.saveTripReserve(tripReserve))
                .map(Responses::tripReserveResponse);
    }

    private Mono<TripReserve> saveTripReserve(TripReserve tripReserve){
        return this.tripReserveService.save(tripReserve);
    }
}
