package estg.publictransportmonitoring.Repositories;

import estg.publictransportmonitoring.Entities.EmployeeData;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface EmployeeDataRepository extends ReactiveMongoRepository<EmployeeData, String> {
}
