package estg.publictransportmonitoring.Controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.Random;

@RestController
public class SSE {

    private float t = 41.1801f;

    @GetMapping(value = "/velocity", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Integer> getResourceUsage() {

        Random random = new Random();

        return Flux.interval(Duration.ofSeconds(3))
                .map(it -> random.nextInt(161));

    }

    @GetMapping(value = "/position", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Float> getCurrentPosition() {
        Random random = new Random();

        return Flux.interval(Duration.ofSeconds(2))
                .map(it -> t += 0.0001f);

    }

}
