package estg.publictransportmonitoring.Controllers;

import estg.publictransportmonitoring.Entities.TripReserve;
import estg.publictransportmonitoring.Entities.User;
import estg.publictransportmonitoring.Services.TripService;
import estg.publictransportmonitoring.Services.UserService;
import estg.publictransportmonitoring.models.Role;
import estg.publictransportmonitoring.models.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/users")
@AllArgsConstructor
@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private TripService tripService;

    @GetMapping
    public Flux<User> getAll(){
        System.out.println("ALL USERS");
        return userService.getAll();
    }

    @GetMapping("{id}")
    public Mono<User> getById(@PathVariable("id") final String id){
        System.out.println("user by id");
        return userService.getById(id);
    }

    public Mono<User> getByUsername(final String username){
        return this.userService.getByUsername(username);

    }

    @PutMapping("{id}")
    public Mono<User> updateById(@PathVariable("id") final String id, @RequestBody final User user){
        System.out.println("update user By Id");
        return userService.update(id,user);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Mono<User> save(@RequestBody final User user){
        List<Role> role = new ArrayList<>();
        role.add(Role.USER);

        user.setRoles(role);
        user.setEnabled(true);

        return this.userService.save(user);
    }

    @DeleteMapping("{id}")
    public Mono<User> delete(@PathVariable final String id){
        System.out.println("delete user by id");
        return userService.delete(id);
    }

    @GetMapping("/profile/{id}")
    public Mono<UserProfile> userProfile(@PathVariable("id") final String userId){
        return this.tripService.getReservatedTrips()
                        .filter(trip -> trip.getUserId().equals(userId))
                        .collect(Collectors.toList())
                        .flatMap(list -> this.userService.getById(userId)
                                            .map(user -> new UserProfile(user.getUsername(), user.getEmail(), list)));
    }
}
