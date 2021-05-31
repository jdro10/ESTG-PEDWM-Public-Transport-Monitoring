package estg.publictransportmonitoring.Controllers;

import estg.publictransportmonitoring.Entities.EmployeeData;
import estg.publictransportmonitoring.Entities.MethodMetrics;
import estg.publictransportmonitoring.Entities.VehicleData;
import estg.publictransportmonitoring.Repositories.EmployeeDataRepository;
import estg.publictransportmonitoring.Repositories.MethodMetricsRepository;
import estg.publictransportmonitoring.Repositories.VehicleDataRepository;
import estg.publictransportmonitoring.Services.EmployeeDataService;
import estg.publictransportmonitoring.Services.MethodMetricsService;
import estg.publictransportmonitoring.Services.VehicleDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;


@RestController
@RequestMapping("/admin")
public class AdminDataController {

    @Autowired
    private EmployeeDataService employeeDataService;

    @Autowired
    private MethodMetricsService methodMetricsService;

    @Autowired
    private VehicleDataService vehicleDataService;

    @GetMapping("/employees")
    public Flux<EmployeeData> getAllEmployeesData(){
        return this.employeeDataService.getAll();
    }

    @GetMapping("/methodmetrics")
    public Flux<MethodMetrics> getAllMethodMetrics(){
        return this.methodMetricsService.getAll();
    }

    @GetMapping("/vehicles")
    public Flux<VehicleData> getAllVehiclesData(){
        return this.vehicleDataService.getAll();
    }

}
