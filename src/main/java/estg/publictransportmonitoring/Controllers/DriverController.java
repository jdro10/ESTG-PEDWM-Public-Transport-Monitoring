package estg.publictransportmonitoring.Controllers;

import estg.publictransportmonitoring.Entities.Driver;
import estg.publictransportmonitoring.Services.DriverService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@AllArgsConstructor
@RequestMapping("/drivers")
@RestController
public class DriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping
    public Flux<Driver> getAll(){
        return this.driverService.getAll();
    }

    @GetMapping("{id}")
    public Mono<Driver> getById(@PathVariable("id") final String id){
        return this.driverService.getById(id);
    }

    @PutMapping("{id}")
    public Mono<Driver> updateById(@PathVariable("id") final String id, @RequestBody final Driver driver){
        return this.driverService.update(id, driver);
    }

    @PostMapping
    public Mono<Driver> save(@RequestBody final Driver driver){
        return this.driverService.save(driver);
    }

    @DeleteMapping("{id}")
    public Mono<Driver> delete(@PathVariable final String id){
        return this.driverService.delete(id);
    }

}
