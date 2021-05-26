package estg.publictransportmonitoring.websocket;


public class Accelerometer {

    private String speedX;
    private String speedY;
    private String speedZ;

    public Accelerometer(String speedX, String speedY, String speedZ) {
        this.speedX = speedX;
        this.speedY = speedY;
        this.speedZ = speedZ;
    }

    public String getSpeedX() {
        return speedX;
    }

    public void setSpeedX(String speedX) {
        this.speedX = speedX;
    }

    public String getSpeedY() {
        return speedY;
    }

    public void setSpeedY(String speedY) {
        this.speedY = speedY;
    }

    public String getSpeedZ() {
        return speedZ;
    }

    public void setSpeedZ(String speedZ) {
        this.speedZ = speedZ;
    }
}
