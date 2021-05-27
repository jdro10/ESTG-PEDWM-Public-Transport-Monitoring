package estg.publictransportmonitoring.models;

import lombok.*;


@Data
@Builder
@AllArgsConstructor
@Getter
@Setter
@ToString
@NoArgsConstructor
public class ErrorMessage {

    private String errorMessage;
}
