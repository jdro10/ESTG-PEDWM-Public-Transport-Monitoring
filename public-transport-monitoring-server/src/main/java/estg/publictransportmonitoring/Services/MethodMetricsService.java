package estg.publictransportmonitoring.Services;

import estg.publictransportmonitoring.Entities.MethodMetrics;
import estg.publictransportmonitoring.Repositories.MethodMetricsRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

@Service
@Transactional
@AllArgsConstructor
public class MethodMetricsService {

    @Autowired
    private MethodMetricsRepository methodMetricsRepository;

    public Mono<MethodMetrics> save(final MethodMetrics methodMetrics) {
        return this.methodMetricsRepository.save(methodMetrics);
    }
}
