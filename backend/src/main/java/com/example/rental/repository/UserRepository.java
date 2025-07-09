package com.example.rental.repository;

import com.example.rental.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    // Find a user by username
    Optional<User> findByUsername(String username);

    // Find a user by email
    Optional<User> findByEmail(String email);

    // Find users by role (e.g., ADMIN, USER)
    List<User> findByRole(String role);

    // Find active users
    List<User> findByActive(boolean active);

    // (Optional) Find users by full name (case-insensitive)
    List<User> findByFullNameIgnoreCase(String fullName);
}
