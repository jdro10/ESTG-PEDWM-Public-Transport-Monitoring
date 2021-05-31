package estg.publictransportmonitoring.Services;

import estg.publictransportmonitoring.Entities.VehicleData;
import estg.publictransportmonitoring.Repositories.VehicleDataRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

@Service
@Transactional
@AllArgsConstructor
public class VehicleDataService {

    @Autowired
    private VehicleDataRepository vehicleDataRepository;

    public Mono<VehicleData> save(final VehicleData vehicleData){
        return this.vehicleDataRepository.save(vehicleData);
    }

    public Mono<VehicleData> getById(final String id){
        return this.vehicleDataRepository.findById(id);
    }

}
