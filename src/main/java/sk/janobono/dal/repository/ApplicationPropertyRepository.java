package sk.janobono.dal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sk.janobono.dal.domain.ApplicationProperty;

import java.util.List;

public interface ApplicationPropertyRepository extends JpaRepository<ApplicationProperty, String> {

    @Query("SELECT a FROM ApplicationProperty a WHERE a.key like :group ORDER BY a.key")
    List<ApplicationProperty> getApplicationPropertiesByGroup(@Param("group") String group);
}
