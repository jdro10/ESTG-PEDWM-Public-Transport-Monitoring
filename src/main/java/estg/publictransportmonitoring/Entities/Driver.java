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
public class Driver {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private int age;

}
