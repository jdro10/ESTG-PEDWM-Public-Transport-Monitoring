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
public class Review {

    @Id
    private String reviewId;
    private String userId;
    private String tripId;
    private String message;
}
