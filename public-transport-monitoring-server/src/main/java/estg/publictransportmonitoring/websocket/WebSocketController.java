package estg.publictransportmonitoring.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
public class WebSocketController {

    @CrossOrigin("*")
    @MessageMapping("/coordinates")
    @SendTo("/topic/sms")
    public String messageToSend(Accelerometer accelerometer) throws Exception{
        return new String("Recebi: \nx: " + accelerometer.getSpeedX() + "\ny: "+ accelerometer.getSpeedY() + "\nz: " + accelerometer.getSpeedZ());
    }

}
