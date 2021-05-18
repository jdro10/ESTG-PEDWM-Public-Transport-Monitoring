package estg.publictransportmonitoring.Entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@Document
@Getter
@Setter
@ToString
public class Trip {

    @Id
    private String id;
    private String[] hours;
    private String origin;
    private String destination;
    private String driverId;
    private String vehiclePlate;
    private float price;
    private int availableSeats;

}
