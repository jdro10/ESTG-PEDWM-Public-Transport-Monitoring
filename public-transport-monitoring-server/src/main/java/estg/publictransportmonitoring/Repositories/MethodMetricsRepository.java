package estg.publictransportmonitoring.Repositories;

import estg.publictransportmonitoring.Entities.MethodMetrics;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface MethodMetricsRepository extends ReactiveMongoRepository<MethodMetrics, String> {
}
