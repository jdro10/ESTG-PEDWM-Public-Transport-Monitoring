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
    private TripReserveService tripReserveService;
    @Autowired
    private UserService userService;

    @GetMapping
    public Flux<Trip> getAll() {
        return this.tripService.getAll();
    }

    public Flux<TripReserve> getAllReservatedTrips() {
        return this.tripService.getReservatedTrips();
    }

    @GetMapping("{id}")
    public Mono<EntityModel<Trip>> getById(@PathVariable("id") final String id) {
        System.out.println("get by id");
        System.out.println(id);
        return this.tripService.getById(id).map(Responses::tripResponse);
    }

    @PutMapping("{id}")
    public Mono<Trip> updateById(@PathVariable("id") final String id, @RequestBody final Trip trip) {
        return this.tripService.update(id, trip);
    }

    @PostMapping
    public Flux<EntityModel<Trip>> saveTrip(@RequestBody final Trip trip) {
        Flux<Tuple3<Vehicle, User, Trip>> result = Flux.zip(this.vehicleService.getById(trip.getVehiclePlate()), this.userService.getById(trip.getDriverId()), Mono.just(trip));

        return result.doOnNext(t -> t.getT3().setAvailableSeats(t.getT1().getCapacity()))
                .flatMap(x -> this.tripService.save(trip))
                .map(Responses::tripResponse);
    }

    @DeleteMapping("{id}")
    public Mono<Trip> delete(@PathVariable final String id) {
        return this.tripService.delete(id);
    }

    @PostMapping("/reserve")
    public Flux<EntityModel<TripReserve>> reserveTrip(@RequestBody TripReserve tripReserve) {
        Flux<Tuple3<User, Trip, TripReserve>> result = Flux.zip(this.userService.getById(tripReserve.getUserId()), this.tripService.getById(tripReserve.getTripId()), Mono.just(tripReserve));

        return result
                .doOnNext(t -> t.getT3().setReservationId(UUID.randomUUID().toString()))
                .map(s -> {
                    if (s.getT2().getAvailableSeats() > 0) {
                        s.getT2().setAvailableSeats(s.getT2().getAvailableSeats() - 1);
                        s.getT3().setDate(s.getT2().getDate());
                        s.getT3().setPlate(s.getT2().getVehiclePlate());
                        this.updateById(s.getT2().getId(), s.getT2()).subscribe();

                        return true;
                    }

                    return false;
                })
                .flatMap(s -> s ? this.tripReserveService.save(tripReserve).map(Responses::tripReserveResponse) : Flux.just());
    }
}
