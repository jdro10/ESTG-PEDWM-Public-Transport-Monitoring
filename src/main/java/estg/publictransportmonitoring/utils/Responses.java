package estg.publictransportmonitoring.utils;

import estg.publictransportmonitoring.Controllers.DriverController;
import estg.publictransportmonitoring.Controllers.VehicleController;
import estg.publictransportmonitoring.Entities.Trip;
import org.springframework.hateoas.EntityModel;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

public class Responses {

    public static EntityModel<Trip> tripResponse (Trip trip){
        EntityModel<Trip> model = EntityModel.of(trip);
        model.add(linkTo(methodOn(DriverController.class).getById(trip.getDriverId())).withRel("Driver"));
        model.add(linkTo(methodOn(VehicleController.class).getById(trip.getVehiclePlate())).withRel("Vehicle"));

        return model;
    }
}
