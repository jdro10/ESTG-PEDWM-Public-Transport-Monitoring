package estg.publictransportmonitoring.Controllers;

import estg.publictransportmonitoring.Entities.User;
import estg.publictransportmonitoring.Services.UserService;
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

    @PostMapping
    public Mono<User> save(@RequestBody final User user){
        System.out.println("inserted a user");
        return userService.save(user);
    }

    @DeleteMapping("{id}")
    public Mono<User> delete(@PathVariable final String id){
        System.out.println("delete user by id");
        return userService.delete(id);
    }
}
