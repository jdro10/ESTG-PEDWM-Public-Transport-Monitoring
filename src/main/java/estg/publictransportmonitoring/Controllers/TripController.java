package estg.publictransportmonitoring.Controllers;

import estg.publictransportmonitoring.Entities.Driver;
import estg.publictransportmonitoring.Entities.Trip;
import estg.publictransportmonitoring.Entities.Vehicle;
import estg.publictransportmonitoring.Services.DriverService;
import estg.publictransportmonitoring.Services.TripService;
import estg.publictransportmonitoring.Services.VehicleService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;
import reactor.core.CoreSubscriber;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;
import reactor.util.function.Tuples;

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
    public Mono<EntityModel> getById(@PathVariable("id") final String id){
        Trip trip = this.tripService.getById(id).share().block();

        EntityModel<Trip> model = EntityModel.of(trip);
        model.add(linkTo(methodOn(DriverController.class).getById(trip.getDriverId())).withRel("Driver"));
        model.add(linkTo(methodOn(VehicleController.class).getById(trip.getVehiclePlate())).withRel("Vehicle"));

        Mono<EntityModel> monoTmp = Mono.just(model);

        return monoTmp;
    }

    @PutMapping("{id}")
    public Mono<Trip> updateById(@PathVariable("id") final String id, @RequestBody final Trip trip){
        return this.tripService.update(id, trip);
    }

    @PostMapping
    public void saveTrip(@RequestBody final Trip trip){
        Flux<Tuple2<Vehicle, Driver>> result = Flux.zip(this.vehicleService.getById(trip.getVehiclePlate()), this.driverService.getById(trip.getDriverId()));

        result.flatMap(x -> this.save(trip)).subscribe();
    }

    private Mono<Trip> save(final Trip trip){
        return this.tripService.save(trip);
    }

    @DeleteMapping("{id}")
    public Mono<Trip> delete(@PathVariable final String id){
        return this.tripService.delete(id);
    }

}
