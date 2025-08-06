package com.gupta.fleetops.repository;

import com.gupta.fleetops.entity.NewsletterSubscriber;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsLetterRepository extends JpaRepository<NewsletterSubscriber , Long> {
}
