package estg.publictransportmonitoring.aop;


import estg.publictransportmonitoring.Entities.EmployeeData;
import estg.publictransportmonitoring.Entities.Trip;
import estg.publictransportmonitoring.Entities.VehicleData;
import estg.publictransportmonitoring.Services.EmployeeDataService;
import estg.publictransportmonitoring.Services.VehicleDataService;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Aspect
@Component
public class SaveTripData {

    @Autowired
    private EmployeeDataService employeeDataService;

    @Autowired
    private VehicleDataService vehicleDataService;

    @AfterReturning(value = "execution(* estg.publictransportmonitoring.Controllers.TripController.saveTrip (..) )", returning = "tr")
    public void dataEmployees(Flux<EntityModel<Trip>> tr){

        Trip trip = tr.share().blockFirst().getContent();

        EmployeeData ED = employeeDataService.getById(trip.getDriverId()).share().block();

        if(ED == null){
            employeeDataService.save(new EmployeeData(trip.getDriverId(),1)).subscribe();
        }else{
            ED.setNumberOfTrips(ED.getNumberOfTrips() +1 );
            employeeDataService.save(ED).subscribe();
        }

    }

    @AfterReturning(value = "execution(* estg.publictransportmonitoring.Controllers.TripController.saveTrip (..) )", returning = "tr")
    public void dataVehicles(Flux<EntityModel<Trip>> tr){

        Trip trip = tr.share().blockFirst().getContent();

        VehicleData VD = vehicleDataService.getById(trip.getVehiclePlate()).share().block();

        if(VD == null){
            vehicleDataService.save(new VehicleData(trip.getVehiclePlate(),1)).subscribe();
        }else{
            VD.setNumberOfTrips(VD.getNumberOfTrips() + 1);
            vehicleDataService.save(VD).subscribe();
        }

    }
}
