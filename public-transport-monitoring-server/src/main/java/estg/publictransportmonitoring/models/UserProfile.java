package estg.publictransportmonitoring.models;

import estg.publictransportmonitoring.Entities.TripReserve;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserProfile {

    private String username;
    private String email;
    private List<TripReserve> tripsReserved;
}
