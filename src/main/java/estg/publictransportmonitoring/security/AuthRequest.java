package estg.publictransportmonitoring.security;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AuthRequest {
    private String username;
    private String password;


}
