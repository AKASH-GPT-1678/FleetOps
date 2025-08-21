package com.gupta.fleetops.config;


import com.gupta.fleetops.io.KafkaMessage;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.protocol.types.Field;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;


@EnableKafka
@Configuration
public class KafkaConsumerConfig {

    @Bean
    public ConsumerFactory<String, KafkaMessage> consumerFactory(){
        JsonDeserializer<KafkaMessage> deserializer = new JsonDeserializer<>(KafkaMessage.class);
        deserializer.setRemoveTypeHeaders(false);
        deserializer.addTrustedPackages("*"); // or restrict to your package
        deserializer.setUseTypeMapperForKey(true);
        Map<String , Object> configProps = new HashMap<>();
        configProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "34.122.122.139:9092"); // Use your actual host IP
        configProps.put(ConsumerConfig.GROUP_ID_CONFIG, "233");
        configProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG , StringDeserializer.class);
        configProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);

        return new DefaultKafkaConsumerFactory<>(configProps,
                new StringDeserializer(),
                deserializer


        );
    }


    @Bean
    public ConcurrentKafkaListenerContainerFactory<String , KafkaMessage > kafkaListenerContainerFactory(){
        ConcurrentKafkaListenerContainerFactory<String , KafkaMessage> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;

    }
}
