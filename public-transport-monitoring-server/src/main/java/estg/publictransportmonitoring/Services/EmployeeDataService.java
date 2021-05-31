package estg.publictransportmonitoring.Services;

import estg.publictransportmonitoring.Entities.EmployeeData;
import estg.publictransportmonitoring.Entities.MethodMetrics;
import estg.publictransportmonitoring.Entities.User;
import estg.publictransportmonitoring.Repositories.EmployeeDataRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

@Service
@Transactional
@AllArgsConstructor
public class EmployeeDataService {

    @Autowired
    private EmployeeDataRepository employeeDataRepository;

    public Mono<EmployeeData> save(final EmployeeData employeeData){
        return this.employeeDataRepository.save(employeeData);
    }

    public Mono<EmployeeData> getById(final String id){
        return this.employeeDataRepository.findById(id);
    }


}
