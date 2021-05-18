package estg.publictransportmonitoring.utils;

import estg.publictransportmonitoring.Controllers.DriverController;
import estg.publictransportmonitoring.Controllers.VehicleController;
import estg.publictransportmonitoring.Entities.Trip;
import estg.publictransportmonitoring.Entities.TripReserve;
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

    public static EntityModel<TripReserve> tripReserveResponse (TripReserve tripReserve){
        EntityModel<TripReserve> model = EntityModel.of(tripReserve);
        model.add(linkTo(methodOn(DriverController.class).getById(tripReserve.getUserId())).withRel("User"));
        model.add(linkTo(methodOn(VehicleController.class).getById(tripReserve.getTripId())).withRel("Trip"));

        return model;
    }
}
