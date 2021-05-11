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
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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
    public EntityModel getById(@PathVariable("id") final String id){
        Trip trip = this.tripService.getById(id).share().block();

        EntityModel<Trip> model = EntityModel.of(trip);
        model.add(linkTo(methodOn(DriverController.class).getById(trip.getDriverId())).withRel("Condutor"));
        model.add(linkTo(methodOn(VehicleController.class).getById(trip.getVehiclePlate())).withRel("Veículo"));

        return model;
    }

    @PutMapping("{id}")
    public Mono<Trip> updateById(@PathVariable("id") final String id, @RequestBody final Trip trip){
        return this.tripService.update(id, trip);
    }

    @PostMapping
    public Mono<Trip> save(@RequestBody final Trip trip){
        Mono<Vehicle> vehicleMono = this.vehicleService.getById(trip.getVehiclePlate());
        Mono<Driver> driverMono = this.driverService.getById(trip.getDriverId()).switchIfEmpty(Mono.empty());

        Driver driver = driverMono.share().block();
        Vehicle vehicle = vehicleMono.share().block();

        if(driver != null && vehicle != null){
            return this.tripService.save(trip);
        }

        return Mono.empty();
    }

    @DeleteMapping("{id}")
    public Mono<Trip> delete(@PathVariable final String id){
        return this.tripService.delete(id);
    }

}
