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
public class MethodMetrics {
    private long executionTime;
    private String methodName;
    private String className;
}
