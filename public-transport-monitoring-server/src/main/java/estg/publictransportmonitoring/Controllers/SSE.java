package estg.publictransportmonitoring.Controllers;

import estg.publictransportmonitoring.Entities.Trip;
import estg.publictransportmonitoring.Services.ReviewService;
import estg.publictransportmonitoring.Services.TripService;
import estg.publictransportmonitoring.mqtt.MqttConfig;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.sql.Array;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static java.lang.Float.parseFloat;

@RestController
public class SSE {

    private float lastLatitude = 0.0f;
    private float lastLongitude = 0.0f;
    private Float vehicleVelocity = 0.0f;
    @Autowired
    private TripService tripService;
    @Autowired
    private ReviewService reviewService;

    @GetMapping(value = "/velocity/{tripId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Object> getVehicleSpeed(@PathVariable("tripId") String tripId) {
        this.vehicleVelocity = 0.0f;

        return Flux.interval(Duration.ofSeconds(1))
                .map(velocity -> {
                    String topicToSubscribe = "pedwmptm/velocity/" + tripId;

                    try {
                        CountDownLatch countDownLatch = new CountDownLatch(10);
                        MqttConfig.getInstance().subscribeWithResponse(topicToSubscribe, (s, mqttMessage) -> {
                            String message = new String(mqttMessage.getPayload());
                            this.vehicleVelocity = parseFloat(message);

                            countDownLatch.countDown();
                        });

                        countDownLatch.await(1000, TimeUnit.MILLISECONDS);
                    } catch (MqttException | InterruptedException e) {
                        System.out.println("Erro ao conectar ao mqtt: " + e);
                    }

                    return this.vehicleVelocity;
                });
    }

    @GetMapping(path = "/position/{topic}", produces = "text/event-stream")
    public Flux<Object> getCurrentPosition(@PathVariable("topic") String topicName) {
        System.out.println("Connected to topic: pedwmptm/location/" + topicName);
        String topicToSubscribe = "pedwmptm/location/" + topicName;

        this.lastLongitude = 0.0f;
        this.lastLatitude = 0.0f;

        return Flux.interval(Duration.ofSeconds(2))
                .map(coordinates -> {
                    List<Float> messages = new ArrayList<>();

                    try {
                        CountDownLatch countDownLatch = new CountDownLatch(10);
                        MqttConfig.getInstance().subscribeWithResponse(topicToSubscribe, (s, mqttMessage) -> {
                            String message = new String(mqttMessage.getPayload());
                            String[] coords = message.split("\\|");

                            messages.add(parseFloat(coords[0]));
                            messages.add(parseFloat(coords[1]));
                            countDownLatch.countDown();

                            if (messages.size() != 0) {
                                this.lastLongitude = messages.get(0);
                                this.lastLatitude = messages.get(1);
                            }
                        });

                        countDownLatch.await(1000, TimeUnit.MILLISECONDS);
                    } catch (MqttException | InterruptedException e) {
                        System.out.println("Erro ao conectar ao mqtt: " + e);
                    }

                    if (messages.size() == 0) {
                        List<Float> floatList = new ArrayList<>();
                        floatList.add(this.lastLongitude);
                        floatList.add(this.lastLatitude);

                        return floatList;
                    }

                    return messages;
                });
    }

    @GetMapping(path = "/allTrips", produces = "text/event-stream")
    public Flux<Object> getAllTrips(){

        return Flux.interval(Duration.ofSeconds(1))
                .map(trips -> this.tripService.getAll().collect(Collectors.toList()).share().block())
                .map(listTrip -> listTrip);
    }

    @GetMapping(path = "/allReviews", produces = "text/event-stream")
    public Flux<Object> getAllReviews(){

        return Flux.interval(Duration.ofSeconds(1))
                .map(reviews -> this.reviewService.getAllReviews().collect(Collectors.toList()).share().block())
                .map(listReviews -> listReviews);
    }


    @GetMapping(path="/promotions" , produces = "text/event-stream")
    public Flux<String> getPromo(){

        return Flux.interval(Duration.ofSeconds(360)).map(s -> {
            Random random = new Random();
            int promoIndex = random.nextInt(3 - 1 + 1) + 1;

            String promo;

            if(promoIndex == 1){
                promo = "Bilhetes só 5 euros";
            }else if(promoIndex == 2){
                promo = "Na compra de um bilhete oferecemos o outro à tua companheira";
            }else{
                promo = "75% descontos até ao final da semana";
            }

            return promo;
        });
    }
}
