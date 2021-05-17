package estg.publictransportmonitoring.Controllers;

import estg.publictransportmonitoring.Entities.Driver;
import estg.publictransportmonitoring.Entities.Trip;
import estg.publictransportmonitoring.Entities.Vehicle;
import estg.publictransportmonitoring.Services.DriverService;
import estg.publictransportmonitoring.Services.TripService;
import estg.publictransportmonitoring.Services.VehicleService;
import estg.publictransportmonitoring.utils.Responses;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple3;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;


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

}
