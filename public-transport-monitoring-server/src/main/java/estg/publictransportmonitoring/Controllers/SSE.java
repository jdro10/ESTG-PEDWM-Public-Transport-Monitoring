package estg.publictransportmonitoring.Controllers;

import estg.publictransportmonitoring.mqtt.MqttConfig;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@RestController
public class SSE {

    private float lastPosition = 0.0f;

    @GetMapping(value = "/velocity", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Integer> getResourceUsage() {

        Random random = new Random();

        return Flux.interval(Duration.ofSeconds(3))
                .map(it -> random.nextInt(161));
    }

    @GetMapping(path = "/position/{topic}", produces = "text/event-stream")
    public Flux<Object> getCurrentPosition(@PathVariable("topic") String topicName) {
        System.out.println("Connected to topic: " + topicName);

        return Flux.interval(Duration.ofSeconds(2))
                .map(coordinates -> {
                    List<Float> messages = new ArrayList<>();

                    try {
                        CountDownLatch countDownLatch = new CountDownLatch(10);
                        MqttConfig.getInstance().subscribeWithResponse(topicName, (s, mqttMessage) -> {
                            String message = new String(mqttMessage.getPayload());
                            messages.add(Float.parseFloat(message));
                            countDownLatch.countDown();

                            if (messages.size() != 0) {
                                this.lastPosition = messages.get(0);
                            }
                        });

                        countDownLatch.await(1000, TimeUnit.MILLISECONDS);
                    } catch (MqttException | InterruptedException e) {
                        System.out.println("Erro ao conectar ao mqtt: " + e);
                    }

                    if (messages.size() == 0) {
                        return this.lastPosition;
                    }

                    return messages.get(0);
                });
    }
}
