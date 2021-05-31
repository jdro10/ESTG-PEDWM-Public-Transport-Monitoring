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
@NoArgsConstructor
public class VehicleData {

    @Id
    private String vehicleId;
    private int numberOfTrips;

}
