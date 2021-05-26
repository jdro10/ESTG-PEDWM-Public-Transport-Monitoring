package estg.publictransportmonitoring.Services;
import java.util.Objects;

import estg.publictransportmonitoring.Entities.User;
import estg.publictransportmonitoring.Repositories.UserRepository;
import estg.publictransportmonitoring.security.PBKDF2Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;

import lombok.AllArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Transactional
@AllArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PBKDF2Encoder passwordEncoder;

    public Flux<User> getAll(){
        return userRepository.findAll().switchIfEmpty(Flux.empty());
    }

    public Mono<User> getById(final String id){
        return userRepository.findById(id);
    }

    public Mono<User> update(final String id, final User user){
        return userRepository.save(user);
    }

    public Mono<User> save(final User user) {
        return this.userRepository.existsByUsernameAndEmail(user.getUsername(), user.getEmail())
                .doOnNext(usernameExists -> {
                    if(usernameExists){
                       throw new EntityExistsException("Utilizador já existe");
                    }

                    user.setPassword(passwordEncoder.encode(user.getPassword()));
                }).then(this.userRepository.save(user));
    }

    public Mono<User> delete(final String id){
        final Mono<User> userTmp = getById(id);
        if(Objects.isNull(userTmp)){
            return Mono.empty();
        }
        return getById(id).switchIfEmpty(Mono.empty()).filter(Objects::nonNull)
                .flatMap(userToBeDeleted -> userRepository.delete(userToBeDeleted).then(Mono.just(userToBeDeleted)));
    }
}
