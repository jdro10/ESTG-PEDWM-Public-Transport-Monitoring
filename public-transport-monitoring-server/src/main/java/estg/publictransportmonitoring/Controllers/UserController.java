package estg.publictransportmonitoring.Controllers;

import estg.publictransportmonitoring.Entities.User;
import estg.publictransportmonitoring.Services.UserService;
import estg.publictransportmonitoring.models.Role;
import estg.publictransportmonitoring.utils.Responses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequestMapping("/users")
@AllArgsConstructor
@RestController
public class UserController {

    @Autowired
    private UserService userService;

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

        Mono<User> userToSave = Mono.just(user);

        return userToSave
                .map(x -> !this.userService.getByUsername(x.getUsername()).equals(Mono.empty()))
                .flatMap(y -> y ? this.userService.save(user) :  Mono.empty());
    }

    @DeleteMapping("{id}")
    public Mono<User> delete(@PathVariable final String id){
        System.out.println("delete user by id");
        return userService.delete(id);
    }
}
