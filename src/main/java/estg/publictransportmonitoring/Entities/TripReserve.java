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
public class TripReserve {

    @Id
    private String reservationId;
    private String userId;
    private String tripId;

}
