package com.ecommerce.backend.dto.response;

public record CreditCardResponse(
        Long id,
        String cardNo,
        Integer expireMonth,
        Integer expireYear,
        String nameOnCard
) {
}