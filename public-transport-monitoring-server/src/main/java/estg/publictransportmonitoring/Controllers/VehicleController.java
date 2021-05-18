package estg.publictransportmonitoring.Controllers;


import estg.publictransportmonitoring.Entities.Vehicle;
import estg.publictransportmonitoring.Services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequestMapping("/vehicles")
@AllArgsConstructor
@RestController
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping
    public Flux<Vehicle> getAll(){
        System.out.println("ALL VEHICLES");
        return vehicleService.getAll();
    }

    @GetMapping("{id}")
    public Mono<Vehicle> getById(@PathVariable("id") final String id){
        System.out.println("vehicle by id");
        return vehicleService.getById(id);
    }

    @PutMapping("{id}")
    public Mono updateById(@PathVariable("id") final String id, @RequestBody final Vehicle vehicle){
        System.out.println("update vehicle By Id");
        return vehicleService.update(id,vehicle);
    }

    @PostMapping
    public Mono save(@RequestBody final Vehicle vehicle){
        System.out.println("inserted a vehicle");
        return vehicleService.save(vehicle);
    }

    @DeleteMapping("{id}")
    public Mono delete(@PathVariable final String id){
        System.out.println("delete vehicle by id");
        return vehicleService.delete(id);
    }
}
