package hdbt.italianrestaurant.user.repository;

import hdbt.italianrestaurant.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     *
     * Repository - Query:
     * A JPA/Hibernate-t nem érdekli, hogy hogyan hívják az SQL tábládat,
     * az érdekli, hogy hogyan hívják az Entitás osztályodat.
     */

    @Query("SELECT u FROM User u WHERE u.email = :email")
    User findByEmail(String email);

}
