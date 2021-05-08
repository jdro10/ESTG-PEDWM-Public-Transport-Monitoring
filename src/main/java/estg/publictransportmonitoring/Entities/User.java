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
public class User {

    @Id
    private String id;
    private String userName;
    private String password;
    private boolean isAdmin;

}