package estg.publictransportmonitoring.Entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;


@Data
@Builder
@AllArgsConstructor
@Document
@Getter
@Setter
@ToString
@NoArgsConstructor
public class EmployeeData {

    @Id
    private String employeeId;
    private int numberOfTrips;

}
