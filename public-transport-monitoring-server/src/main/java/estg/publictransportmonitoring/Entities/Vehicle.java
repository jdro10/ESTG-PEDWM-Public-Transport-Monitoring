package estg.publictransportmonitoring.Entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@Document
@ToString
@Getter
@Setter
@NoArgsConstructor
public class Vehicle {

    @Id
    private String plate;
    private int capacity;
    private String brand;

}
